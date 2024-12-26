import { BlogsPage } from "@/app/(blogs)/blogsPage";
import { ListingsPage } from "@/app/(listings)/listingsListPage"
import { SoldListingsPage } from "@/app/(listings)/soldlistingsListPage";

export async function generateStaticParams() {
    return [
        { params: { slug: "listings", pageno: 1 } },
        { params: { slug: "sold", pageno: 1 } },
        { params: { slug: "blogs", pageno: 1 } },
    ];
}

export default async function Page({
    params,
    searchParams,
}: Readonly<{
    params: Promise<{ slug: string, pageno: string }>;
    searchParams?: Promise<{ [key: string]: string }>;
}>) {
    try {

        const { slug } = await params;
        console.log(slug);

        switch (slug) {
            case "listings":
                return <ListingsPage params={params} searchParams={searchParams} />;
            case "sold":
                return <SoldListingsPage params={params} searchParams={searchParams} />;
            case "blogs":
                return <BlogsPage params={params} searchParams={searchParams} />;
        }
    }
    catch (e) {
        console.log("user e: " + e);
    }
}