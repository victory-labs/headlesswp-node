# Headless WordPress TypeScript SDK

A TypeScript SDK for interacting with Headless WordPress installations via GraphQL. This SDK provides a simple and type-safe way to interact with your WordPress backend from your frontend applications.

## Installation

```bash
npm install headlesswp
# or
yarn add headlesswp
```

## Configuration

First, you'll need to configure the SDK with your WordPress GraphQL endpoint and optional settings:

```typescript
import { HeadlessWP } from 'headlesswp';

const config = {
  graphqlUrl: 'https://your-wordpress-site.com/graphql',
  authToken: 'your-api-key',
  revalidate: 3600, // Optional: cache revalidation time in seconds
  siteName: 'Your Site Name', // Optional
  siteDescription: 'Your Site Description', // Optional
  siteUrl: 'https://your-site.com', // Optional
};

const wp = new HeadlessWP(config);
```

## Usage Examples

### Fetching Posts

```typescript
// Get a single post by slug
const post = await wp.getPostBySlug('hello-world');

// Get all posts
const posts = await wp.getAllPosts();
```

### Fetching Pages

```typescript
// Get a single page by slug
const page = await wp.getPageBySlug('about');

// Get all pages
const pages = await wp.getAllPages();
```

### Working with Menus

```typescript
// Get a menu by slug
const menu = await wp.getMenuBySlug('primary-menu');
```

### Categories and Tags

```typescript
// Get a category by slug
const category = await wp.getCategoryBySlug('news');

// Get a tag by slug
const tag = await wp.getTagBySlug('featured');
```

### Preview Mode

```typescript
// Get a preview of a post or page
const preview = await wp.getPreview('123', 'DATABASE_ID');
```

### Comments

```typescript
// Create a new comment
const comment = await wp.createComment({
  postId: '123',
  author: 'John Doe',
  content: 'Great post!',
  authorEmail: 'john@example.com',
});
```

### Search

```typescript
// Search across posts and pages
const results = await wp.search('search term');
```

## Error Handling

The SDK includes built-in error handling for GraphQL requests. If a request fails, it will throw an error with detailed information about what went wrong.

```typescript
try {
  const post = await wp.getPostBySlug('non-existent-post');
} catch (error) {
  console.error('Error fetching post:', error);
}
```

## Type Safety

The SDK is built with TypeScript and includes type definitions for all operations. This provides excellent IDE support and compile-time type checking.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 