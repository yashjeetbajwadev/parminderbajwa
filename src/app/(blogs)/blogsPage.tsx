import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { getCollectionData } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import React from "react";
import { BlogList } from "./(components)/BlogList";
import { BlogsListConfig } from "./settings";

export async function BlogsPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ slug: string, pageno: string }>;
  searchParams?: Promise<{ [key: string]: string }>;
}>) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];
  const { pageno } = await params;

  const blogs: ListResult<BlogsResponse> = await getCollectionData(BlogsListConfig(pageno));
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <BlogList data={blogs} />
    </React.Fragment>
  );
}