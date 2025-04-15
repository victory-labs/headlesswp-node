import { HeadlessWPAuth } from './api-keys/auth';
import { Posts } from './posts/posts';
import { HeadlessWPPost } from './common/types';
import { HeadlessWPError, APIError, AuthenticationError, ValidationError } from './common/errors';

/**
 * Main entry point for the WordPress API client
 * @example
 * ```typescript
 * const auth = new HeadlessWPAuth('your-api-key', 'your-api-secret');
 * const posts = new Posts('https://your-wordpress-site.com', auth);
 * 
 * // Get a list of posts
 * const allPosts = await posts.getPosts();
 * 
 * // Get a single post
 * const post = await posts.getPost(1);
 * ```
 */
export {
    HeadlessWPAuth,
    Posts,
    HeadlessWPPost,
    HeadlessWPError,
    APIError,
    AuthenticationError,
    ValidationError
};