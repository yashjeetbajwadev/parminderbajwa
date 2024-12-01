'use client';
import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { formatSinglePage, validDate } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { format } from "date-fns";
import React from "react";

export function BlogPost({ data }: { data: BlogsResponse }) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    { href: `/${formatSinglePage("blogs", data.id, data.title)}`, label: data.title },
  ];
  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <article className="container w-full max-w-7xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <div className="text-sm text-gray-500">
            <span>By {data.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={data.created}>
              {format(new Date(data.created), "MMMM d, yyyy")}
            </time>
          </div>
        </header>
        <div className="prose max-w-none">
          {data.body?.split("\n").map((paragraph, index) => (
            <div key={index} className="mb-4 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
        <footer className="mt-8 text-sm text-gray-500">
          {data.updated && validDate(data.updated) && (
            <p>
              Last updated:{" "}
              {format(new Date(data.updated), "MMMM d, yyyy HH:mm:ss")}
            </p>
          )}
        </footer>
      </article>
    </React.Fragment>

  );
}
