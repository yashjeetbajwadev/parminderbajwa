import {
  BedIcon,
  BathIcon,
  CarIcon,
  RulerIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSingleData } from "@/components/DataFetcher";
import ListingListImageCarousel from "../../(components)/ListingListImageCarousel";

export default function PropertyListing() {
  const property = useSingleData();
  if (!property) return <div>No data available</div>;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">
                {property.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {property.address}, {property.city}, {property.state}{" "}
                {property.zip}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">
                ${property.price.toLocaleString()}
              </p>
              {property.priceByNegotiation && (
                <Badge variant="secondary">Price by Negotiation</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
        <ListingListImageCarousel record={property} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="flex items-center">
              <BedIcon className="mr-2" />
              <span>{property.bedroom} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <BathIcon className="mr-2" />
              <span>{property.bathroom} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <CarIcon className="mr-2" />
              <span>{property.parking} Parking Spaces</span>
            </div>
            <div className="flex items-center">
              <RulerIcon className="mr-2" />
              <span>{property.squareFt} sq ft</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Property Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Type:</strong> {property.type.join(", ")}
                </p>
                <p>
                  <strong>Lot Size:</strong> {property.lotSize} acres
                </p>
                <p>
                  <strong>Year Built:</strong> {formatDate(property.yearBuilt)}
                </p>
              </div>
              <div>
                <p>
                  <strong>Listing Date:</strong>{" "}
                  {formatDate(property.listingDate)}
                </p>
                <p>
                  <strong>Status:</strong> {property.status.join(", ")}
                </p>
                <p>
                  <strong>Agent:</strong> {property.agent}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Amenities</h3>
              <p>{property.amenities}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Additional Information</h3>
              <p>{property.additionalInfo}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Contact Agent</Button>
          <Button>Schedule Viewing</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
