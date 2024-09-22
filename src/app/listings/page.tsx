"use client";
import { DataFetcher } from "@/components/DataFetcher";
import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb";
import { ListingsList } from "./(components)/ListingsList";

function page() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Properties" },
  ];
  return (
    <DataFetcher collectionName={"listings"}>
      <BackButtonBreadcrumb
        items={BreadcrumbItems}
      />
      <ListingsList />
    </DataFetcher>
  );
}

export default page;
