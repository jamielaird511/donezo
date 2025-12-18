-- Add non-standard flags to jobs (nullable/default-safe)
alter table jobs
  add column if not exists is_non_standard boolean,
  add column if not exists non_standard_reason text;



