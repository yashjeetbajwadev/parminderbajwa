"use client";
import { ListingListImageCarousel } from "@/app/listings/(components)/ListingListImageCarousel";
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
import { ListingsResponse, UsersRecord } from "@/types/pocketbase";
import { BathIcon, BedIcon, CarIcon, RulerIcon } from "lucide-react";
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
  const expand = data?.expand as { agent: UsersRecord };
  const agent = expand?.agent ?? { name: "Unknown" };

  const BreadcrumbItems = () => {
    return [
      { href: "/", label: "Home" },
      { href: "/listings", label: "Properties" },
      {
        href: `/${formatSinglePage("listings", data.id, data.title)}`,
        label: data.title ?? "Property",
      },
    ];
  };

  return (
    <React.Fragment>
      <BackButtonBreadcrumb items={BreadcrumbItems()} />
      <div className="container mx-auto py-8 max-w-7xl">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {data.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {data.address}, {data.city}, {data.state} {data.zip}
                </CardDescription>
              </div>
              <div className="text-right">
                {
                  data.price > 0 ? (
                    <p className="text-2xl md:text-3xl font-bold">
                      ${data.price.toLocaleString()}
                    </p>
                  ) :
                    (
                      <Badge variant="secondary">Price by Negotiation</Badge>
                    )
                }

              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className=" w-full h-full">
              <ListingListImageCarousel
                record={data}
                ImageClassName={"w-full h-full"}
                openDialogOnClick
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              {data.bedroom > 0 && (
                <div className="flex items-center">
                  <BedIcon className="mr-2" />
                  <span>{data.bedroom} Bedrooms</span>
                </div>
              )}
              {data.bathroom > 0 && (
                <div className="flex items-center">
                  <BathIcon className="mr-2" />
                  <span>{data.bathroom} Bathrooms</span>
                </div>
              )}
              {data.parking > 0 && (
                <div className="flex items-center">
                  <CarIcon className="mr-2" />
                  <span>{data.parking} Parking Spaces</span>
                </div>
              )}
              {data.floorSquareFt > 0 && (
                <div className="flex items-center">
                  <RulerIcon className="mr-2" />
                  <span>{data.floorSquareFt} sq ft</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Property Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Type:</strong> {data.type.join(", ")}
                  </p>
                  <p>
                    <strong>Lot Size:</strong> {data.landSquareFt} sq ft
                  </p>
                  {data.yearBuilt && validDate(data.yearBuilt) && (
                    <p>
                      <strong>Year Built:</strong> {formatDate(data.yearBuilt)}
                    </p>
                  )}
                </div>
                <div>
                  {data.listingDate && validDate(data.listingDate) && (
                    <p>
                      <strong>Listing Date:</strong>{" "}
                      {formatDate(data.listingDate)}
                    </p>
                  )}
                  <p>
                    <strong>Status:</strong> {data.status}
                  </p>
                  <p>
                    <strong>Agent:</strong> {agent.name}
                  </p>
                </div>
              </div>
              {data.amenities && (
                <div>
                  <h3 className="text-xl font-semibold">Amenities</h3>
                  <p>{data.amenities}</p>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">Description</h3>
                <div dangerouslySetInnerHTML={{ __html: data.additionalInfo }} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <ContactMe openInModal />
          </CardFooter>
        </Card>
        {listingList.items.length > 0 && <ListingsSwiper data={listingList} />}
      </div>
    </React.Fragment>
  );
}
