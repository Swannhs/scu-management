const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { extractTenantAndUser } = require('./middleware/auth');
const { isAccessAllowed } = require('./access');
const { createOutboxEvent } = require('./outbox');

const errorResponse = (res, status, code, message, details) =>
  res.status(status).json({ code, message, details });

const createApp = ({ pool }) => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use(extractTenantAndUser);

  const loadFileForTenant = async (fileId, tenantId, client = pool) => {
    const result = await client.query(
      'SELECT * FROM files WHERE id = $1 AND tenant_id = $2 AND deleted_at IS NULL',
      [fileId, tenantId],
    );
    return result.rows[0];
  };

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

      const uploadUrl = `https://mock-storage.com/upload/${storageKey}?token=mock-token`;

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

      const downloadUrl = `https://mock-storage.com/download/${file.storage_key}?token=mock-token`;

      res.json({ downloadUrl });
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
