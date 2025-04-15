/**
 * Base error class for WordPress API client errors
 */
export class HeadlessWPError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HeadlessWPError';
    }
}

/**
 * Error thrown when authentication fails
 */
export class AuthenticationError extends HeadlessWPError {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

/**
 * Error thrown when API request fails
 */
export class APIError extends HeadlessWPError {
    public status: number;
    public statusText: string;

    constructor(message: string, status: number, statusText: string) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.statusText = statusText;
    }
}

/**
 * Error thrown when input validation fails
 */
export class ValidationError extends HeadlessWPError {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
} 