import { HeadlessWPConfig } from './types/config';
import { createClient } from './client';
import * as headlesswp from './headlesswp';
import { Post, Page, Menu } from './types/content';

// Create a single instance for the default exports
let defaultInstance: HeadlessWP | null = null;

export class HeadlessWP {
  private client: ReturnType<typeof createClient>;
  private config: HeadlessWPConfig;

  constructor(config?: HeadlessWPConfig) {
    // If no config is provided, try to use Next.js environment variables
    if (!config) {
      const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
      
      if (!graphqlUrl) {
        throw new Error('NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is not defined');
      }

      config = {
        graphqlUrl,
        authToken: process.env.NEXT_PUBLIC_WORDPRESS_AUTH_TOKEN,
        revalidate: 3600, // 1 hour
      };
    }

    this.config = config;
    this.client = createClient(config);
  }

  // Queries
  getPostBySlug = (slug: string) => {
    return headlesswp.getPostBySlug(this.client, slug);
  };

  getPageBySlug = (slug: string) => {
    return headlesswp.getPageBySlug(this.client, slug);
  };

  getAllPosts = () => {
    return headlesswp.getAllPosts(this.client);
  };

  getAllPages = () => {
    return headlesswp.getAllPages(this.client);
  };

  getMenuBySlug = (slug: string) => {
    return headlesswp.getMenuBySlug(this.client, slug);
  };

  getCategoryBySlug = (slug: string) => {
    return headlesswp.getCategoryBySlug(this.client, slug);
  };

  getTagBySlug = (slug: string) => {
    return headlesswp.getTagBySlug(this.client, slug);
  };

  getPreview = (id: string, idType: string) => {
    return headlesswp.getPreview(this.client, id, idType);
  };

  // Mutations
  createComment = (input: any) => {
    return headlesswp.createComment(this.client, input);
  };

  // Search
  search = (query: string) => {
    return headlesswp.searchQuery(this.client, query);
  };

  // Next.js specific methods with error handling
  getPosts = async (): Promise<Post[]> => {
    console.log('Fetching posts...');
    try {
      return await this.getAllPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  getPages = async (): Promise<Page[]> => {
    try {
      return await this.getAllPages();
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  };
}

// Export types
export * from './types/content';
export * from './types/config';
export * from './types/common';

// Create the default instance
defaultInstance = new HeadlessWP();

// Export individual functions
export const getPosts = () => defaultInstance!.getPosts();
export const getPostBySlug = (slug: string) => defaultInstance!.getPostBySlug(slug);
export const getPages = () => defaultInstance!.getPages();
export const getPageBySlug = (slug: string) => defaultInstance!.getPageBySlug(slug);
export const getMenuBySlug = (slug: string) => defaultInstance!.getMenuBySlug(slug);
export const getCategoryBySlug = (slug: string) => defaultInstance!.getCategoryBySlug(slug);
export const getTagBySlug = (slug: string) => defaultInstance!.getTagBySlug(slug);
export const getPreview = (id: string, idType: string) => defaultInstance!.getPreview(id, idType);
export const search = (query: string) => defaultInstance!.search(query);
export const createComment = (input: {
  postId: string;
  author: string;
  content: string;
  email: string;
}) => defaultInstance!.createComment(input);

// Export the class as default
export default HeadlessWP; 