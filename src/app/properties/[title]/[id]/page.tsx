"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import PropertyListing from "@/app/properties/(components)/PropertyListing";
import { useParams, useRouter } from 'next/navigation';
import BackButtonBreadcrumb from "@/components/custom/BackBreadCrumb";

function Page() {
  // read the id from the URL next
  const params = useParams();
  const id = params?.id;
  const title = params?.title;
  const router = useRouter();
  if (!id) {
    router.push('/properties');
    return null;
  }


  return (
    <DataFetcher collectionName="listings" id={id as string}>
      <PropertyListing />
    </DataFetcher>
  );
}

export default Page;
