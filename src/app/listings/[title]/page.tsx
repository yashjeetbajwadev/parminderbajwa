import { PropertyPage } from "@/app/listings/(components)/PropertyPage";
import { getCollectionData, getCollectionDataWithId, getSearchParams } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { serverSearchParamType } from "@/types/types";
import { redirect } from "next/navigation";
import { ListResult } from "pocketbase";

async function Page({ searchParams }: { searchParams: serverSearchParamType; }) {
  const id = getSearchParams(searchParams, "object");
  if (!id) {
    redirect('/listings');
  }
  const listing: ListingsResponse = await getCollectionDataWithId({
    collectionName: "listings",
    id: id,
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
      filter: `status='active' && id!='${id}'`
    }
  });

  return (
    <PropertyPage data={listing} listingList={listingsList} />
  );
}

export default Page;
