import { HeadlessWPConfig } from './types/config';
import { createClient } from './client';
import * as queries from './queries';
import * as mutations from './mutations';

export class HeadlessWPSDK {
  private client: ReturnType<typeof createClient>;
  private config: HeadlessWPConfig;

  constructor(config: HeadlessWPConfig) {
    this.config = config;
    this.client = createClient(config);
  }

  // Queries
  getPostBySlug = (slug: string) => {
    return queries.getPostBySlug(this.client, slug);
  };

  getPageBySlug = (slug: string) => {
    return queries.getPageBySlug(this.client, slug);
  };

  getAllPosts = () => {
    return queries.getAllPosts(this.client);
  };

  getAllPages = () => {
    return queries.getAllPages(this.client);
  };

  getMenuBySlug = (slug: string) => {
    return queries.getMenuBySlug(this.client, slug);
  };

  getCategoryBySlug = (slug: string) => {
    return queries.getCategoryBySlug(this.client, slug);
  };

  getTagBySlug = (slug: string) => {
    return queries.getTagBySlug(this.client, slug);
  };

  getPreview = (id: string, idType: string) => {
    return queries.getPreview(this.client, id, idType);
  };

  // Mutations
  createComment = (input: any) => {
    return mutations.createComment(this.client, input);
  };

  // Search
  search = (query: string) => {
    return queries.searchQuery(this.client, query);
  };
}

export default HeadlessWPSDK; 