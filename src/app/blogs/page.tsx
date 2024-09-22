"use client";
import { DataFetcher } from "@/components/DataFetcher";
import { BlogList } from "./(components)/BlogList";
import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb";
import React from "react";

function page() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <DataFetcher collectionName={"blogs"}>
        <BlogList />
      </DataFetcher>
    </React.Fragment>
  );
}

export default page;