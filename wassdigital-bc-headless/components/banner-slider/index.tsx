import Image from 'next/image';
import { Slideshow } from '~/components/ui/slideshow';

import { contentfulClient, contentfulGraphql } from '~/lib/contentful/client';
const GetBlogPostsQuery = contentfulGraphql(`
  query {
  homepageBannerCollection{
    items{
      sys{
        id
      }
      banner{
        url
        description
      }
      mobileBanner{
          url
          description
      }
      headline
    }
  }
}
`);
const { data } = await contentfulClient.query(GetBlogPostsQuery, {});
const slides = data?.homepageBannerCollection?.items.map(post => ({
  image: {
    src: post?.banner?.url || '/placeholder.png', // Fallback URL for image
    altText: post?.banner?.description || 'No description',
    blurDataUrl:
        'data:image/jpeg;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAAoAAAADoAQAAQAAAAcAAAAAAAAA/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgABwAKAwERAAIRAQMRAf/EABUAAQEAAAAAAAAAAAAAAAAAAAMJ/8QAIBAAAQQBBAMAAAAAAAAAAAAAAQIDBAURABIhMQYjgf/EABYBAQEBAAAAAAAAAAAAAAAAAAEAAv/EABkRAAIDAQAAAAAAAAAAAAAAAAARAQIhQf/aAAwDAQACEQMRAD8AoZ5EzayKWW3Syo0GyKPTJlsF9ts9klsKTu46GQOfms2awJfAKywmt1sRNgqK7PS0gSHI4WltTmBuKQckJJzgE9aYa0tP/9k=',
  },
  key: post.sys.id, // Unique identifier for each slide
  title: '',        // Optional: add a title if needed
}));
export const BannerSlides = () => <Slideshow slides={slides} />;
