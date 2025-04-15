import { AuthenticationError, ValidationError } from '../common/errors';

/**
 * Handles authentication for WordPress API requests
 * Manages API key and secret, and generates signatures for requests
 */
export class HeadlessWPAuth {
    private apiKey: string;
    private apiSecret: string;

    /**
     * Creates a new instance of HeadlessWPAuth
     * @param apiKey - The WordPress API key
     * @param apiSecret - The WordPress API secret
     * @throws ValidationError if apiKey or apiSecret are not provided
     */
    constructor(apiKey: string, apiSecret: string) {
        if (!apiKey) {
            throw new ValidationError('API key is required');
        }
        if (!apiSecret) {
            throw new ValidationError('API secret is required');
        }

        // Validate API key format (32 characters hex)
        if (!/^[a-f0-9]{32}$/i.test(apiKey)) {
            throw new ValidationError('Invalid API key format');
        }

        // Validate API secret format (64 characters hex)
        if (!/^[a-f0-9]{64}$/i.test(apiSecret)) {
            throw new ValidationError('Invalid API secret format');
        }

        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * Generates a signature for API request authentication
     * @param endpoint - The API endpoint being called
     * @param timestamp - Unix timestamp in seconds
     * @returns Promise with the generated signature
     * @throws ValidationError if parameters are invalid
     * @throws AuthenticationError if signature generation fails
     */
    async generateSignature(endpoint: string, timestamp: number): Promise<string> {
        if (!endpoint) {
            throw new ValidationError('Endpoint is required for signature generation');
        }
        if (!timestamp || timestamp < 0) {
            throw new ValidationError('Valid timestamp is required for signature generation');
        }

        try {
            // Create a string to sign using the endpoint, timestamp, and secret
            const stringToSign = `${endpoint}${timestamp}${this.apiSecret}`;

            // Use the Web Crypto API to create an HMAC SHA-256 signature
            const encoder = new TextEncoder();
            const key = await crypto.subtle.importKey(
                'raw',
                encoder.encode(this.apiSecret),
                { name: 'HMAC', hash: 'SHA-256' },
                false,
                ['sign'],
            );

            const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(stringToSign));

            // Convert the signature to a hex string
            return Array.from(new Uint8Array(signature))
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('');
        } catch (error) {
            if (error instanceof Error) {
                throw new AuthenticationError(`Failed to generate signature: ${error.message}`);
            }
            throw new AuthenticationError('An unknown error occurred while generating signature');
        }
    }

    /**
     * Gets the API key
     * @returns The API key
     */
    getApiKey(): string {
        return this.apiKey;
    }
} 