-- Add access disclosure fields to jobs table
ALTER TABLE public.jobs
  ADD COLUMN IF NOT EXISTS access_is_standard BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS access_notes TEXT;

-- Add index on access_is_standard for filtering queries
CREATE INDEX IF NOT EXISTS idx_jobs_access_is_standard ON public.jobs(access_is_standard);

