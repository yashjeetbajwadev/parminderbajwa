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
    <div className="container px-5 xl:px-0 mx-auto my-[60px] md:my-[100px]">
      <Card className="container text-gray-700 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold md:text-3xl">
              Featured Listings
            </h2>
            <Link href="/listings">
              <Button className="blue-500" variant="outline">
                View all
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent>
              {data?.items?.map((listing: ListingsResponse) => (
                <CarouselItem
                  key={listing.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center flex-grow">
                      <ListingListImageCarousel
                        record={listing}
                        ImageClassName="w-full h-full rounded-xl"
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 p-4">
                      <p className="font-semibold">
                        {formatPrice(listing.price)}
                      </p>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
}
