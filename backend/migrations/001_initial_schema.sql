-- Initial database schema for Formula Pantry
-- Note: GORM AutoMigrate will handle most of this, but this file documents the schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add CHECK constraint for weather_conditions enum
-- This should be added after tables are created by GORM
-- Run this after the first migration:

-- ALTER TABLE sessions 
-- ADD CONSTRAINT check_weather_conditions 
-- CHECK (weather_conditions IS NULL OR weather_conditions IN ('dry', 'wet'));

-- Note: The above constraint can be added manually or through a migration tool.
-- GORM AutoMigrate will create the tables, but you may want to add constraints manually
-- for better database-level validation.

