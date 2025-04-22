import { createClient } from '../client';

interface CreateCommentInput {
  postId: string;
  author: string;
  content: string;
  email: string;
}

const mutation = `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      comment {
        databaseId
        content
        date
        status
        author {
          node {
            avatar {
              url
            }
            email
            name
            url
          }
        }
      }
    }
  }
`;

export default async function createComment(
  client: ReturnType<typeof createClient>,
  input: CreateCommentInput
) {
  const response = await client.fetchGraphQL(mutation, { input });
  if (!response.data?.createComment?.success) {
    throw new Error('Failed to create comment');
  }
  return response.data.createComment.comment;
}
