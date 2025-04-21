# HeadlessWP SDK

A TypeScript SDK for interacting with the HeadlessWP WordPress plugin.

## Installation

```bash
npm install headlesswp
```

## Usage

```typescript
import { HeadlessWP } from 'headlesswp';

// Initialize the SDK
const client = new HeadlessWP({
  baseUrl: 'https://your-wordpress-site.com',
  apiKey: 'your-api-key'
});

// List posts
const posts = await client.posts.list({
  per_page: 10,
  page: 1
});

// Get a single post
const post = await client.posts.get(1);

// Create a new post
const newPost = await client.posts.create({
  title: 'New Post',
  content: 'Post content',
  status: 'publish'
});

// Update a post
const updatedPost = await client.posts.update(1, {
  title: 'Updated Title'
});

// Delete a post
await client.posts.delete(1);

// List pages
const pages = await client.pages.list({
  per_page: 10,
  page: 1
});

// Get a single page
const page = await client.pages.get(1);

// Create a new page
const newPage = await client.pages.create({
  title: 'New Page',
  content: 'Page content',
  status: 'publish'
});

// Update a page
const updatedPage = await client.pages.update(1, {
  title: 'Updated Title'
});

// Delete a page
await client.pages.delete(1);
```

## API Reference

### Posts

#### `list(options?: ListOptions): Promise<ListResponse<Post>>`
List all posts with optional filtering and pagination.

#### `get(id: number): Promise<Post>`
Get a single post by ID.

#### `create(data: Partial<Post>): Promise<Post>`
Create a new post.

#### `update(id: number, data: Partial<Post>): Promise<Post>`
Update an existing post.

#### `delete(id: number): Promise<void>`
Delete a post.

### Pages

#### `list(options?: ListOptions): Promise<ListResponse<Page>>`
List all pages with optional filtering and pagination.

#### `get(id: number): Promise<Page>`
Get a single page by ID.

#### `create(data: Partial<Page>): Promise<Page>`
Create a new page.

#### `update(id: number, data: Partial<Page>): Promise<Page>`
Update an existing page.

#### `delete(id: number): Promise<void>`
Delete a page.

## Types

### HeadlessWPConfig
```typescript
interface HeadlessWPConfig {
  baseUrl: string;
  apiKey: string;
}
```

### ListOptions
```typescript
interface ListOptions {
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
```

### ListResponse
```typescript
interface ListResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
```

## Error Handling

The SDK throws errors when API requests fail. Errors include:
- HTTP errors (4xx, 5xx)
- Network errors
- Validation errors

Example error handling:
```typescript
try {
  const post = await client.posts.get(1);
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 