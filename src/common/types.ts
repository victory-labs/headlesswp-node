export interface HeadlessWPConfig {
  baseUrl: string;
  apiKey: string;
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, any>;
  categories: number[];
  tags: number[];
}

export interface Page extends Post {
  parent: number;
  menu_order: number;
}

export interface ListOptions {
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  before?: string;
  author?: number;
  author_exclude?: number[];
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'id' | 'include' | 'relevance' | 'slug' | 'title';
  slug?: string;
  status?: string;
  categories?: number[];
  categories_exclude?: number[];
  tags?: number[];
  tags_exclude?: number[];
  sticky?: boolean;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
} 