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
    throw new Error(`Invalid season: ${season}. Season must be between 1950 and 2100.`);
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/sessions')}?season=${season}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if response is ok (status 200-299)
    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData: ApiError = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If error response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Parse successful response
    const data: SessionsResponse = await response.json();
    
    // Validate response structure
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid response format from API');
    }

    return data.data;
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

