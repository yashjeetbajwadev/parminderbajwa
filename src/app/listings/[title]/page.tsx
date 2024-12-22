import { PropertyPage } from "@/app/listings/(components)/PropertyPage";
import { getCollectionData, getCollectionDataWithId } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { redirect } from "next/navigation";
import { ListResult } from "pocketbase";

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
    redirect('/listings');
  }
  const listing: ListingsResponse = await getCollectionDataWithId({
    collectionName: "listings",
    id: object,
    options: {
      sort: '-featuredOnHomePage,-created,@random',
      filter: "status='active'",
      expand: "agent",
    }
  },);
  const listingsList: ListResult<ListingsResponse> = await getCollectionData({
    collectionName: "listings",
    options: {
      expand: ['agent'],
      perPage: 5,
      sort: '-featuredOnHomePage,-created,@random',
      filter: `status='active' && id!='${object}'`
    }
  });

  return (
    <PropertyPage data={listing} listingList={listingsList} />
  );
}
