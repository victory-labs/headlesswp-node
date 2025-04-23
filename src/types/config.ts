export interface HeadlessWPConfig {
    graphqlUrl: string;
    apiKey?: string | undefined;
    revalidate?: number;
    siteName?: string;
    siteDescription?: string;
    siteUrl?: string;
} 