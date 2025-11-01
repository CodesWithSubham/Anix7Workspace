export {};

import "next";

declare module "next" {
  interface Metadata {
    /**
     * Custom flag: Include this page in sitemap.xml generation.
     */
    addToSitemap?: boolean;
  }
}

