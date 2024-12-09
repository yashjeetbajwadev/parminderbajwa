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
    <div className="container px-5 py-8 mx-auto xl:px-0 max-w-7xl">
      <div className="grid grid-cols-2 gap-6">
        {data.items.map((post: BlogsResponse) => (
          <Card
            key={post.id}
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2 leading-relaxed">
                {post.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                By {post.author}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <div
                className="prose line-clamp-3 max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created), {
                  addSuffix: true,
                })}
              </p>
              <a
                href={formatSinglePage("blogs", post.id, post.title)}
                className="text-primary hover:underline"
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
