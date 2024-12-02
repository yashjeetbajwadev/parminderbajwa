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
  formatPrice,
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
import { ListResult } from "pocketbase";
import ListingListImageCarousel from "./ListingListImageCarousel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function ListingsList({
  data,
}: {
  data: ListResult<ListingsResponse>;
}): JSX.Element {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(data?.page);

  useEffect(() => {
    if (currentPage > 1) {
      router.push("/listings?page=" + currentPage);
    }
  }, [currentPage, router]);

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">My Listings</h1>
      <div className="mb-8 flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {data.items.length} of {data.totalItems} listings
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.items?.map((listing: ListingsResponse) => (
          <Card key={listing.id} className="overflow-hidden grid">
            <CardHeader className="p-0">
              <ListingListImageCarousel
                record={listing}
                ImageClassName="h-full"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{listing.title}</CardTitle>
              <p className="text-muted-foreground mb-2">{`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">
                  {formatPrice(listing.price)}
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
                <div className="flex items-center">
                  <BedDoubleIcon className="w-4 h-4 mr-1" />
                  <span>{listing.bedroom} bd</span>
                </div>
                <div className="flex items-center">
                  <BathIcon className="w-4 h-4 mr-1" />
                  <span>{listing.bathroom} ba</span>
                </div>
                <div className="flex items-center">
                  <CarIcon className="w-4 h-4 mr-1" />
                  <span>{listing.parking} pkg</span>
                </div>
                <div className="flex items-center">
                  <HomeIcon className="w-4 h-4 mr-1" />
                  <span>{listing.floorSquareFt} sqft</span>
                </div>
                <div className="flex items-center">
                  <RulerIcon className="w-4 h-4 mr-1" />
                  <span>{listing.landSquareFt} sqft</span>
                </div>
                {listing.yearBuilt && (
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(listing.yearBuilt).getFullYear()}</span>
                  </div>
                )}
              </div>
              {listing.listingDate && validDate(listing.listingDate) && (
                <p className="text-sm text-muted-foreground mb-2">
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
            <CardFooter className="bg-muted p-4 self-end">
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
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
