import { HeadlessWPBase } from '../common/base';
import { HeadlessWPPost } from '../common/types';
import { ValidationError } from '../common/errors';

/**
 * Class for interacting with WordPress posts
 * Provides methods to fetch posts and individual post details
 */
export class Posts extends HeadlessWPBase {
    /**
     * Fetches a list of posts with pagination
     * @param page - Page number (default: 1)
     * @param perPage - Number of posts per page (default: 10, max: 100)
     * @returns Promise with an array of posts
     * @throws ValidationError if page or perPage parameters are invalid
     */
    async getPosts(page = 1, perPage = 10): Promise<HeadlessWPPost[]> {
        if (page < 1) {
            throw new ValidationError('Page number must be greater than 0');
        }
        if (perPage < 1 || perPage > 100) {
            throw new ValidationError('Posts per page must be between 1 and 100');
        }

        return this.fetchWithAuth<HeadlessWPPost[]>(`/posts?_embed&page=${page}&per_page=${perPage}`);
    }

    /**
     * Fetches a single post by ID
     * @param id - The post ID
     * @returns Promise with the post details
     * @throws ValidationError if the post ID is invalid
     */
    async getPost(id: number): Promise<HeadlessWPPost> {
        if (!id || id < 1) {
            throw new ValidationError('Valid post ID is required');
        }

        return this.fetchWithAuth<HeadlessWPPost>(`/posts/${id}?_embed`);
    }
} 