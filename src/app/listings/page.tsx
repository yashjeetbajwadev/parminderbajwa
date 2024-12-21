import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import React from "react";
import { ListingsTabList } from "./(components)/ListingsTab";

export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}>) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Properties" },
  ];
  const listings: ListResult<ListingsResponse> = await getCollectionData({
    collectionName: "listings",
    options: { filter: "" },
  });
  let defaultTab = "active";
  let activeListings: ListResult<ListingsResponse> = { ...listings };
  activeListings.items = listings.items.filter((d) => d.status == 'active');
  activeListings.totalItems = activeListings.items.length;
  let soldListings: ListResult<ListingsResponse> = { ...listings };
  soldListings.items = listings.items.filter((d) => d.status == 'sold');
  soldListings.totalItems = soldListings.items.length;
  if (searchParams?.tab === "active") {
    defaultTab = "sold";
  }

  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      < ListingsTabList activeListings={activeListings} soldListings={soldListings} tab={defaultTab} />
    </React.Fragment>
  );
}
