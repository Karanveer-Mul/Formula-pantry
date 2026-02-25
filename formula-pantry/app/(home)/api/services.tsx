import { buildApiUrl } from '../../api/config';
import { getArrayResponse } from '@/app/api/servicesHelper';
import type { UpcomingSessionTitle, UpcomingSessionTitlesResponse, LatestNewsTitlesResponse,  LatestNewsTitle, ApiError } from './types';

/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param page - The page number to fetch news titles for (e.g., 0, 1, 2)
 * @param limit - The number of news titles to fetch per page (e.g., 10)
 * @returns Promise resolving to an array of LatestNewsTitle objects
 * @throws Error if the API request fails or returns an error
 */
export async function getLatestNewsTitles(page: number, limit: number): Promise<LatestNewsTitle[]> {
  if (typeof page !== 'number' || page < 0) {
    page = 0;
  }
  if (typeof limit !== 'number' || limit > 10) {
    limit = 10;
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/news/latestTitles')}?page=${page}&limit=${limit}`;

  try {

    return await getArrayResponse<LatestNewsTitle>(url);
    
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


/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param page - The page number to fetch news titles for (e.g., 0, 1, 2)
 * @param limit - The number of news titles to fetch per page (e.g., 10)
 * @returns Promise resolving to an array of LatestNewsTitle objects
 * @throws Error if the API request fails or returns an error
 */
export async function getUpcomingSessionTitles(limit: number): Promise<UpcomingSessionTitle[]> {
  if (typeof limit !== 'number' || limit < 3) {
    limit = 3;
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/sessions/upcomingSessionTitles')}?limit=${limit}`;

  try {
    return await getArrayResponse<UpcomingSessionTitle>(url);
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

