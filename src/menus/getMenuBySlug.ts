import { Menu } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetMenuBySlug($slug: ID!) {
    menu(id: $slug, idType: SLUG) {
      menuItems {
        edges {
          node {
            uri
            label
            databaseId
          }
        }
      }
    }
  }
`;

export default async function getMenuBySlug(
  client: ReturnType<typeof createClient>,
  slug: string
): Promise<Menu> {
  const response = await client.fetchGraphQL<{ menu: Menu }>(query, { slug });
  if (!response.data?.menu) {
    throw new Error(`Menu with slug "${slug}" not found`);
  }
  return response.data.menu;
}
