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

/**
 * API Response structure for sessions endpoints
 */
export interface UpcomingSessionTitlesResponse {
  data: UpcomingSessionTitle[];
}

/**
 * API Response structure for single session endpoint
 */
export interface UpcomingSessionTitleResponse {
  data: UpcomingSessionTitle;
}

/**
 * API Response structure for sessions endpoints
 */
export interface LatestNewsTitlesResponse {
  data: LatestNewsTitle[];
}

/**
 * API Response structure for single session endpoint
 */
export interface LatestNewsTitleResponse {
  data: LatestNewsTitle;
}


/**
 * API Error response structure
 */
export interface ApiError {
  error: string;
}

