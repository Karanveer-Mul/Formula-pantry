-- Script to drop all tables in the correct order (child tables first)
-- Run this if you need to reset the database schema

-- Drop tables in reverse order of dependencies
DROP TABLE IF EXISTS constructor_standings CASCADE;
DROP TABLE IF EXISTS driver_standings CASCADE;
DROP TABLE IF EXISTS session_results CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- Note: After dropping, run the application again to recreate tables with migrations

