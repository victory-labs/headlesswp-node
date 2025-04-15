import { HeadlessWPAuth } from '../api-keys/auth';
import { APIError, ValidationError } from './errors';

/**
 * Base class for WordPress API interactions
 * Provides common functionality for making authenticated requests to the WordPress REST API
 */
export class HeadlessWPBase {
    protected baseUrl: string;
    protected auth: HeadlessWPAuth;

    /**
     * Creates a new instance of HeadlessWPBase
     * @param baseUrl - The base URL of the WordPress site
     * @param auth - Authentication handler
     * @throws ValidationError if baseUrl is invalid
     */
    constructor(baseUrl: string, auth: HeadlessWPAuth) {
        if (!baseUrl) {
            throw new ValidationError('Base URL is required');
        }
        if (!auth) {
            throw new ValidationError('Authentication handler is required');
        }
        
        try {
            new URL(baseUrl); // Validate URL format
        } catch (e) {
            throw new ValidationError('Invalid base URL format');
        }
        
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash if present
        this.auth = auth;
    }

    /**
     * Makes an authenticated request to the WordPress API
     * @param endpoint - The API endpoint to call
     * @returns Promise with the JSON response
     * @throws ValidationError if endpoint is invalid
     * @throws APIError if the request fails or response is not OK
     */
    protected async fetchWithAuth<T>(endpoint: string): Promise<T> {
        if (!endpoint) {
            throw new ValidationError('Endpoint is required');
        }

        const timestamp = Math.floor(Date.now() / 1000);
        const signature = await this.auth.generateSignature(endpoint, timestamp);

        try {
            const response = await fetch(`${this.baseUrl}/wp-json/wp/v2${endpoint}`, {
                headers: {
                    'X-WP-API-Key': this.auth.getApiKey(),
                    'X-WP-API-Signature': signature,
                    'X-WP-API-Timestamp': timestamp.toString(),
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new APIError(
                    `WordPress API error: ${errorData.message || response.statusText}`,
                    response.status,
                    response.statusText
                );
            }

            return response.json();
        } catch (error) {
            if (error instanceof APIError) {
                throw error;
            }
            if (error instanceof Error) {
                throw new APIError(
                    `Failed to fetch from WordPress API: ${error.message}`,
                    0,
                    'Network Error'
                );
            }
            throw new APIError('An unknown error occurred while fetching from WordPress API', 0, 'Unknown Error');
        }
    }
} 