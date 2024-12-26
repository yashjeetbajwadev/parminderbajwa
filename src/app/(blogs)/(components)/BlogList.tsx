"use client";

import { LinkButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PagenationButton } from "@/components/ui/pagenationButton";
import { formatSinglePage } from "@/lib/utils";
import { BlogsResponse } from "@/types/pocketbase";
import { formatDistanceToNow } from "date-fns";
import { ListResult } from "pocketbase";

export function BlogList({ data }: Readonly<{ data: ListResult<BlogsResponse> }>) {

  return (
    <div className="container px-4 py-6 mx-auto xl:px-0 max-w-7xl sm:px-6 sm:py-8">
      <PagenationButton currentItems={data.items.length}
        maxItems={data.totalItems}
        title="Blogs"
        currentPage={data?.page}
        totalPages={data.totalPages}
        path="/blogs" />
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
              <LinkButton href={formatSinglePage("blogs", post.id, post.title)} buttonevent="Click Read More Blog" className="justify-end" linkclassname="w-auto">
                <span className="text-sm">Read more</span>
              </LinkButton>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
