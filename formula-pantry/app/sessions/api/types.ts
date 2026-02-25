/**
 * TypeScript types matching the backend Session model
 * 
 * These types correspond to the Go structs in backend/internal/models/session.go
 */

export interface Session {
  id: string; // UUID
  season: number;
  round_number: number;
  race_name: string;
  race_format: string; // 'conventional' | 'sprint_qualifying'
  country: string | null;
  city: string | null;
  
  // Race timing (ISO 8601 date strings)
  race_date_time: string;
  session_one_date_time: string;
  session_two_date_time: string;
  session_three_date_time: string;
  session_four_date_time: string;
  session_five_date_time: string;
  
  // Circuit info
  circuit_length: number | null; // in km
  laps: number | null;
  total_distance: number | null; // total race distance = circuit_length * laps
  
  // Weather and conditions
  weather_conditions: 'dry' | 'wet' | null;
  track_temperature: number | null; // 2-digit integer
  
  // Status
  is_completed: boolean;
  is_cancelled: boolean;
  
  // Metadata
  created_at: string;
  updated_at: string;
  
  // Relationships (optional, only present when explicitly requested)
  session_results?: SessionResult[];
}

export interface SessionResult {
  id: string; // UUID
  session_id: string; // UUID
  driver_id: string; // UUID
  position: number | null;
  points: number | null;
  grid_position: number | null;
  fastest_lap: boolean;
  fastest_lap_time: string | null;
  status: string; // e.g., 'Finished', 'DNF', etc.
  created_at: string;
  updated_at: string;
}

/**
 * API Response structure for sessions endpoints
 */
export interface SessionsResponse {
  data: Session[];
}

/**
 * API Response structure for single session endpoint
 */
export interface SessionResponse {
  data: Session;
}

/**
 * API Error response structure
 */
export interface ApiError {
  error: string;
}

