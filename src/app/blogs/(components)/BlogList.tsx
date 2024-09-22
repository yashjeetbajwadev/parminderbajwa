import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useListData } from '@/components/DataFetcher'
import { BlogsResponse } from '@/types/pocketbase'
import { formatSinglePage } from '@/lib/utils'

export  function BlogList() {
  const blogData = useListData();
  console.log(blogData);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6 grid-cols-2">
        {blogData.items.map((post: BlogsResponse) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-2">By {post.author}</p>
              <p className="line-clamp-3">{post.body}</p>
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