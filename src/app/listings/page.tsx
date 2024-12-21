import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
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

  const [activeListings, soldListings] = await Promise.all([
    getCollectionData({
      collectionName: "listings",
      options: { filter: "status='active'", page: Number(searchParams?.page ?? 1) },
    }),
    getCollectionData({
      collectionName: "listings",
      options: { filter: "status='sold'", page: Number(searchParams?.soldPage ?? 1) },
    }),
  ]);

  let defaultTab = "active";
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
