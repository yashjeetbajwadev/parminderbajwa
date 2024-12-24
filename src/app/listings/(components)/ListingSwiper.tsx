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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate, formatSinglePage, validDate } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import {
  BathIcon,
  BedDoubleIcon,
  BedIcon,
  CalendarIcon,
  CarIcon,
  HomeIcon,
  RulerIcon,
} from "lucide-react";
import Link from "next/link";
import { ListResult } from "pocketbase";
import { ListingListImageCarousel } from "./ListingListImageCarousel";
import Autoplay from "embla-carousel-autoplay";

export default function ListingsCarousel({
  data,
}: Readonly<{
  data: ListResult<ListingsResponse>;
}>) {
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
      <div className="container px-4 xl:px-0">
        <Card className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg">
          <CardHeader className="p-4 border-b border-gray-200 md:p-6 dark:border-gray-700">
            <div className="flex flex-row flex-wrap justify-center gap-2 sm:justify-between">
              <h2 className="text-xl font-bold text-gray-800 md:text-2xl lg:text-3xl dark:text-gray-100">
                Featured Listings
              </h2>
              <LinkButton
                href="/listings"
                buttonevent="featured view all listings"
                variant="outline"
                className="text-blue-500 transition-colors duration-300 border-blue-500 md:w-auto hover:bg-blue-600 hover:text-white"
              >
                View all listings
              </LinkButton>
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
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnMouseEnter: true,
                })

              ]}
            >
              <CarouselContent>
                {featuredListings
                  .slice(0, 3)
                  .map((listing: ListingsResponse) => (
                    <CarouselItem
                      key={listing.id}
                      className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <Card
                        key={"Card" + listing.id}
                        className="flex flex-col h-full transition-shadow duration-300 hover:shadow-lg"
                      >
                        <CardHeader className="p-0">
                          <ListingListImageCarousel
                            record={listing}
                            ImageClassName="h-full"
                            thumbs="500x0"
                          />
                        </CardHeader>
                        <CardContent className="flex-grow p-3 sm:p-4">
                          <CardTitle className="mb-2 text-lg sm:text-xl">
                            {listing.title}
                          </CardTitle>
                          <p className="mb-2 text-sm text-muted-foreground">{`${listing.address}`}</p>
                          <div className="flex items-center justify-between mb-3">
                            {listing.price > 0 ? (
                              <p className="text-2xl font-bold md:text-3xl">
                                ${listing.price.toLocaleString()}
                              </p>
                            ) : (
                              <Badge variant="secondary">
                                Price by Negotiation
                              </Badge>
                            )}
                          </div>
                          <div className="grid grid-cols-[1fr_1fr] gap-4 mb-6">
                            {Boolean(listing.bedroom) && (
                              <div className="flex items-center">
                                <BedIcon
                                  className="w-4 h-4 mr-1"
                                  aria-hidden="true"
                                />
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
                                  {listing.bathroom > 1
                                    ? "bathrooms"
                                    : "bathroom"}
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
                          <LinkButton
                            buttonevent="View Listing Details"
                            href={formatSinglePage(
                              "listings",
                              listing.id,
                              listing.title
                            )}
                            className="w-full text-sm"
                          >
                            View Details
                          </LinkButton>
                        </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <CarouselPrevious
                buttonevent="featuredPrevious"
                className="absolute left-(-1) hidden -translate-x-1/2 -translate-y-1/2 top-1/2 lg:flex"
              />
              <CarouselNext
                buttonevent="featuredNext"
                className="absolute right-(-1) hidden translate-x-1/2 -translate-y-1/2 top-1/2 lg:flex"
              />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </section >
  );
}
