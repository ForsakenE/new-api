-- Migration: Add extended metadata fields to models table
-- Date: 2026-08-06
-- Description: Add context_length, input_modalities, output_modalities columns
--              to support model metadata synchronized from Buyer

-- Add context_length column (bigint, default 0)
ALTER TABLE models ADD COLUMN IF NOT EXISTS context_length BIGINT DEFAULT 0;

-- Add input_modalities column (comma-separated string)
ALTER TABLE models ADD COLUMN IF NOT EXISTS input_modalities VARCHAR(255) DEFAULT '';

-- Add output_modalities column (comma-separated string)
ALTER TABLE models ADD COLUMN IF NOT EXISTS output_modalities VARCHAR(255) DEFAULT '';

-- Create index on context_length for filtering
CREATE INDEX IF NOT EXISTS idx_models_context_length ON models(context_length);

-- Note: These fields are synchronized from Buyer via ModelSyncService
-- Buyer stores: context_length (independent column), input_modalities (independent column),
-- output_modalities (independent column), and endpoints (JSON with limits/pricing/capabilities)
