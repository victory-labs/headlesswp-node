import { Client } from '../common/Client';
import { Page, ListOptions, ListResponse } from '../common/types';

export class Pages extends Client {
  constructor(config: HeadlessWPConfig) {
    super(config);
  }

  async list(options: ListOptions = {}): Promise<ListResponse<Page>> {
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

  async get(id: number): Promise<Page> {
    return this.get<Page>(`/wp-json/wp/v2/pages/${id}`);
  }

  async create(data: Partial<Page>): Promise<Page> {
    return this.post<Page>('/wp-json/wp/v2/pages', data);
  }

  async update(id: number, data: Partial<Page>): Promise<Page> {
    return this.put<Page>(`/wp-json/wp/v2/pages/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await this.delete<void>(`/wp-json/wp/v2/pages/${id}`);
  }
} 