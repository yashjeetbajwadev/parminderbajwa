"use client";

import { ListingListImageCarousel } from "@/app/(listings)/(components)/ListingListImageCarousel";
import BackButtonBreadcrumb from "@/components/custom/BreadCrumb";
import { ContactMe } from "@/components/custom/ContactMe/ContactMe";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate, formatSinglePage, validDate } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { BathIcon, BedIcon, CarIcon, HomeIcon } from "lucide-react";
import { ListResult } from "pocketbase";
import React from "react";
import ListingsSwiper from "./ListingSwiper";

export function PropertyPage({
  data,
  listingList,
}: Readonly<{
  data: ListingsResponse;
  listingList: ListResult<ListingsResponse>;
}>): JSX.Element {
  if (!data) return <div>No data available</div>;

  const BreadcrumbItems = () => {
    return [
      { href: "/", label: "Home" },
      { href: "/listings", label: "Properties" },
      {
        href: formatSinglePage("listings", data.id, data.title),
        label: data.title ?? "Property",
      },
    ];
  };

  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems()} />
      <div className="container px-4 py-6 sm:px-5 sm:py-8 xl:px-0">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between flex-wrap">
            <div>
              <div>
                <CardTitle className="text-2xl font-bold md:text-3xl">
                  {data.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {data.address}
                </CardDescription>
              </div>
              <div className="flex flex-row gap-x-4 flex-wrap justify-start">
                {Boolean(data.bedroom) && (
                  <div className="flex items-center">
                    <BedIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span className="text-sm sm:text-base">
                      {data.bedroom} {data.bedroom > 1 ? "Bedrooms" : "Bedroom"}
                    </span>
                  </div>
                )}
                {Boolean(data.bathroom) && (
                  <div className="flex items-center">
                    <BathIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {data.bathroom}{" "}
                      {data.bathroom > 1 ? "bathrooms" : "bathroom"}
                    </span>
                  </div>
                )}
                {Boolean(data.parking) && (
                  <div className="flex items-center">
                    <CarIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {data.parking} parking
                    </span>
                  </div>
                )}
                {Boolean(data.floorSquareFt) && (
                  <div className="flex items-center">
                    <HomeIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm sm:text-base">
                      {data.floorSquareFt} sqft
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center justify-between w-fulltext-2xl font-bold">
                {data.price > 0 ? (
                  <p className="text-2xl font-bold md:text-3xl">
                    ${data.price.toLocaleString()}
                  </p>
                ) : (
                  <Badge variant="secondary">Price by Negotiation</Badge>
                )}
              </span>
            </div>

          </CardHeader>

          <CardContent className="flex-grow px-6">
            <ListingListImageCarousel
              record={data}
              ImageClassName="h-full w-full"
              thumbs="500x0"
            />
            <div className="space-y-8 bg-white">
              <section>
                <h3 className="my-4 text-lg font-semibold text-gray-900 border-b">
                  Property Details
                </h3>
                {Boolean(data.type.length) && (
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium text-gray-900">Type:</span>{" "}
                      <span className="text-gray-600">
                        {data.type.join(", ")}
                      </span>
                    </p>
                  </div>
                )}
                {Boolean(data.landSquareFt) && (
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium text-gray-900">
                        Lot Size:
                      </span>{" "}
                      <span className="text-gray-600">
                        {data.landSquareFt} sq ft
                      </span>
                    </p>
                  </div>
                )}
                {Boolean(data.yearBuilt) && validDate(data.yearBuilt) && (
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium text-gray-900">
                        Year Built:
                      </span>{" "}
                      <span className="text-gray-600">
                        {formatDate(data.yearBuilt)}
                      </span>
                    </p>
                  </div>
                )}
                {Boolean(data.listingDate) && validDate(data.listingDate) && (
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium text-gray-900">
                        Listing Date:
                      </span>{" "}
                      <span className="text-gray-600">
                        {formatDate(data.listingDate)}
                      </span>
                    </p>
                  </div>
                )}
                {Boolean(data.status) && (
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium text-gray-900">Status:</span>{" "}
                      <span className="text-gray-600">
                        {data.status[0].toUpperCase() +
                          data.status.substring(1)}
                      </span>
                    </p>
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="text-sm sm:text-base">
                    <span className="font-medium text-gray-900">Agent:</span>{" "}
                    <span className="text-gray-600">Parminder Bajwa</span>
                  </p>
                </div>
              </section>

              {data.amenities && (
                <section>
                  <h3 className="pb-2 mb-4 text-xl font-semibold text-gray-900 border-b">
                    Amenities
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    {data.amenities}
                  </p>
                </section>
              )}

              <section>
                <h3 className="mb-4 text-lg font-semibold text-gray-900 border-b">
                  Description
                </h3>
                <div
                  className="text-sm leading-relaxed text-gray-600 sm:text-base"
                  dangerouslySetInnerHTML={{ __html: data.additionalInfo }}
                />
              </section>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center sm:justify-between">
            <ContactMe openInModal />
          </CardFooter>
        </Card>
        {listingList.items.length > 0 && <ListingsSwiper data={listingList} />}
      </div>
    </React.Fragment>
  );
}
