import { HeadlessWPConfig } from './common/types';
import { Posts } from './posts/Posts';
import { Pages } from './pages/Pages';

export class HeadlessWP {
  public posts: Posts;
  public pages: Pages;

  constructor(config: HeadlessWPConfig) {
    this.posts = new Posts(config);
    this.pages = new Pages(config);
  }
}

export * from './common/types';
export * from './posts/Posts';
export * from './pages/Pages'; 