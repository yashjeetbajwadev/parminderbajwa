import { BlogPost } from "@/app/blogs/(components)/BlogPost";
import { getCollectionDataWithId, getSearchParams } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { serverSearchParamType } from "@/types/types";
import { redirect } from 'next/navigation';

async function Page({ searchParams }: { searchParams: serverSearchParamType; }) {
  const id = getSearchParams(searchParams, "object");
  if (!id) {
    redirect('/blogs');
  }
  const blog: BlogsResponse = await getCollectionDataWithId({ collectionName: "blogs", id: id });

  return (
    <BlogPost data={blog} />
  );
}

export default Page;
