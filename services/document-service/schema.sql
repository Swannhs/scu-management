-- Document Service Schema
-- Implementation: PostgreSQL DDL

CREATE TYPE access_policy_type AS ENUM ('PUBLIC', 'PRIVATE', 'SHARED', 'TENANT_PUBLIC');

-- File Metadata
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,

    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    mime_type VARCHAR(100),
    size_bytes BIGINT,

    storage_provider VARCHAR(50) DEFAULT 'S3', -- S3, LOCAL, GCS
    storage_key VARCHAR(1024) NOT NULL, -- Path in bucket
    bucket VARCHAR(255),

    uploaded_by UUID, -- User ID
    owner_service VARCHAR(100), -- e.g. "student-service", "lms"
    owner_entity_id UUID, -- e.g. student_id

    access_policy access_policy_type DEFAULT 'PRIVATE',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_files_tenant ON files(tenant_id);
CREATE INDEX idx_files_owner ON files(tenant_id, owner_service, owner_entity_id);

-- File Access Grants (for SHARED policy)
CREATE TABLE file_access_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    file_id UUID NOT NULL REFERENCES files(id),

    grantee_type VARCHAR(50) NOT NULL, -- USER, ROLE, GROUP
    grantee_id VARCHAR(255) NOT NULL,

    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
