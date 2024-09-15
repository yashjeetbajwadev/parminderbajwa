"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import PropertyListing from "./(component)/PropertyListing";
import { useParams } from 'next/navigation';
function Page() {
  // read the id from the URL next
  const params = useParams();
  const id = params?.id;

  return (
    <DataFetcher collectionName="listings" id={id as string}>
      <PropertyListing />
    </DataFetcher>
  );
}

export default Page;
