export interface HeadlessWPConfig {
  graphqlUrl: string;
  authToken?: string | undefined;
  revalidate?: number;
  siteName?: string;
  siteDescription?: string;
  siteUrl?: string;
} 