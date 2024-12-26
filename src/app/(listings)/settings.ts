import { CommonAPIProps } from "@/lib/utils";
import { ListOptions } from "pocketbase";

export function ListingPageConfig(
  page: string,
  extraOptions?: ListOptions
): CommonAPIProps<"listings"> {
  const options = {
    filter: "status='active'",
    page: Number(page ?? 1),
    sort: "-featuredOnHomePage,created",
  };
  return {
    collectionName: "listings",
    options: { ...options, ...extraOptions },
  };
}
export function SoldListingPageConfig(
  soldPage: string,
  extraOptions?: ListOptions
): CommonAPIProps<"listings"> {
  const options = {
    filter: "status='sold'",
    page: Number(soldPage ?? 1),
    sort: "-featuredOnHomePage,updated",
  };
  return {
    collectionName: "listings",
    options: { ...options, ...extraOptions },
  };
}
