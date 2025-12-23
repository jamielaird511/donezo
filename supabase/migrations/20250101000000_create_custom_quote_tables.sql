-- Create custom_quote_requests table
CREATE TABLE IF NOT EXISTS public.custom_quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  bedrooms TEXT NOT NULL,
  storeys TEXT NOT NULL,
  notes TEXT
);

-- Create custom_quote_provider_quotes table
CREATE TABLE IF NOT EXISTS public.custom_quote_provider_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  request_id UUID NOT NULL REFERENCES public.custom_quote_requests(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  quote_amount_cents INTEGER NOT NULL,
  quote_notes TEXT,
  received_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_custom_quote_requests_status ON public.custom_quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_custom_quote_provider_quotes_request_id ON public.custom_quote_provider_quotes(request_id);

-- Enable RLS
ALTER TABLE public.custom_quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_quote_provider_quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for custom_quote_requests
-- Allow anonymous inserts (for public form submissions)
CREATE POLICY "Allow anonymous inserts on custom_quote_requests"
  ON public.custom_quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read their own requests (if needed in future)
-- For now, we'll allow service role/admin to read all via service role key

-- RLS Policies for custom_quote_provider_quotes
-- Allow service role/admin to insert provider quotes
CREATE POLICY "Allow service role inserts on custom_quote_provider_quotes"
  ON public.custom_quote_provider_quotes
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role/admin to read provider quotes
CREATE POLICY "Allow service role reads on custom_quote_provider_quotes"
  ON public.custom_quote_provider_quotes
  FOR SELECT
  TO service_role
  USING (true);

