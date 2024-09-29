import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import React from "react";
import { ListingsList } from "./(components)/ListingsList";

export async function Page() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Properties" },
  ];
  const listings: ListResult<ListingsResponse> = await getCollectionData({ collectionName: "listings", options: { filter: "status='active'" } });
  return (
    <React.Fragment>
      <BackButtonBreadcrumb
        items={BreadcrumbItems}
      />
      <ListingsList data={listings} />
    </React.Fragment>
  );
}
export default Page;
