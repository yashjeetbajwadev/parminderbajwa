import { BlogPost } from "@/app/blogs/(components)/BlogPost";
import { getCollectionDataWithId } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { redirect } from 'next/navigation';

export default async function page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const resolvedSearchParams = await searchParams;
  const object = resolvedSearchParams?.object;
  if (!object) {
    redirect('/blogs');
  }
  const blog: BlogsResponse = await getCollectionDataWithId({
    collectionName: "blogs", id: object, options: {
      fields: "id,created,updated,title,author,body",
      filter: "active=true"
    }
  });

  return (
    <BlogPost data={blog} />
  );
}
