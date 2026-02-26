import { buildApiUrl } from '@/app/api/config';
import { getArrayResponse, getResponse } from '@/app/api/servicesHelper';
import type { News } from './types';

/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param page - The page number to fetch news titles for (e.g., 0, 1, 2)
 * @param limit - The number of news titles to fetch per page (e.g., 10)
 * @returns Promise resolving to an array of LatestNewsTitle objects
 * @throws Error if the API request fails or returns an error
 */
export async function getNews(page?: number, limit?: number): Promise<News[]> {
  if (typeof page !== 'number' || page < 0) {
    page = 0;
  }
  if (typeof limit !== 'number' || limit > 12) {
    limit = 12;
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/news')}?page=${page}&limit=${limit}`;

  try {

    return await getArrayResponse<News>(url);
    
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
 * @param id - The id of news to fetch
 * @returns Promise resolving to an array of News object
 * @throws Error if the API request fails or returns an error
 */
export async function getNewsById(id: string): Promise<News> {
  // Validate id
  if (id != undefined && id !== null && id.length != 36) {
    throw new Error('Invalid news id');
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/news')}/${id}`;

  try {
    return await getResponse<News>(url);
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


