"use client";

import { Button } from "@/components/ui/button";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListResult } from "pocketbase";
import { useState } from "react";

export function BlogList({ data }: { data: ListResult<BlogsResponse> }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(data?.page);
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const setParams = () => {
    let newSearch = new URLSearchParams(searchParams)
    newSearch.set('page', currentPage.toString())
    let newUrl = new URL(pathname, window.location.origin);
    newUrl.search = newSearch.toString();
    router.push(newUrl.toString())
  }
  return (
    <div className="container px-4 py-6 mx-auto xl:px-0 max-w-7xl sm:px-6 sm:py-8">
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted-foreground md:text-base mr-4">
          Showing {data.items.length} of {data.totalItems} Blogs
        </p>
        <div className="flex gap-2">
          <Button
            buttonevent="Click Previous Blog Page"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => { setCurrentPage(currentPage - 1); setParams() }}
          >
            Previous
          </Button>
          <Button
            buttonevent="Click Next Blog Page"
            variant="outline"
            disabled={currentPage === data.totalPages}
            onClick={() => { setCurrentPage(currentPage + 1); setParams(); }}
          >
            Next
          </Button>
        </div>
      </div>
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
