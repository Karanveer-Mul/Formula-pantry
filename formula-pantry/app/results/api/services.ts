import { buildApiUrl } from '@/app/api/config';
import { getArrayResponse, getResponse } from '@/app/api/servicesHelper';
import type { ConstructorStanding, DriverStanding } from './types';

/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param season - The year/season to fetch constructor standings for (e.g., 2026)
 * @returns Promise resolving to an array of ConstructorStanding objects
 * @throws Error if the API request fails or returns an error
 */
export async function getConstructorStandings(season?: number, limit?: number): Promise<ConstructorStanding[]> {
  
  // Validate season parameter
  const currentYear = new Date().getFullYear();
  if (season === undefined || season === null) {
    season = currentYear;
  }
  if (season < 1950 || season > currentYear) {
    throw new Error(`Invalid season: ${season}. Season must be between 1950 and ${currentYear}.`);
  }

  if (limit === undefined || limit === null) {
    limit = 11
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/standings/constructors')}?season=${season}&limit=${limit}`;

  try {

    return await getArrayResponse<ConstructorStanding>(url);
    
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
 * @param season - The year/season to fetch driver standings for (e.g., 2026)
 * @returns Promise resolving to an array of DriverStanding objects
 * @throws Error if the API request fails or returns an error
 */
export async function getDriverStandings(season?: number, limit?: number): Promise<DriverStanding[]> {
  
  // Validate season parameter
  const currentYear = new Date().getFullYear();
  if (season === undefined || season === null) {
    season = currentYear;
  }
  if (season < 1950 || season > currentYear) {
    throw new Error(`Invalid season: ${season}. Season must be between 1950 and ${currentYear}.`);
  }

  if (limit === undefined || limit === null) {
    limit = 10
  }

  // Build the API URL with query parameter
  const url = `${buildApiUrl('/api/v1/standings/drivers')}?season=${season}&limit=${limit}`;

  try {

    return await getArrayResponse<DriverStanding>(url);
    
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