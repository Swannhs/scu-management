const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { extractTenantAndUser } = require('./middleware/auth');
const { isAccessAllowed } = require('./access');
const { createOutboxEvent } = require('./outbox');

const errorResponse = (res, status, code, message, details) =>
  res.status(status).json({ code, message, details });

const createApp = ({ pool }) => {
  const app = express();
  const storageRoot = path.join(process.cwd(), 'uploads');

  app.use(cors());
  app.use(bodyParser.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/ready', async (_req, res) => {
    try {
      await pool.query('SELECT 1');
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(503).json({ status: 'error', detail: err.message });
    }
  });

  app.use(extractTenantAndUser);

  const loadFileForTenant = async (fileId, tenantId, client = pool) => {
    const result = await client.query(
      'SELECT * FROM files WHERE id = $1 AND tenant_id = $2 AND deleted_at IS NULL',
      [fileId, tenantId],
    );
    return result.rows[0];
  };

  const storagePathForFile = (file) => path.join(storageRoot, file.storage_key);

  const hasGrant = async ({ fileId, tenantId, userId, roles, groups }) => {
    const grantQuery = `
      SELECT 1 FROM file_access_grants
      WHERE file_id = $1
        AND tenant_id = $2
        AND (expires_at IS NULL OR expires_at > NOW())
        AND (
          (grantee_type = 'USER' AND grantee_id = $3)
          OR (grantee_type = 'ROLE' AND grantee_id = ANY($4))
          OR (grantee_type = 'GROUP' AND grantee_id = ANY($5))
        )
      LIMIT 1
    `;

    const grantRes = await pool.query(grantQuery, [
      fileId,
      tenantId,
      userId,
      roles,
      groups,
    ]);

    return grantRes.rows.length > 0;
  };

  const resolveServiceUrl = (req, relativePath) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.get('host');
    return `${protocol}://${host}${relativePath}`;
  };

  app.get('/openapi.json', async (_req, res) => {
    const specPath = path.join(process.cwd(), 'openapi.json');
    res.json(JSON.parse(await fs.readFile(specPath, 'utf8')));
  });

  app.post('/v1/files/initiate-upload', async (req, res) => {
    const {
      filename,
      contentType,
      mimeType,
      sizeBytes,
      ownerService,
      ownerEntityId,
      accessPolicy,
    } = req.body;

    if (!filename || !ownerService || !ownerEntityId) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'Missing required fields');
    }

    const fileId = uuidv4();
    const storageKey = `${req.tenantId}/${ownerService}/${ownerEntityId}/${fileId}/${filename}`;

    const query = `
      INSERT INTO files (
        id,
        tenant_id,
        filename,
        mime_type,
        size_bytes,
        storage_key,
        uploaded_by,
        owner_service,
        owner_entity_id,
        access_policy,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'PENDING')
      RETURNING id, storage_key
    `;

    const values = [
      fileId,
      req.tenantId,
      filename,
      contentType || mimeType || null,
      sizeBytes || null,
      storageKey,
      req.user.id,
      ownerService,
      ownerEntityId,
      accessPolicy || 'PRIVATE',
    ];

    try {
      await pool.query(query, values);

      const uploadUrl = resolveServiceUrl(req, `/v1/files/${fileId}/content`);

      res.json({
        fileId,
        uploadUrl,
        storageKey,
        expiresAt: new Date(Date.now() + 3600 * 1000),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 'DATABASE_ERROR', message: 'Database error' });
    }
  });

  app.put('/v1/files/:fileId/content', bodyParser.raw({ type: '*/*', limit: '25mb' }), async (req, res) => {
    const { fileId } = req.params;

    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'Binary file content is required');
    }

    try {
      const file = await loadFileForTenant(fileId, req.tenantId);
      if (!file) {
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      if (file.uploaded_by !== req.user.id) {
        return errorResponse(res, 403, 'FORBIDDEN', 'Only the owner can upload content');
      }

      const filePath = storagePathForFile(file);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, req.body);

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal error' });
    }
  });

  app.post('/v1/files/complete-upload', async (req, res) => {
    const { fileId, etag } = req.body;

    if (!fileId) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'fileId is required');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const file = await loadFileForTenant(fileId, req.tenantId, client);

      if (!file) {
        await client.query('ROLLBACK');
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      if (file.uploaded_by !== req.user.id) {
        await client.query('ROLLBACK');
        return errorResponse(res, 403, 'FORBIDDEN', 'Only the owner can complete upload');
      }

      try {
        await fs.access(storagePathForFile(file));
      } catch {
        await client.query('ROLLBACK');
        return errorResponse(res, 409, 'UPLOAD_INCOMPLETE', 'File content has not been uploaded');
      }

      if (file.status !== 'ACTIVE') {
        await client.query(
          `
            UPDATE files
            SET status = 'ACTIVE', updated_at = NOW(), etag = $2
            WHERE id = $1 AND tenant_id = $3
          `,
          [fileId, etag || null, req.tenantId],
        );
      }

      await createOutboxEvent(client, {
        tenantId: req.tenantId,
        eventType: 'document.file.created',
        payload: {
          fileId,
          storageKey: file.storage_key,
          ownerService: file.owner_service,
          ownerEntityId: file.owner_entity_id,
        },
      });

      await client.query('COMMIT');

      res.json({ status: 'active' });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ code: 'DATABASE_ERROR', message: 'Database error' });
    } finally {
      client.release();
    }
  });

  app.get('/v1/files/:fileId', async (req, res) => {
    const { fileId } = req.params;

    try {
      const file = await loadFileForTenant(fileId, req.tenantId);
      if (!file) {
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      const granted = await hasGrant({
        fileId,
        tenantId: req.tenantId,
        userId: req.user.id,
        roles: req.user.roles,
        groups: req.user.groups,
      });

      const hasAccess = isAccessAllowed({
        file,
        userId: req.user.id,
        hasGrant: granted,
      });

      if (!hasAccess) {
        return errorResponse(res, 403, 'FORBIDDEN', 'Access denied');
      }

      res.json(file);
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal error' });
    }
  });

  app.get('/v1/files/:fileId/download-url', async (req, res) => {
    const { fileId } = req.params;

    try {
      const file = await loadFileForTenant(fileId, req.tenantId);
      if (!file) {
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      if (file.status !== 'ACTIVE') {
        return errorResponse(res, 409, 'UPLOAD_INCOMPLETE', 'File upload not completed');
      }

      const granted = await hasGrant({
        fileId,
        tenantId: req.tenantId,
        userId: req.user.id,
        roles: req.user.roles,
        groups: req.user.groups,
      });

      const hasAccess = isAccessAllowed({
        file,
        userId: req.user.id,
        hasGrant: granted,
      });

      if (!hasAccess) {
        return errorResponse(res, 403, 'FORBIDDEN', 'Access denied');
      }

      const downloadUrl = resolveServiceUrl(req, `/v1/files/${fileId}/content`);

      res.json({ downloadUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal error' });
    }
  });

  app.get('/v1/files/:fileId/content', async (req, res) => {
    const { fileId } = req.params;

    try {
      const file = await loadFileForTenant(fileId, req.tenantId);
      if (!file) {
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      if (file.status !== 'ACTIVE') {
        return errorResponse(res, 409, 'UPLOAD_INCOMPLETE', 'File upload not completed');
      }

      const granted = await hasGrant({
        fileId,
        tenantId: req.tenantId,
        userId: req.user.id,
        roles: req.user.roles,
        groups: req.user.groups,
      });

      const hasAccess = isAccessAllowed({
        file,
        userId: req.user.id,
        hasGrant: granted,
      });

      if (!hasAccess) {
        return errorResponse(res, 403, 'FORBIDDEN', 'Access denied');
      }

      const filePath = storagePathForFile(file);
      const content = await fs.readFile(filePath);
      res.type(file.mime_type || 'application/octet-stream');
      res.send(content);
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Internal error' });
    }
  });

  app.post('/v1/files/:fileId/share', async (req, res) => {
    const { fileId } = req.params;
    const grants = Array.isArray(req.body) ? req.body : [];

    if (grants.length === 0) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'Share grants are required');
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const file = await loadFileForTenant(fileId, req.tenantId, client);
      if (!file) {
        await client.query('ROLLBACK');
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      if (file.uploaded_by !== req.user.id) {
        await client.query('ROLLBACK');
        return errorResponse(res, 403, 'FORBIDDEN', 'Only owner can share');
      }

      const createdGrants = [];

      for (const grant of grants) {
        const { granteeType, granteeId, expiresAt } = grant;
        if (!granteeType || !granteeId) {
          await client.query('ROLLBACK');
          return errorResponse(res, 400, 'VALIDATION_ERROR', 'granteeType and granteeId are required');
        }

        const insertResult = await client.query(
          `
            INSERT INTO file_access_grants (tenant_id, file_id, grantee_type, grantee_id, expires_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
          `,
          [req.tenantId, fileId, granteeType, granteeId, expiresAt || null],
        );

        createdGrants.push({ id: insertResult.rows[0].id, granteeType, granteeId, expiresAt });
      }

      await createOutboxEvent(client, {
        tenantId: req.tenantId,
        eventType: 'document.file.shared',
        payload: {
          fileId,
          grants: createdGrants,
        },
      });

      await client.query('COMMIT');

      res.json({ grants: createdGrants });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ code: 'DATABASE_ERROR', message: 'Database error' });
    } finally {
      client.release();
    }
  });

  app.delete('/v1/files/:fileId', async (req, res) => {
    const { fileId } = req.params;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const file = await loadFileForTenant(fileId, req.tenantId, client);
      if (!file) {
        await client.query('ROLLBACK');
        return errorResponse(res, 404, 'NOT_FOUND', 'File not found');
      }

      if (file.uploaded_by !== req.user.id) {
        await client.query('ROLLBACK');
        return errorResponse(res, 403, 'FORBIDDEN', 'Only owner can delete');
      }

      await client.query(
        `
          UPDATE files
          SET deleted_at = NOW(), updated_at = NOW()
          WHERE id = $1 AND tenant_id = $2
        `,
        [fileId, req.tenantId],
      );

      await createOutboxEvent(client, {
        tenantId: req.tenantId,
        eventType: 'document.file.deleted',
        payload: {
          fileId,
          ownerService: file.owner_service,
          ownerEntityId: file.owner_entity_id,
        },
      });

      try {
        await fs.unlink(storagePathForFile(file));
      } catch {
        // Ignore missing local content; metadata delete is still authoritative.
      }

      await client.query('COMMIT');

      res.status(204).send();
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ code: 'DATABASE_ERROR', message: 'Database error' });
    } finally {
      client.release();
    }
  });

  return app;
};

module.exports = { createApp };
