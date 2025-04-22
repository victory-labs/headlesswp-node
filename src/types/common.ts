export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export interface SearchResults {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
}

export interface FeaturedImage {
  sourceUrl: string;
}

export interface Author {
  name: string;
} 