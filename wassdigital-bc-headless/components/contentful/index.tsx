import { contentfulClient, contentfulGraphql } from '~/lib/contentful/client';
import Image from 'next/image'; // Assuming you're using Next.js for Image component

export const HomePagePosts = async () => {
  // Define the GraphQL query
  const GetBlogPostsQuery = contentfulGraphql(`
    query {
      pageBlogPostCollection(limit: 4) {
        items {
          sys {
            id
          }
          title
          shortDescription
          featuredImage {
            url
            description
          }
        }
      }
    }
  `);

  // Fetch data from Contentful
  const { data } = await contentfulClient.query(GetBlogPostsQuery, {});

  // Return JSX
  return (<>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black lg:text-4xl">Contentful Post</h2>
      </div>
      <div className="grid grid-cols-4 gap-4 p-10">
        {data?.pageBlogPostCollection?.items.map((post) => (
          <div key={post?.sys.id}>
            <img
              alt={post?.featuredImage?.description || 'No description'}
              src={post?.featuredImage?.url || '/placeholder.png'}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-center">{post?.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};