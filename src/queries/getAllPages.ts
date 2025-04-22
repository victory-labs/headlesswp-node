import { Page } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetAllPages {
    pages(first: 100) {
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

export default async function getAllPages(
  client: ReturnType<typeof createClient>
): Promise<Page[]> {
  const response = await client.fetchGraphQL<{ pages: { nodes: Page[] } }>(query);
  if (!response.data?.pages?.nodes) {
    throw new Error('Failed to fetch pages');
  }
  return response.data.pages.nodes;
}
