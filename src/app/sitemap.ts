import { formatSinglePage, getCollectionData } from "@/lib/utils";
import type { MetadataRoute } from "next";
import { BlogsListConfig } from "./(blogs)/settings";
import { ListingPageConfig } from "./(listings)/settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let url = "https://parminderbajwa.co.nz";
  const sitemap = [
    page(url, "", new Date(), "daily", 1),
    page(url, "about", new Date(), "monthly", 0.8),
  ];

  const [activeListings, blogs] = await Promise.all([
    getCollectionData(ListingPageConfig("1", { perPage: 100, limit: 100 })),
    getCollectionData(BlogsListConfig("1", { perPage: 100, limit: 100 })),
  ]);

  await addPaginatedPages(url, sitemap, ListingPageConfig, "listings");
  await addPaginatedPages(url, sitemap, BlogsListConfig, "blogs");

  addItemsToSitemap(url, sitemap, activeListings.items, "listings");
  addItemsToSitemap(url, sitemap, blogs.items, "blogs");

  return sitemap as MetadataRoute.Sitemap;
}

function page(
  url: string,
  endPoint: string,
  lastModified?: Date,
  changeFrequency?: string,
  priority?: number
) {
  const endpoint = endPoint.startsWith("/")
    ? endPoint.replace("/", "")
    : endPoint;
  return {
    url: url + (endpoint? `/${endpoint}` : ""),
    lastModified: lastModified ?? new Date(),
    changeFrequency: changeFrequency ?? "yearly",
    priority: priority ?? 1,
  };
}
function addItemsToSitemap(
  url: string,
  sitemap: any[],
  items: any[],
  endpoint: any
) {
  items.forEach((item) => {
    sitemap.push(
      page(
        url,
        formatSinglePage(endpoint, item.title, item.id),
        new Date(item.updated),
        "daily",
        0.9
      )
    );
  });
}
async function addPaginatedPages(
  url: string,
  sitemap: any[],
  configFunction: any,
  endpoint: string
): Promise<void> {
  let paginatedData = await getCollectionData(
    configFunction("1", { fields: "id" })
  );

  while (paginatedData.page <= paginatedData.totalPages) {
    sitemap.push(
      page(url, `/${endpoint}/${paginatedData.page}`, new Date(), "daily", 0.9)
    );

    paginatedData = await getCollectionData(
      configFunction((paginatedData.page + 1).toString(), { fields: "id" })
    );
  }
}
