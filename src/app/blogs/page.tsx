import { BlogList } from "./(components)/BlogList";
import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import React from "react";
import { BlogsResponse } from "@/types/pocketbase";
import { getCollectionData } from "@/lib/utils";
import { ListResult } from "pocketbase";

async function page() {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
  ];
  const blogs: ListResult<BlogsResponse> = await getCollectionData({
    collectionName: "blogs", options: {
      fields: "id,title,description,created,updated,author,images,body:excerpt(135,true)",
      filter: "active=true"
    }
  });
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <BlogList data={blogs} />
    </React.Fragment>
  );
}

export default page;