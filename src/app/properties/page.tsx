"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import { ListingsPage as ExampleListing } from "./(components)/ListingsPage";
import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb";

function page() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
  ];
  return (
    <DataFetcher collectionName="listings">
      <BackButtonBreadcrumb
        items={BreadcrumbItems}
      />
      <ExampleListing />
    </DataFetcher>
  );
}

export default page;
