"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatDate,
  formatSinglePage,
  validDate,
} from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import {
  BathIcon,
  BedDoubleIcon,
  CalendarIcon,
  CarIcon,
  HomeIcon,
  RulerIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ListResult } from "pocketbase";
import { useEffect, useState } from "react";
import { ListingListImageCarousel } from "./ListingListImageCarousel";
import React from "react";

export function ListingsList({
  data,
  sold,
}: Readonly<{
  data: ListResult<ListingsResponse>;
  sold?: boolean;
}>): JSX.Element {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(data?.page);

  useEffect(() => {
    if (currentPage > 1) {
      router.push("/listings?page=" + currentPage);
    }
  }, [currentPage, router]);

  return (
    <div className="container px-5 py-8 xl:px-0">
      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-muted-foreground md:text-base">
          Showing {data.items.length} of {data.totalItems} {sold? "Sold listings": "Active listings"}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentPage === data.totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
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
                ImageClassName="h-full"
              />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="mb-2 text-xl">{listing.title}</CardTitle>
                <p className="mb-2 text-muted-foreground">
                {(() => {
                  const addressParts = [listing.address];
                  if (listing.city) addressParts.push(listing.city);
                  if (listing.state) addressParts.push(listing.state);
                  if (listing.zip) addressParts.push(listing.zip.toString());
                  return addressParts.join(", ");
                })()}
                </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold">
                  {!sold && (
                    <React.Fragment>
                      {listing.price > 0 ? (
                        <p className="text-2xl md:text-3xl font-bold">
                          ${listing.price.toLocaleString()}
                        </p>
                      ) : (
                        <Badge variant="secondary">Price by Negotiation</Badge>
                      )}
                    </React.Fragment>
                  )}
                </span>
                <Badge
                  variant={
                    listing.status === "active" ? "default" : "secondary"
                  }
                >
                  {listing.status[0].toUpperCase() +
                    listing.status.substring(1)}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Boolean(listing.bedroom) && (
                  <div className="flex items-center">
                    <BedDoubleIcon className="w-4 h-4 mr-1" />
                    <span>{listing.bedroom} bd</span>
                  </div>
                )}
                {Boolean(listing.bathroom) && (
                  <div className="flex items-center">
                    <BathIcon className="w-4 h-4 mr-1" />
                    <span>{listing.bathroom} ba</span>
                  </div>
                )}
                {Boolean(listing.parking) && (
                  <div className="flex items-center">
                    <CarIcon className="w-4 h-4 mr-1" />
                    <span>{listing.parking} pkg</span>
                  </div>
                )}
                {Boolean(listing.floorSquareFt) && (
                  <div className="flex items-center">
                    <HomeIcon className="w-4 h-4 mr-1" />
                    <span>{listing.floorSquareFt} sqft</span>
                  </div>
                )}
                {Boolean(listing.landSquareFt) && (
                  <div className="flex items-center">
                    <RulerIcon className="w-4 h-4 mr-1" />
                    <span>{listing.landSquareFt} sqft</span>
                  </div>
                )}
                {listing.yearBuilt && (
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(listing.yearBuilt).getFullYear()}</span>
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
                <Button
                  className="w-full m-0"
                  onClick={() => {
                    window.location.href = formatSinglePage(
                      "listings",
                      listing.id,
                      listing.title
                    );
                  }}
                >
                  View Details
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
