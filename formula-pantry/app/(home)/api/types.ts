/**
 * TypeScript types matching the backend UpcomingSessionTitle model
 * 
 * These types correspond to the Go structs in backend/internal/models/session.go
 */

export interface UpcomingSessionTitle {
  id: string; // UUID
  season: number;
  round_number: number;
  race_name: string;
  session_one_date_time: string;
  session_five_date_time: string;
}

export interface LatestNewsTitle {
  id: string; // UUID
  title: string;
  hook: string;
  updated_on: string;
}