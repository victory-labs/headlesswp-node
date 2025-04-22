import {Author, FeaturedImage} from './common';

export interface Page {
    id: string;
    title: string;
    slug: string;
    date: string;
    content: string;
    excerpt: string;
    featuredImage: {
        node: FeaturedImage;
    };
    author: {
        node: Author;
    };
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    content: string;
    excerpt: string;
    featuredImage: {
        node: FeaturedImage;
    };
    author: {
        node: Author;
    };
}

export interface Book {
    bookFields: {
        affiliateUrl: string;
        isbn: string;
    };
    databaseId: string;
    date: string;
    modified: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: FeaturedImage;
}

export interface Menu {
    menuItems: {
        edges: {
            node: {
                uri: string;
                label: string;
                databaseId: string;
            };
        }[];
    };
} 