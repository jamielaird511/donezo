-- Add parcel enrichment fields to jobs (nullable to avoid breaking existing rows)
alter table jobs
  add column if not exists parcel_id text,
  add column if not exists parcel_appellation text,
  add column if not exists parcel_area_sqm numeric,
  add column if not exists parcel_land_district text,
  add column if not exists parcel_titles text,
  add column if not exists parcel_status text;


