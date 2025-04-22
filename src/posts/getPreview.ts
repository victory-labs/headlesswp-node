import { Post } from '../types/content';
import { createClient } from '../client';

const query = `
  query GetPreview($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
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

export default async function getPreview(
  client: ReturnType<typeof createClient>,
  id: string,
  idType: string
): Promise<Post> {
  const response = await client.fetchGraphQL<{ post: Post }>(query, { id, idType }, true);
  if (!response.data?.post) {
    throw new Error(`Preview with ID "${id}" not found`);
  }
  return response.data.post;
}
