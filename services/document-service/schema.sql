-- Document Service Schema
-- Implementation: PostgreSQL DDL

CREATE TYPE access_policy_type AS ENUM ('PUBLIC', 'PRIVATE', 'SHARED', 'TENANT_PUBLIC');
CREATE TYPE file_status_type AS ENUM ('PENDING', 'ACTIVE');
CREATE TYPE outbox_status_type AS ENUM ('PENDING', 'PUBLISHED', 'FAILED');

-- File Metadata
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,

    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    mime_type VARCHAR(100),
    size_bytes BIGINT,

    storage_provider VARCHAR(50) DEFAULT 'S3',
    storage_key VARCHAR(1024) NOT NULL,
    bucket VARCHAR(255),
    etag VARCHAR(255),

    uploaded_by UUID,
    owner_service VARCHAR(100),
    owner_entity_id UUID,

    access_policy access_policy_type DEFAULT 'PRIVATE',
    status file_status_type DEFAULT 'PENDING',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_files_tenant ON files(tenant_id);
CREATE INDEX idx_files_owner ON files(tenant_id, owner_service, owner_entity_id);
CREATE INDEX idx_files_storage_key ON files(storage_key);

-- File Access Grants (for SHARED policy)
CREATE TABLE file_access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    file_id UUID NOT NULL REFERENCES files(id),

    grantee_type VARCHAR(50) NOT NULL,
    grantee_id VARCHAR(255) NOT NULL,

    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_file_grants_tenant ON file_access_grants(tenant_id, file_id);

-- Event Outbox
CREATE TABLE event_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    payload JSONB NOT NULL,
    status outbox_status_type DEFAULT 'PENDING',
    retries INT DEFAULT 0,
    last_error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_outbox_status ON event_outbox(status, created_at);
