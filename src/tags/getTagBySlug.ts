import { Post } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetTagBySlug($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
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

export default async function getTagBySlug(
  client: ReturnType<typeof createClient>,
  slug: string
): Promise<Post[]> {
  const response = await client.fetchGraphQL<{ tag: { posts: { nodes: Post[] } } }>(query, { slug });
  if (!response.data?.tag?.posts?.nodes) {
    throw new Error(`Tag with slug "${slug}" not found`);
  }
  return response.data.tag.posts.nodes;
}
