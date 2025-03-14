import { ContactMe } from "@/components/custom/ContactMe/ContactMe";
import { getCollectionData } from "@/lib/utils";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import React from "react";
import ListingsSwiper from "../(listings)/(components)/ListingSwiper";
import Hero from "./landing-page-components/Hero";
import Incentive from "./landing-page-components/Incentive";
import Testimonials from "./landing-page-components/Testimonials";

export default async function LandingPage() {
  const listingsList: ListResult<ListingsResponse> = await getCollectionData({
    collectionName: "listings",
    options: {
      perPage: 10,
      sort: "-featuredOnHomePage,-created,@random",
      filter: `status='active'`,
    },
  });

  return (
    <React.Fragment>
      <Incentive />
      <main className="isolate dark:bg-boxdark-2">
        <Hero />
        <ListingsSwiper data={listingsList} />
        <Testimonials />
        <div className="mt-30">
          <ContactMe />
        </div>
      </main>
    </React.Fragment>
  );
}
