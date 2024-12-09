"use client";

import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { formatSinglePage, validDate } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";

export function BlogPost({ data }: { data: BlogsResponse }) {
  const BreadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/blogs", label: "Blogs" },
    {
      href: `/${formatSinglePage("blogs", data.id, data.title)}`,
      label: data.title,
    },
  ];

  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems} />
      <Card className="container w-full max-w-4xl mx-auto my-8 shadow-lg">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {data.title}
            </h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>{data.author}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <time dateTime={data.created}>
                {format(new Date(data.created), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              <span>
                {Math.ceil(data.body.split(" ").length / 200)} min read
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {data.body
              ?.split("\n")
              .map((paragraph, index) => (
                <div
                  key={index}
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="text-sm text-muted-foreground">
          {data.updated && validDate(data.updated) && (
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <p>
                Last updated:{" "}
                {format(new Date(data.updated), "MMMM d, yyyy HH:mm:ss")}
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </React.Fragment>
  );
}
