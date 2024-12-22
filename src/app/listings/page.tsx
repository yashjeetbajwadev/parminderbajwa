import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
import React from "react";
import { ListingsTabList } from "./(components)/ListingsTab";

export default async function page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Properties" },
  ];
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams?.page ?? "1";
  const soldPage = resolvedSearchParams?.soldPage ?? "1";
  const tab = resolvedSearchParams?.tab ?? "active";
  const [activeListings, soldListings] = await Promise.all([
    getCollectionData({
      collectionName: "listings",
      options: { filter: "status='active'", page: Number(page ?? 1) },
    }),
    getCollectionData({
      collectionName: "listings",
      options: { filter: "status='sold'", page: Number(soldPage ?? 1) },
    }),
  ]);

  let defaultTab = "active";
  if (tab === "sold") {
    defaultTab = "sold";
  }

  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      < ListingsTabList activeListings={activeListings} soldListings={soldListings} tab={defaultTab} />
    </React.Fragment>
  );
}
