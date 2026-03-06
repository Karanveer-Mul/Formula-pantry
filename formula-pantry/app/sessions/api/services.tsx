import { getArrayResponse, getResponse } from '@/app/api/servicesHelper';
import { buildApiUrl } from '../../api/config';
import type { Session, SessionsResponse, ApiError } from './types';

/**
 * Fetches sessions for a specific season from the backend API
 * 
 * @param season - The year/season to fetch sessions for (e.g., 2026)
 * @returns Promise resolving to an array of Session objects
 * @throws Error if the API request fails or returns an error
 * 
 * @example
 * ```tsx
 * try {
 *   const sessions = await getSessionsBySeason(2026);
 *   console.log(sessions);
 * } catch (error) {
 *   console.error('Failed to fetch sessions:', error);
 * }
 * ```
 */
export async function getSessionsBySeason(season: number): Promise<Session[]> {
  // Validate season parameter
  const currentYear = new Date().getFullYear();
  if (season === undefined || season === null) {
    season = currentYear;
  }
  if (season < 1950 || season > currentYear) {
    throw new Error(`Invalid season: ${season}. Season must be between 1950 and ${currentYear}.`);
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/sessions')}?season=${season}`;

  try {
    return await getArrayResponse<Session>(url);
  } catch (error) {
    // Re-throw known errors
    if (error instanceof Error) {
      throw error;
    }
    
    // Handle network errors and other unknown errors
    throw new Error(
      `Failed to fetch sessions: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}


export async function getSessionsById(id: string): Promise<Session> {
  // Validate id
  if (id != undefined && id !== null && id.length != 36) {
    throw new Error('Invalid session id');
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/sessions')}/${id}`;

  try {
    return await getResponse<Session>(url);
  } catch (error) {
    // Re-throw known errors
    if (error instanceof Error) {
      throw error;
    }
    
    // Handle network errors and other unknown errors
    throw new Error(
      `Failed to fetch session: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function getUpcomingSession(): Promise<Session> {
  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/sessions')}/upcoming`;

  try {
    return await getResponse<Session>(url);
  } catch (error) {
    // Re-throw known errors
    if (error instanceof Error) {
      throw error;
    }

    // Handle network errors and other unknown errors
    throw new Error(
      `Failed to fetch upcoming session: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

  