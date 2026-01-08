const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { extractTenantAndUser } = require('./src/middleware/auth');
const pool = require('./src/db');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(extractTenantAndUser);

const insertOutbox = async (client, tenantId, eventType, payload, user) => {
    const outboxQuery = `
      INSERT INTO event_outbox (tenant_id, event_type, payload)
      VALUES ($1, $2, $3)
    `;
    const eventPayload = {
        ...payload,
        actor: {
            id: user.id,
            roles: user.roles
        },
        occurredAt: new Date().toISOString()
    };
    await client.query(outboxQuery, [tenantId, eventType, JSON.stringify(eventPayload)]);
};

// --- APIs ---

// 1. Initiate Upload
app.post('/v1/files/initiate-upload', async (req, res) => {
  const { filename, mimeType, sizeBytes, ownerService, ownerEntityId, accessPolicy } = req.body;

  if (!filename || !ownerService || !ownerEntityId) {
    return res.status(400).json({ code: 'INVALID_INPUT', message: 'Missing required fields', details: null });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const fileId = uuidv4();
    const storageKey = `${req.tenantId}/${ownerService}/${ownerEntityId}/${fileId}/${filename}`;

    const query = `
      INSERT INTO files (id, tenant_id, filename, mime_type, size_bytes, storage_key, uploaded_by, owner_service, owner_entity_id, access_policy)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, storage_key;
    `;
    const values = [
      fileId,
      req.tenantId,
      filename,
      mimeType,
      sizeBytes,
      storageKey,
      req.user.id,
      ownerService,
      ownerEntityId,
      accessPolicy || 'PRIVATE'
    ];

    await client.query(query, values);

    // Outbox Event
    await insertOutbox(client, req.tenantId, 'document.file.created', { fileId, filename, ownerService, ownerEntityId }, req.user);

    await client.query('COMMIT');

    // Mock Presigned URL
    const uploadUrl = `https://mock-storage.com/upload/${storageKey}?token=mock-token`;

    res.json({
      fileId,
      uploadUrl,
      storageKey,
      expiresAt: new Date(Date.now() + 3600 * 1000)
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Database error', details: err.message });
  } finally {
    client.release();
  }
});

// 2. Complete Upload
app.post('/v1/files/complete-upload', async (req, res) => {
  res.json({ status: 'active' });
});

// 3. Get File Metadata
app.get('/v1/files/:fileId', async (req, res) => {
  const { fileId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM files WHERE id = $1 AND tenant_id = $2', [fileId, req.tenantId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ code: 'FILE_NOT_FOUND', message: 'File not found', details: null });
    }

    const file = result.rows[0];

    // Access Control Logic
    let hasAccess = false;

    if (file.uploaded_by === req.user.id) hasAccess = true;
    else if (file.access_policy === 'TENANT_PUBLIC') hasAccess = true;
    else if (file.access_policy === 'PUBLIC') hasAccess = true;
    else {
      // Check grants
      const grantQuery = `
        SELECT 1 FROM file_access_grants
        WHERE file_id = $1
        AND tenant_id = $2
        AND (
          (grantee_type = 'USER' AND grantee_id = $3)
          OR (grantee_type = 'ROLE' AND grantee_id = ANY($4))
        )
      `;
      const grantRes = await pool.query(grantQuery, [fileId, req.tenantId, req.user.id, req.user.roles]);
      if (grantRes.rows.length > 0) hasAccess = true;
    }

    if (!hasAccess) {
      return res.status(403).json({ code: 'ACCESS_DENIED', message: 'Access denied', details: null });
    }

    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Database error', details: err.message });
  }
});

// 4. Share File
app.post('/v1/files/:fileId/share', async (req, res) => {
  const { fileId } = req.params;
  const { granteeType, granteeId, expiresAt } = req.body;

  const client = await pool.connect();
  try {
      await client.query('BEGIN');

      // Only owner can share
      const fileCheck = await client.query('SELECT uploaded_by FROM files WHERE id = $1 AND tenant_id = $2', [fileId, req.tenantId]);
      if (fileCheck.rows.length === 0) {
          await client.query('ROLLBACK');
          return res.status(404).json({ code: 'FILE_NOT_FOUND', message: 'File not found', details: null });
      }
      if (fileCheck.rows[0].uploaded_by !== req.user.id) {
          await client.query('ROLLBACK');
          return res.status(403).json({ code: 'ACCESS_DENIED', message: 'Only owner can share', details: null });
      }

      const query = `
        INSERT INTO file_access_grants (tenant_id, file_id, grantee_type, grantee_id, expires_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const result = await client.query(query, [req.tenantId, fileId, granteeType, granteeId, expiresAt]);

      await insertOutbox(client, req.tenantId, 'document.file.shared', { fileId, granteeType, granteeId }, req.user);

      await client.query('COMMIT');
      res.json({ grantId: result.rows[0].id });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Database error', details: err.message });
  } finally {
      client.release();
  }
});

// 5. Download URL
app.get('/v1/files/:fileId/download-url', async (req, res) => {
  const { fileId } = req.params;
  try {
     const result = await pool.query('SELECT * FROM files WHERE id = $1 AND tenant_id = $2', [fileId, req.tenantId]);
     if (result.rows.length === 0) {
       return res.status(404).json({ code: 'FILE_NOT_FOUND', message: 'File not found', details: null });
     }
     const file = result.rows[0];
     // Access Check
     let hasAccess = false;
     if (file.uploaded_by === req.user.id) hasAccess = true;
     else if (file.access_policy === 'TENANT_PUBLIC') hasAccess = true;
     else if (file.access_policy === 'PUBLIC') hasAccess = true;
     else {
        const grantRes = await pool.query(`SELECT 1 FROM file_access_grants WHERE file_id = $1 AND tenant_id = $2 AND ((grantee_type = 'USER' AND grantee_id = $3) OR (grantee_type = 'ROLE' AND grantee_id = ANY($4)))`, [fileId, req.tenantId, req.user.id, req.user.roles]);
        if (grantRes.rows.length > 0) hasAccess = true;
     }

     if (!hasAccess) return res.status(403).json({ code: 'ACCESS_DENIED', message: 'Access denied', details: null });

     const expiresAt = new Date(Date.now() + 3600 * 1000);
     res.json({
       download_url: `https://mock-storage.com/download/file/${fileId}?signed=true`,
       expires_at: expiresAt
     });

  } catch (err) {
    console.error(err);
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Database error', details: err.message });
  }
});

// 6. Delete File (Soft Delete)
app.delete('/v1/files/:fileId', async (req, res) => {
  const { fileId } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('SELECT * FROM files WHERE id = $1 AND tenant_id = $2', [fileId, req.tenantId]);
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ code: 'FILE_NOT_FOUND', message: 'File not found', details: null });
    }
    const file = result.rows[0];

    // Only owner or TENANT_ADMIN can delete
    const isAdmin = req.user.roles.includes('TENANT_ADMIN');
    if (file.uploaded_by !== req.user.id && !isAdmin) {
       await client.query('ROLLBACK');
       return res.status(403).json({ code: 'ACCESS_DENIED', message: 'Only owner or admin can delete', details: null });
    }

    await client.query('UPDATE files SET deleted_at = NOW() WHERE id = $1 AND tenant_id = $2', [fileId, req.tenantId]);

    await insertOutbox(client, req.tenantId, 'document.file.deleted', { fileId }, req.user);

    await client.query('COMMIT');
    res.json({ status: 'DELETED', file_id: fileId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Database error', details: err.message });
  } finally {
      client.release();
  }
});

app.listen(port, () => {
  console.log(`Document service listening at http://localhost:${port}`);
});
