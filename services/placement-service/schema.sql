-- Placement Service Schema
-- Implementation: PostgreSQL DDL

CREATE TYPE job_type AS ENUM ('FULL_TIME', 'INTERNSHIP', 'PART_TIME');
CREATE TYPE application_status AS ENUM ('APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'SELECTED', 'REJECTED');

-- Companies
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),

    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_companies_tenant ON companies(tenant_id);

-- Job Posts (Drives)
CREATE TABLE job_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    company_id UUID NOT NULL REFERENCES companies(id),

    title VARCHAR(255) NOT NULL,
    description TEXT,
    job_type job_type DEFAULT 'FULL_TIME',

    location VARCHAR(100),
    salary_range VARCHAR(100), -- e.g. "10-12 LPA"

    eligibility_criteria JSONB, -- e.g. {"min_cgpa": 7.0, "allowed_branches": ["CS", "IT"]}

    deadline DATE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_jobs_company ON job_posts(company_id);
CREATE INDEX idx_jobs_active ON job_posts(tenant_id, is_active);

-- Applications
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    job_post_id UUID NOT NULL REFERENCES job_posts(id),
    student_id UUID NOT NULL, -- Reference to student-service

    status application_status DEFAULT 'APPLIED',

    resume_url VARCHAR(1024), -- Specific resume for this job
    cover_letter TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX idx_apps_student_job ON applications(student_id, job_post_id);
CREATE INDEX idx_apps_job_status ON applications(job_post_id, status);

-- Offers
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    application_id UUID NOT NULL REFERENCES applications(id),

    ctc NUMERIC(12, 2), -- Cost to Company
    currency VARCHAR(3) DEFAULT 'USD',

    offer_letter_url VARCHAR(1024),

    is_accepted BOOLEAN DEFAULT NULL, -- NULL=Pending, True=Accepted, False=Rejected

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Event Outbox
CREATE TABLE event_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    retries INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
