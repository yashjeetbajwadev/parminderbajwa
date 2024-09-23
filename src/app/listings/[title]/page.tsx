import { PropertyPage } from "@/app/listings/(components)/PropertyPage";
import { getCollectionDataWithId, getSearchParams } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { serverSearchParamType } from "@/types/types";
import { redirect } from "next/navigation";

async function Page({ searchParams }: { searchParams: serverSearchParamType; }) {
  const id = getSearchParams(searchParams, "object");
  if (!id) {
    redirect('/listings');
  }
  const listings: ListingsResponse = await getCollectionDataWithId({
    collectionName: "listings", id: id, options: {
      fields:
        "id,created,updated,type,title,address,city,state,zip,price,auctionDate,priceByNegotiation,bedroom,bathroom,parking,squareFt,lotSize,yearBuilt,amenities,images,agent,listingDate,status"
    }
  },);
  return (
    <PropertyPage data={listings} />
  );
}

export default Page;
