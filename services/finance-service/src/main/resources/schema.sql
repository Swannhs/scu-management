-- Finance Service Schema
-- Implementation: PostgreSQL DDL

CREATE TYPE fee_status AS ENUM ('PENDING', 'PAID', 'PARTIAL', 'OVERDUE', 'CANCELLED');
CREATE TYPE payment_method AS ENUM ('CASH', 'CHEQUE', 'BANK_TRANSFER', 'ONLINE', 'POS');
CREATE TYPE transaction_type AS ENUM ('PAYMENT', 'REFUND', 'WAIVER', 'FINE');

-- Fee Structure (Templates for fees)
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    program_id UUID, -- Optional: link to program
    academic_term_id UUID, -- Optional: link to term
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_fee_struct_tenant ON fee_structures(tenant_id);

-- Fee Heads (Line items in structure, e.g. "Tuition", "Lab Fee")
CREATE TABLE fee_heads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    fee_structure_id UUID NOT NULL REFERENCES fee_structures(id),
    name VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    is_optional BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
CREATE INDEX idx_fee_heads_struct ON fee_heads(fee_structure_id);

-- Invoices (Assigned to Student)
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL, -- Reference to student-service
    invoice_number VARCHAR(50) NOT NULL,

    total_amount NUMERIC(12, 2) NOT NULL,
    paid_amount NUMERIC(12, 2) DEFAULT 0.00,
    balance_amount NUMERIC(12, 2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,

    due_date DATE NOT NULL,
    status fee_status DEFAULT 'PENDING',

    odoo_partner_id VARCHAR(100),
    odoo_invoice_id VARCHAR(100),
    odoo_sync_status VARCHAR(20) DEFAULT 'PENDING',
    odoo_last_sync_at TIMESTAMP WITH TIME ZONE,
    odoo_sync_error VARCHAR(500),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,

    UNIQUE(tenant_id, invoice_number)
);
CREATE INDEX idx_invoices_tenant_student ON invoices(tenant_id, student_id);
CREATE INDEX idx_invoices_status ON invoices(tenant_id, status);

-- Invoice Items
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    invoice_id UUID NOT NULL REFERENCES invoices(id),
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments (Transactions)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    invoice_id UUID NOT NULL REFERENCES invoices(id),

    transaction_id VARCHAR(100), -- External gateway ID
    amount NUMERIC(12, 2) NOT NULL,
    method payment_method NOT NULL,
    type transaction_type DEFAULT 'PAYMENT',

    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(tenant_id, transaction_id)
);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);

-- Student Wallets (for excess payments/refunds)
CREATE TABLE student_wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    balance NUMERIC(12, 2) DEFAULT 0.00,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(tenant_id, student_id)
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
