import { HeadlessWPConfig } from './types/config';
import { GraphQLResponse } from './types/common';

export function createClient(config: HeadlessWPConfig) {
  const defaultConfig = {
    revalidate: 3600, // 1 hour
    siteName: 'Headless WordPress',
    siteDescription: 'Headless WordPress Site',
    siteUrl: 'https://example.com',
  };

  if (!config.graphqlUrl) {
    throw new Error('GraphQL URL is required');
  }

  const mergedConfig = { 
    ...defaultConfig, 
    ...config,
    graphqlUrl: config.graphqlUrl,
  } as const;

  async function fetchGraphQL<T = any>(
    query: string,
    variables?: { [key: string]: any },
    preview = false
  ): Promise<GraphQLResponse<T>> {
    try {
      // Prepare headers
      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
      };

      // If preview mode is enabled and we have a token
      if (preview && mergedConfig.authToken) {
        headers['Authorization'] = `Bearer ${mergedConfig.authToken}`;
      }

      // Get the slug for cache tagging
      const slug = variables?.slug || variables?.id || 'graphql';

      // First try POST method
      let response = await fetch(mergedConfig.graphqlUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      // If POST fails with Method Not Allowed, try GET
      if (response.status === 405) {
        const queryParams = new URLSearchParams({
          query,
          variables: JSON.stringify(variables || {}),
        });
        
        response = await fetch(`${mergedConfig.graphqlUrl}?${queryParams}`, {
          method: 'GET',
          headers,
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
      }

      return data;
    } catch (error) {
      console.error('GraphQL request error:', error);
      throw error;
    }
  }

  return {
    fetchGraphQL,
    config: mergedConfig,
  };
} 