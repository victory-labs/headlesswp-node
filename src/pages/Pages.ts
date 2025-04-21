import { Client } from '../common/Client';
import {Page, ListOptions, ListResponse, HeadlessWPConfig} from '../common/types';

export class Pages extends Client {
  constructor(config: HeadlessWPConfig) {
    super(config);
  }

  async list(options: ListOptions = {}): Promise<{ data: Page; total: number; totalPages: number; currentPage: number }> {
    // @ts-ignore
    const response = await this.get<Page[]>('/wp-json/wp/v2/pages', options);
    const total = parseInt(this.client.defaults.headers['x-wp-total'] as string, 10);
    const totalPages = parseInt(this.client.defaults.headers['x-wp-totalpages'] as string, 10);
    
    return {
      data: response,
      total,
      totalPages,
      currentPage: options.page || 1,
    };
  }

  // @ts-ignore
  async get(id: number): Promise<Page> {
    // @ts-ignore
    return this.get<Page>(`/wp-json/wp/v2/pages/${id}`);
  }

  async create(data: Partial<Page>): Promise<Page> {
    return this.post<Page>('/wp-json/wp/v2/pages', data);
  }

  async update(id: number, data: Partial<Page>): Promise<Page> {
    return this.put<Page>(`/wp-json/wp/v2/pages/${id}`, data);
  }

  // @ts-ignore
  async delete(id: number): Promise<void> {
    // @ts-ignore
    await this.delete<void>(`/wp-json/wp/v2/pages/${id}`);
  }
} 