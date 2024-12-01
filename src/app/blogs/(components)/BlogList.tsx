'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatSinglePage } from '@/lib/utils'
import { BlogsResponse } from '@/types/pocketbase'
import { formatDistanceToNow } from 'date-fns'
import { ListResult } from 'pocketbase'

export function BlogList({ data }: { data: ListResult<BlogsResponse> }) {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6 grid-cols-2">
        {data.items.map((post: BlogsResponse) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2">By {post.author}</p>
              <div className="line-clamp-3 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
              </p>
              <a
                href={formatSinglePage("blogs", post.id, post.title)}
                className="text-primary hover:underline">
                Read more
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}