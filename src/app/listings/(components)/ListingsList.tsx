"use client";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatSinglePage, validDate } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import {
  BathIcon,
  BedIcon,
  CarIcon,
  RulerIcon,
  HomeIcon,
  CalendarIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListResult } from "pocketbase";
import { Fragment, useCallback, useEffect, useState } from "react";
import { ListingListImageCarousel } from "./ListingListImageCarousel";

export function ListingsList({
  data,
  sold,
}: Readonly<{
  data: ListResult<ListingsResponse>;
  sold?: boolean;
}>): JSX.Element {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(data?.page ?? 1);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParams = useCallback(
    (thisCurrentPage?: number) => {
      let newSearch = new URLSearchParams(searchParams);
      newSearch.set(
        sold ? "soldPage" : "page",
        thisCurrentPage?.toString() ?? currentPage.toString()
      );
      let newUrl = new URL(pathname, window.location.origin);
      newUrl.search = newSearch.toString();
      router.push(newUrl.toString());
    },
    [searchParams, sold, currentPage, pathname, router]
  );
  useEffect(() => {
    setParams();
  }, [setParams]);
  return (
    <div className="container px-5 py-8 xl:px-0">
      <div className="flex items-center justify-between mb-8">
        <p className="mr-4 text-sm text-muted-foreground md:text-base">
          Showing {data.items.length} of {data.totalItems}{" "}
          {sold ? "Sold listings" : "Active listings"}
        </p>
        <div className="flex gap-2">
          <Button
            buttonevent="Listings Previous Page"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => {
              let thisCurrentPage =
                (sold
                  ? Number(searchParams.get("soldPage"))
                  : Number(searchParams.get("page"))) ?? 1;
              if (thisCurrentPage > 1) {
                setCurrentPage(thisCurrentPage - 1);
                setParams(thisCurrentPage);
              }
            }}
          >
            Previous
          </Button>
          <Button
            buttonevent="Listings Next Page"
            variant="outline"
            disabled={currentPage === data.totalPages}
            onClick={() => {
              let thisCurrentPage =
                (sold
                  ? Number(searchParams.get("soldPage"))
                  : Number(searchParams.get("page"))) ?? 1;
              if (thisCurrentPage < data.totalPages) {
                setCurrentPage(thisCurrentPage + 1);
                setParams(thisCurrentPage);
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data?.items?.map((listing: ListingsResponse) => (
          <Card
            key={listing.id}
            className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="p-0">
              <ListingListImageCarousel
                record={listing}
                ImageClassName="h-full w-full"
                thumbs="500x0"
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="mb-2 text-xl">{listing.title}</CardTitle>
              <p className="mb-2 text-muted-foreground">
                {(() => {
                  const addressParts = [listing.address];
                  return addressParts.join(", ");
                })()}
              </p>
              <div className="flex items-center justify-between mb-4 ">
                <span className="flex items-center justify-between w-full text-2xl font-bold">
                  {!sold && (
                    <Fragment>
                      {listing.price > 0 ? (
                        <p className="text-2xl font-bold md:text-3xl">
                          ${listing.price.toLocaleString()}
                        </p>
                      ) : (
                        <Badge variant="secondary">Price by Negotiation</Badge>
                      )}
                    </Fragment>
                  )}
                  <Badge
                    variant={
                      listing.status === "active" ? "default" : "secondary"
                    }
                  >
                    {listing.status[0].toUpperCase() +
                      listing.status.substring(1)}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-[1fr_1fr] gap-4 mb-6">
                {Boolean(listing.bedroom) && (
                  <div className="flex items-center">
                    <BedIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span className="text-sm sm:text-base">
                      {listing.bedroom}{" "}
                      {listing.bedroom > 1 ? "Bedrooms" : "Bedroom"}
                    </span>
                  </div>
                )}
                {Boolean(listing.bathroom) && (
                  <div className="flex items-center">
                    <BathIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {listing.bathroom}{" "}
                      {listing.bathroom > 1 ? "Bathrooms" : "Bathroom"}
                    </span>
                  </div>
                )}
                {Boolean(listing.parking) && (
                  <div className="flex items-center">
                    <CarIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {listing.parking} parking
                    </span>
                  </div>
                )}
                {Boolean(listing.floorSquareFt) && (
                  <div className="flex items-center">
                    <HomeIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {listing.floorSquareFt} sqft
                    </span>
                  </div>
                )}
                {Boolean(listing.landSquareFt) && (
                  <div className="flex items-center">
                    <RulerIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {listing.landSquareFt} sqft
                    </span>
                  </div>
                )}
                {listing.yearBuilt && (
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {new Date(listing.yearBuilt).getFullYear()}
                    </span>
                  </div>
                )}
              </div>
              {listing.listingDate && validDate(listing.listingDate) && (
                <p className="mb-2 text-sm text-muted-foreground">
                  Listed on {formatDate(listing.listingDate)}
                </p>
              )}
              {listing.priceByNegotiation && (
                <Badge variant="outline" className="mb-2">
                  Price by Negotiation
                </Badge>
              )}
              {listing.auctionDate && validDate(listing.auctionDate) && (
                <p className="text-sm">
                  Auction Date: {formatDate(listing.auctionDate)}
                </p>
              )}
            </CardContent>
            <CardFooter className="self-end p-4 bg-muted">
              {!sold && (
                <LinkButton
                  buttonevent="View Listing Details"
                  href={formatSinglePage("listings", listing.id, listing.title)}
                >
                  <span className="text-sm">View Details</span>
                </LinkButton>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between my-8">
        <p className="mr-4 text-sm text-muted-foreground md:text-base">
          Showing {data.items.length} of {data.totalItems}{" "}
          {sold ? "Sold listings" : "Active listings"}
        </p>
        <div className="flex gap-2">
          <Button
            buttonevent="Listings Previous Page"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => {
              let thisCurrentPage =
                (sold
                  ? Number(searchParams.get("soldPage"))
                  : Number(searchParams.get("page"))) ?? 1;
              if (thisCurrentPage > 1) {
                setCurrentPage(thisCurrentPage - 1);
                setParams(thisCurrentPage);
              }
            }}
          >
            Previous
          </Button>
          <Button
            buttonevent="Listings Next Page"
            variant="outline"
            disabled={currentPage === data.totalPages}
            onClick={() => {
              let thisCurrentPage =
                (sold
                  ? Number(searchParams.get("soldPage"))
                  : Number(searchParams.get("page"))) ?? 1;
              if (thisCurrentPage < data.totalPages) {
                setCurrentPage(thisCurrentPage + 1);
                setParams(thisCurrentPage);
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
