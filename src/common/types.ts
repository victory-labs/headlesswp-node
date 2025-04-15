/**
 * Represents a WordPress post with its core properties
 */
export interface HeadlessWPPost {
    /** The unique identifier of the post */
    id: number;
    /** The date the post was published in ISO 8601 format */
    date: string;
    /** The post title */
    title: {
        /** The rendered HTML content of the title */
        rendered: string;
    };
    /** The post content */
    content: {
        /** The rendered HTML content of the post */
        rendered: string;
    };
    /** The post excerpt */
    excerpt: {
        /** The rendered HTML content of the excerpt */
        rendered: string;
    };
    /** Embedded media associated with the post */
    _embedded?: {
        /** Featured media (images) associated with the post */
        'wp:featuredmedia'?: Array<{
            /** URL of the media file */
            source_url: string;
        }>;
    };
} 