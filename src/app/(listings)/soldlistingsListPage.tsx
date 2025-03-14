import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
import React from "react";
import { ListingsTabList } from "./(components)/ListingsTab";
import { ListingPageConfig, SoldListingPageConfig } from "./settings";


export async function SoldListingsPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string, pageno: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/listings/1", label: "Properties" },
  ];
  const { pageno } = await params;
  const [soldListings, activeListings] = await Promise.all([
    getCollectionData(SoldListingPageConfig(pageno)),
    getCollectionData(ListingPageConfig(pageno, { fields: "id" })),
  ]);

  let defaultTab = "sold/1";


  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      < ListingsTabList activeListings={activeListings} soldListings={soldListings} tab={defaultTab} />
    </React.Fragment>
  );
}
