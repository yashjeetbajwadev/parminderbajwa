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
    <Card className="container mx-auto my-8 bg-white">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Listings</h2>
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
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-grow justify-center items-center">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
