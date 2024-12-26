import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import React from "react";
import { BlogList } from "./(components)/BlogList";
import { BlogsListConfig } from "./settings";

export default async function page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];
  const resolvedSearchParams = await searchParams;
  const pageNumber = resolvedSearchParams?.page ?? "1";

  const blogs: ListResult<BlogsResponse> = await getCollectionData(BlogsListConfig(pageNumber));
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <BlogList data={blogs} />
    </React.Fragment>
  );
}