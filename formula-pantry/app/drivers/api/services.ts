import { buildApiUrl } from '@/app/api/config';
import { getArrayResponse, getResponse } from '@/app/api/servicesHelper';
import type { Driver } from './types';

/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param season - The year/season to fetch drivers for (e.g., 2026)
 * @returns Promise resolving to an array of Driver objects
 * @throws Error if the API request fails or returns an error
 */
export async function getDrivers(season?: number): Promise<Driver[]> {
  
  // Validate season parameter
  const currentYear = new Date().getFullYear();
  if (season === undefined || season === null) {
    season = currentYear;
  }
  if (season < 1950 || season > currentYear) {
    throw new Error(`Invalid season: ${season}. Season must be between 1950 and ${currentYear}.`);
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/drivers')}?season=${season}`;

  try {

    return await getArrayResponse<Driver>(url);
    
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
 * @param id - The id of driver to fetch
 * @returns Promise resolving to a Driver object
 * @throws Error if the API request fails or returns an error
 */
export async function getDriverById(id: string): Promise<Driver> {
  // Validate id
  if (id != undefined && id !== null && id.length != 36) {
    throw new Error('Invalid driver id');
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/drivers')}/${id}`;

  try {
    return await getResponse<Driver>(url);
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


