/**
 * TypeScript types matching the backend UpcomingSessionTitle model
 * 
 * These types correspond to the Go structs in backend/internal/models/session.go
 */

/**
 * API Response structure for generic endpoints returning an array of items
 */
export interface ArrayResponse<T> {
  data: T[];
}

/**
 * API Response structure for generic endpoints returning an item
 */
export interface Response<T> {
  data: T;
}

/**
 * API Error response structure
 */
export interface ApiError {
  error: string;
}

