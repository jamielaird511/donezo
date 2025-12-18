-- Learning-focused quote inputs (not used for pricing yet)
alter table jobs
  add column if not exists storeys text,
  add column if not exists job_complexity text,
  add column if not exists urgency text;


