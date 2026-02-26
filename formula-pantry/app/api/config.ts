/**
 * API Configuration
 * 
 * Reads the API base URL from environment variables.
 * In Next.js, environment variables prefixed with NEXT_PUBLIC_ are exposed to the browser.
 * 
 * Usage:
 *   Set NEXT_PUBLIC_API_URL in your .env.local file:
 *   NEXT_PUBLIC_API_URL=http://localhost:8080
 */

export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Builds a full API URL by appending the path to the base URL
 * @param path - API endpoint path (e.g., '/api/v1/sessions')
 * @returns Full URL string
 */
export function buildApiUrl(path: string): string {
  const baseUrl = API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const apiPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${apiPath}`;
}

