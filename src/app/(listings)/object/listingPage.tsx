import { getCollectionData, getCollectionDataWithId } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import { PropertyPage } from "../(components)/PropertyPage";

export default async function PropertyPagePage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string, title: string, object: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const { object } = await params;

  const listing: ListingsResponse = await getCollectionDataWithId({
    collectionName: "listings",
    id: object,
    options: {
      sort: '-featuredOnHomePage,-created,@random',
      filter: "status='active'",
    }
  },);
  const listingsList: ListResult<ListingsResponse> = await getCollectionData({
    collectionName: "listings", options: { perPage: 5, sort: '-featuredOnHomePage,-created,@random', filter: `status='active' && id!='${object}'` }
  });

  return (<PropertyPage data={listing} listingList={listingsList} />
  );
}
