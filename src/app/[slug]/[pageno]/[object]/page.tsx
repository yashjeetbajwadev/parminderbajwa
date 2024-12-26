import BlogPage from "@/app/(blogs)/object/blogPage";
import { BlogsListConfig } from "@/app/(blogs)/settings";
import PropertyPagePage from "@/app/(listings)/object/listingPage";
import { ListingPageConfig } from "@/app/(listings)/settings";
import { getCollectionData } from "@/lib/utils";

async function generateBlogStaticParams() {
    const blogs = await getCollectionData(BlogsListConfig("1", { perPage: 100, limit: 100 }));
    return blogs.items.map((blog) => ({
        params: {
            slug: "blogs",
            title: blog.title,
            object: blog.title,
        },
    }));
}

async function generateListingStaticParams() {
    const listings = await getCollectionData(ListingPageConfig("1", { perPage: 100, limit: 100  }));
    return listings.items.map((listing) => ({
        params: {
            slug: "listings",
            title: listing.title,
            object: listing.id,
        },
    }));
}

export async function generateStaticParams() {
    const blogs = await generateBlogStaticParams();
    const listings = await generateListingStaticParams();
    return [...blogs, ...listings];
}

export default async function Page({
    params,
    searchParams,
}: Readonly<{
    params: Promise<{ slug: string, title: string, object: string }>;
    searchParams?: Promise<{ [key: string]: string }>;
}>) {
    const { slug } = await params;
    switch (slug) {
        case "listings":
            return <PropertyPagePage params={params} searchParams={searchParams} />;
        case "blogs":
            return <BlogPage params={params} searchParams={searchParams} />;
    }
}