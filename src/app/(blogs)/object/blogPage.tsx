import { BlogPost } from "@/app/(blogs)/(components)/BlogPost";
import { CommonAPIPropsWithId, getCollectionDataWithId } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";

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

export default async function BlogPage({
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
