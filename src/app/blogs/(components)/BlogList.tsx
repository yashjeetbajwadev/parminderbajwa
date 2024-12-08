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
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="mb-2 text-sm text-muted-foreground">
                By {post.author}
              </p>
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
