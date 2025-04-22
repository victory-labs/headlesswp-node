import { SearchResults } from '../types/common';
import { createClient } from '../client';

const SEARCH_QUERY = `
  query SearchQuery($search: String!) {
    contentNodes(where: { search: $search }) {
      nodes {
        ... on Post {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
        ... on Page {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export default async function searchQuery(
  client: ReturnType<typeof createClient>,
  query: string
): Promise<SearchResults[]> {
  try {
    const response = await client.fetchGraphQL(SEARCH_QUERY, {
      search: query.trim(),
    });

    if (!response.data?.contentNodes?.nodes) {
      throw new Error('No results found');
    }

    return response.data.contentNodes.nodes.map((node: any) => ({
      id: node.id,
      title: node.title,
      slug: node.slug,
      excerpt: node.excerpt,
      date: node.date,
      featuredImage: node.featuredImage?.node?.sourceUrl,
      type: node.__typename.toLowerCase(),
    }));
  } catch (error) {
    console.error('Error searching content:', error);
    throw error;
  }
} 