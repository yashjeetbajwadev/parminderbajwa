"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatSinglePage } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { formatDistanceToNow } from "date-fns";
import { ListResult } from "pocketbase";

export function BlogList({ data }: { data: ListResult<BlogsResponse> }) {
  return (
    <div className="container px-4 py-6 mx-auto xl:px-0 max-w-7xl sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data.items.map((post: BlogsResponse) => (
          <Card
            key={post.id}
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl line-clamp-2 leading-tight sm:leading-relaxed">
                {post.title}
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                By {post.author}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <div
                className="prose text-sm sm:text-base line-clamp-3 max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created), {
                  addSuffix: true,
                })}
              </p>
              <a
                href={formatSinglePage("blogs", post.id, post.title)}
                className="text-primary text-sm sm:text-base hover:underline"
              >
                Read more
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
