import { Post } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
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
`;

export default async function getPostBySlug(
  client: ReturnType<typeof createClient>,
  slug: string
): Promise<Post> {
  const response = await client.fetchGraphQL<{ post: Post }>(query, { slug });
  if (!response.data?.post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  return response.data.post;
}
