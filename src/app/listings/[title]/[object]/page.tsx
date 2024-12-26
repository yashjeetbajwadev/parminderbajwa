import { PropertyPage } from "@/app/listings/(components)/PropertyPage";
import { getCollectionData, getCollectionDataWithId } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import { ListingPageConfig } from "../../settings";

export async function generateStaticParams() {
  const listings = await getCollectionData(ListingPageConfig("1", { perPage: 100 }));
  return listings.items.map((listing) => ({
    params: { object: listing.id, },
  }));
}

export default async function page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ object: string }>;
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
