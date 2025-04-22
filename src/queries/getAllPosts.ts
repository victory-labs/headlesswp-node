import { Post } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export default async function getAllPosts(
  client: ReturnType<typeof createClient>
): Promise<Post[]> {
  const response = await client.fetchGraphQL<{ posts: { nodes: Post[] } }>(query);
  if (!response.data?.posts?.nodes) {
    throw new Error('Failed to fetch posts');
  }
  return response.data.posts.nodes;
}
