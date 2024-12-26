import { BlogPost } from "@/app/blogs/(components)/BlogPost";
import { CommonAPIPropsWithId, getCollectionData, getCollectionDataWithId } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { BlogsListConfig } from "../../settings";

const BlogsConfig = BlogsListConfig("1", { perPage: 100 });

export async function generateStaticParams() {
  const blogs = await getCollectionData(BlogsConfig);
  return blogs.items.map((blog) => ({
    params: { object: blog.title, },
  }));
}

function blogConfig(object: string): CommonAPIPropsWithId<'blogs'> {
  return {
    collectionName: "blogs",
    id: object,
    options: {
      fields: "id,created,updated,title,author,body",
      filter: "active=true",
    }
  } as CommonAPIPropsWithId<'blogs'>;
}

export default async function page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ object: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const { object } = await params;
  const blog: BlogsResponse = await getCollectionDataWithId(blogConfig(object));

  return (
    <BlogPost data={blog} />
  );
}
