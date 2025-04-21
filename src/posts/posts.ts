import { Client } from '../common/Client';
import { HeadlessWPConfig, Post, ListOptions, ListResponse } from '../common/types';

export class Posts extends Client {
  constructor(config: HeadlessWPConfig) {
    super(config);
  }

  async list(options?: ListOptions): Promise<ListResponse<Post>> {
    const response = await this.get<Post[]>('/wp/v2/posts', options);
    const total = parseInt(this.client.defaults.headers['x-wp-total'] as string, 10);
    const totalPages = parseInt(this.client.defaults.headers['x-wp-totalpages'] as string, 10);
    
    return {
      data: response,
      total,
      totalPages,
      currentPage: options?.page || 1,
    };
  }

  async getById(id: number): Promise<Post> {
    return this.get<Post>(`/wp/v2/posts/${id}`);
  }

  async create(data: Partial<Post>): Promise<Post> {
    return this.post<Post>('/wp/v2/posts', data);
  }

  async update(id: number, data: Partial<Post>): Promise<Post> {
    return this.put<Post>(`/wp/v2/posts/${id}`, data);
  }

  async deleteById(id: number): Promise<void> {
    return this.delete<void>(`/wp/v2/posts/${id}`);
  }
} 