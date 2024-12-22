import { BlogList } from "./(components)/BlogList";
import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import React from "react";
import { BlogsResponse } from "@/types/pocketbase";
import { getCollectionData } from "@/lib/utils";
import { ListResult } from "pocketbase";

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
  const page = resolvedSearchParams?.page ?? "1";

  const blogs: ListResult<BlogsResponse> = await getCollectionData({
    collectionName: "blogs", options: {
      fields: "id,title,description,created,updated,author,images,body:excerpt(135,true)",
      filter: "active=true",
      page: Number(page ?? 1),
    }
  });
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <BlogList data={blogs} />
    </React.Fragment>
  );
}