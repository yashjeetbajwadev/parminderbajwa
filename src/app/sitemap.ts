import { formatSinglePage, getCollectionData } from "@/lib/utils";
import type { MetadataRoute } from "next";
import { BlogsListConfig } from "./blogs/settings";
import { ListingPageConfig } from "./listings/settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [activeListings, blogs] = await Promise.all([
    getCollectionData(ListingPageConfig("1", { perPage: 100 })),
    getCollectionData(BlogsListConfig("1", { perPage: 100 })),
  ]);
  let url = "https://parminderbajwa.co.nz";
  function page(
    endPoint: string,
    lastModified?: Date,
    changeFrequency?: string,
    priority?: number
  ) {
    return {
      url: url + (endPoint ? `/${endPoint}` : ""),
      lastModified: lastModified ?? new Date(),
      changeFrequency: changeFrequency ?? "yearly",
      priority: priority ?? 1,
    };
  }

  const sitemap = [
    page("", new Date(), "daily", 1),
    page("about", new Date(), "monthly", 0.8),
    page("blogs", new Date(), "daily", 0.9),
    page("listings", new Date(), "daily", 0.9),
  ];
  activeListings.items.forEach((listing) => {
    sitemap.push(
      page(
        formatSinglePage("listings", listing.title, listing.id),
        new Date(listing.updated),
        "daily",
        0.9
      )
    );
  });
  blogs.items.forEach((blog) => {
    sitemap.push(
      page(
        formatSinglePage("blogs", blog.title, blog.id),
        new Date(blog.updated),
        "daily",
        0.9
      )
    );
  });

  return sitemap as MetadataRoute.Sitemap;
}
