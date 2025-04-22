import { Post } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
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
  }
`;

export default async function getCategoryBySlug(
  client: ReturnType<typeof createClient>,
  slug: string
): Promise<Post[]> {
  const response = await client.fetchGraphQL<{ category: { posts: { nodes: Post[] } } }>(query, { slug });
  if (!response.data?.category?.posts?.nodes) {
    throw new Error(`Category with slug "${slug}" not found`);
  }
  return response.data.category.posts.nodes;
}
