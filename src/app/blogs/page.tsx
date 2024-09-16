"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import BlogList from "./(components)/BlogList";
import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb";

function page() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];
  return (
    <DataFetcher collectionName="listings">
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <BlogList />
    </DataFetcher>
  );
}

export default page;
