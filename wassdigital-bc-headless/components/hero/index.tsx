import Image from 'next/image';

import { Button } from '~/components/ui/button';
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
      headline
    }
  }
}
`);

const { data } = await contentfulClient.query(GetBlogPostsQuery, {});

const slides = data?.homepageBannerCollection?.items.map((post:any) => (
  <div className="slide" key={post?.sys.id}>
  <img
    src={post?.banner?.url || '/placeholder.png'}
    alt={post?.headline || 'Placeholder Text'}
    className="w-full h-screen"
  />
</div>
));
export const Hero = () => {
  return slides
}

