CREATE TABLE public.invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    customer_id uuid NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    invoice_number text,
    status text NOT NULL DEFAULT 'draft', -- e.g., 'draft', 'sent', 'paid', 'overdue', 'void'
    total_amount numeric(10, 2) NOT NULL DEFAULT 0.00,
    amount_due numeric(10, 2) NOT NULL DEFAULT 0.00,
    issued_date timestamptz DEFAULT now(),
    due_date timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can manage invoices within their own organization
DROP POLICY IF EXISTS "Allow users to manage invoices in their organization" ON public.invoices; -- Drop if exists for idempotency
CREATE POLICY "Allow users to manage invoices in their organization"
ON public.invoices
FOR ALL
USING ( organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()) )
WITH CHECK ( organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()) );

-- Add index for faster lookups by organization
CREATE INDEX IF NOT EXISTS idx_invoices_organization_id ON public.invoices(organization_id);
-- Add index for faster lookups by customer
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON public.invoices(customer_id);

-- Payments Table
CREATE TABLE public.payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    customer_id uuid REFERENCES public.customers(id) ON DELETE SET NULL,
    invoice_id uuid REFERENCES public.invoices(id) ON DELETE SET NULL,
    amount numeric(10, 2) NOT NULL,
    payment_date timestamptz DEFAULT now(),
    method text, -- e.g., 'credit_card', 'bank_transfer', 'cash'
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can manage payments within their own organization
DROP POLICY IF EXISTS "Allow users to manage payments in their organization" ON public.payments;
CREATE POLICY "Allow users to manage payments in their organization"
ON public.payments
FOR ALL
USING ( organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()) )
WITH CHECK ( organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()) );

-- Add index for faster lookups by organization
CREATE INDEX IF NOT EXISTS idx_payments_organization_id ON public.payments(organization_id);
-- Add index for faster lookups by invoice
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON public.payments(invoice_id);

-- Activity Log Table
CREATE TABLE public.activity_log (
    id bigserial PRIMARY KEY,
    organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    activity_type text NOT NULL, -- e.g., 'invoice_created', 'payment_received', 'customer_added'
    description text NOT NULL,
    related_id uuid,
    related_table text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view activity within their own organization
DROP POLICY IF EXISTS "Allow users to view activity in their organization" ON public.activity_log;
CREATE POLICY "Allow users to view activity in their organization"
ON public.activity_log
FOR SELECT
USING ( organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()) );

-- RLS Policy: Allow service role OR authenticated users to insert logs into their own org
DROP POLICY IF EXISTS "Allow authenticated users or service_role to insert logs" ON public.activity_log;
CREATE POLICY "Allow authenticated users or service_role to insert logs"
ON public.activity_log
FOR INSERT
WITH CHECK (
    auth.role() = 'service_role'
    OR
    (auth.role() = 'authenticated' AND organization_id = (SELECT organization_id FROM public.profiles WHERE id = auth.uid()))
);

-- Add index for faster lookups by organization and time
CREATE INDEX IF NOT EXISTS idx_activity_log_org_time ON public.activity_log(organization_id, created_at DESC); 