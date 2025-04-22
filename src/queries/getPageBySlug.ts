import { Page } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: SLUG) {
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

export default async function getPageBySlug(
  client: ReturnType<typeof createClient>,
  slug: string
): Promise<Page> {
  const response = await client.fetchGraphQL<{ page: Page }>(query, { slug });
  if (!response.data?.page) {
    throw new Error(`Page with slug "${slug}" not found`);
  }
  return response.data.page;
}
