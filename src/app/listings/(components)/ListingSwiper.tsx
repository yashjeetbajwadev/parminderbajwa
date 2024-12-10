"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import ListingListImageCarousel from "./ListingListImageCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  formatDate,
  formatPrice,
  formatSinglePage,
  validDate,
} from "@/lib/utils";
import {
  BathIcon,
  BedDoubleIcon,
  CalendarIcon,
  CarIcon,
  HomeIcon,
  RulerIcon,
} from "lucide-react";

export default function ListingsCarousel({
  data,
}: {
  data: ListResult<ListingsResponse>;
}) {
  const featuredListings =
    data?.items?.filter(
      (listing) => listing.featuredOnHomePage && listing.featuredOnHomePage > 0
    ) || [];

  const itemCount = featuredListings.length;

  if (itemCount === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-16 dark:bg-gray-900">
      <div className="container px-4 mx-auto max-w-7xl xl:px-0">
        <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="p-4 border-b border-gray-200 md:p-6 dark:border-gray-700">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl dark:text-gray-100">
                Featured Listings
              </h2>
              <Link href="/listings" passHref>
                <Button
                  variant="outline"
                  className="w-full text-blue-500 transition-colors duration-300 border-blue-500 md:w-auto hover:bg-blue-600 hover:text-white"
                >
                  View all listings
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Carousel
              className="w-full"
              opts={{
                loop: itemCount > 1,
                align: "start",
                slidesToScroll: 1,
              }}
            >
              <CarouselContent>
                {featuredListings
                  .slice(0, 3)
                  .map((listing: ListingsResponse) => (
                    <CarouselItem
                      key={listing.id}
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="grid h-full overflow-hidden">
                        <CardHeader className="p-0">
                          <ListingListImageCarousel
                            record={listing}
                            ImageClassName="h-48 sm:h-56 md:h-64 w-full object-cover"
                          />
                        </CardHeader>
                        <CardContent className="flex-grow p-3 sm:p-4">
                          <CardTitle className="mb-2 text-lg sm:text-xl">
                            {listing.title}
                          </CardTitle>
                          <p className="mb-2 text-sm text-muted-foreground">{`${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}`}</p>
                          <div className="flex items-center justify-between mb-3">
                            {listing.priceByNegotiation ? (
                              <span className="text-lg font-bold sm:text-xl">
                                Price by Negotiation
                              </span>
                            ) : (
                              <span className="text-lg font-bold sm:text-xl">
                                {formatPrice(listing.price)}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-3 text-sm sm:grid-cols-3">
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
                                <span>
                                  {new Date(listing.yearBuilt).getFullYear()}
                                </span>
                              </div>
                            )}
                          </div>
                          {listing.listingDate &&
                            validDate(listing.listingDate) && (
                              <p className="mb-1 text-xs text-muted-foreground">
                                Listed on {formatDate(listing.listingDate)}
                              </p>
                            )}
                          {listing.auctionDate &&
                            validDate(listing.auctionDate) && (
                              <p className="text-xs">
                                Auction Date: {formatDate(listing.auctionDate)}
                              </p>
                            )}
                        </CardContent>
                        <CardFooter className="p-3 mt-auto sm:p-4 bg-muted">
                          <Button
                            className="w-full m-0 text-sm"
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
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <CarouselPrevious className="absolute left-(-1) hidden -translate-x-1/2 -translate-y-1/2 top-1/2 lg:flex" />
              <CarouselNext className="absolute right-(-1) hidden translate-x-1/2 -translate-y-1/2 top-1/2 lg:flex" />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
