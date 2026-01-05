-- Library Service Schema
-- Implementation: PostgreSQL DDL

CREATE TYPE book_status AS ENUM ('AVAILABLE', 'LOST', 'DAMAGED', 'ARCHIVED');
CREATE TYPE loan_status AS ENUM ('ISSUED', 'RETURNED', 'OVERDUE', 'LOST');

-- Books (Catalog)
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    publisher VARCHAR(255),
    edition VARCHAR(50),
    category VARCHAR(100),

    total_copies INT DEFAULT 0,
    available_copies INT DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_books_tenant ON books(tenant_id);
CREATE INDEX idx_books_isbn ON books(tenant_id, isbn);

-- Book Copies (Physical Items)
CREATE TABLE book_copies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    book_id UUID NOT NULL REFERENCES books(id),
    barcode VARCHAR(100) NOT NULL, -- Unique identifier sticker
    status book_status DEFAULT 'AVAILABLE',
    location VARCHAR(100), -- Shelf

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,

    UNIQUE(tenant_id, barcode)
);

-- Loans
CREATE TABLE loans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID, -- Can be student or faculty
    faculty_id UUID,

    book_copy_id UUID NOT NULL REFERENCES book_copies(id),

    issued_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,

    status loan_status DEFAULT 'ISSUED',
    fine_amount NUMERIC(12, 2) DEFAULT 0.00,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_loans_student ON loans(tenant_id, student_id);
CREATE INDEX idx_loans_status ON loans(tenant_id, status);

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
