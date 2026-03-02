import { ArrayResponse, Response, ApiError } from './types';

/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param url - The API endpoint URL to fetch data from
 * @returns Promise resolving to an array of Type objects
 * @throws Error if the API request fails or returns an error
 */
export async function getArrayResponse<T>(url: string, revalidate: number = 0): Promise<T[]> {

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: revalidate },
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
    const data: ArrayResponse<T> = await response.json();
    
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


/**
 * Fetches uppcoming session titles and latest news titles from the backend API
 * 
 * @param url - The API endpoint URL to fetch data from
 * @returns Promise resolving to an array of Type objects
 * @throws Error if the API request fails or returns an error
 */
export async function getResponse<T>(url: string, revalidate: number = 3600): Promise<T> {

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: revalidate },
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
    const data: Response<T> = await response.json();
    
    // Validate response structure
    if (!data) {
      throw new Error('Invalid response from API');
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