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
import { formatPrice, formatSinglePage } from "@/lib/utils";

export default function ListingsCarousel({
  data,
}: {
  data: ListResult<ListingsResponse>;
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-5 mx-auto xl:px-0">
        <Card className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
          <CardHeader className="p-6 border-b border-gray-200 md:p-8 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
                Featured Listings
              </h2>
              <Link href="/listings" passHref>
                <Button
                  variant="outline"
                  className="text-blue-500 transition-colors duration-300 border-blue-500 hover:bg-blue-600 hover:text-white"
                >
                  View all
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {data?.items?.map((listing: ListingsResponse) => (
                  <CarouselItem
                    key={listing.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="flex flex-col h-full transition-shadow duration-300 shadow-md hover:shadow-xl">
                      <CardHeader className="p-4">
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                          {listing.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow p-0">
                        <ListingListImageCarousel
                          record={listing}
                          ImageClassName="w-full h-48 object-cover rounded-t-xl"
                        />
                      </CardContent>
                      <CardFooter className="flex flex-col gap-3 p-4 bg-gray-50 dark:bg-gray-700">
                        <p className="text-2xl font-bold text-blue-500">
                          {formatPrice(listing.price)}
                        </p>
                        <Button
                          className="w-full text-white transition-colors duration-300 bg-blue-500 hover:bg-blue-600"
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
              <CarouselPrevious className="hidden md:flex left-4" />
              <CarouselNext className="hidden md:flex right-4" />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
