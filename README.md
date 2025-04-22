# HeadlessWP SDK

A TypeScript SDK for interacting with Headless WordPress sites using GraphQL and REST APIs.

## Installation

```bash
npm install headlesswp-sdk
```

## Usage

```typescript
import HeadlessWPSDK from 'headlesswp-sdk';

// Initialize the SDK
const wp = new HeadlessWPSDK({
  graphqlUrl: 'https://your-wordpress-site.com/graphql',
  restApiUrl: 'https://your-wordpress-site.com/wp-json',
  authToken: 'your-auth-token', // Optional
  revalidate: 3600, // Optional, default is 1 hour
});

// Fetch a post by slug
const post = await wp.getPostBySlug('hello-world');

// Fetch all posts
const posts = await wp.getAllPosts();

// Fetch a page by slug
const page = await wp.getPageBySlug('about');

// Fetch all pages
const pages = await wp.getAllPages();

// Fetch a menu by slug
const menu = await wp.getMenuBySlug('primary');

// Search content
const results = await wp.search('search term');

// Create a comment
const comment = await wp.createComment({
  postId: '123',
  author: 'John Doe',
  content: 'Great post!',
  email: 'john@example.com'
});
```

## Features

- TypeScript support
- GraphQL queries for posts, pages, menus, and more
- REST API search functionality
- Comment creation
- Preview mode support
- Configurable caching

## API Reference

### Configuration

```typescript
interface HeadlessWPConfig {
  graphqlUrl: string;
  restApiUrl?: string;
  authToken?: string;
  revalidate?: number;
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
}
```

### Methods

- `getPostBySlug(slug: string)`
- `getPageBySlug(slug: string)`
- `getAllPosts()`
- `getAllPages()`
- `getMenuBySlug(slug: string)`
- `getCategoryBySlug(slug: string)`
- `getTagBySlug(slug: string)`
- `getPreview(id: string, idType: string)`
- `createComment(input: CreateCommentInput)`
- `search(query: string)`

## License

MIT 