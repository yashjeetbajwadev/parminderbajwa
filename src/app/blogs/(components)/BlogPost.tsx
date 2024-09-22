import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb";
import { useSingleData } from "@/components/DataFetcher";
import { formatSinglePage } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { format } from "date-fns";
import React from "react";

export function BlogPost() {
  const post = useSingleData() as BlogsResponse;
  if (!post) {
    return null;
  }
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: `/${formatSinglePage("blogs", post.id, post.title)}`, label: post.title },
  ];
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <article className="container w-4/5 mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-sm text-gray-500">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.created}>
              {format(new Date(post.created), "MMMM d, yyyy")}
            </time>
          </div>
        </header>
        <div className="prose max-w-none">
          {post.body?.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <footer className="mt-8 text-sm text-gray-500">
          <p>
            Last updated:{" "}
            {format(new Date(post.updated), "MMMM d, yyyy HH:mm:ss")}
          </p>
        </footer>
      </article>
    </React.Fragment>

  );
}
