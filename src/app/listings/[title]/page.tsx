"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import { PropertyPage } from "@/app/listings/(components)/PropertyPage";
import { useRouter, useSearchParams } from 'next/navigation';

function Page() {
  // read the id from the URL next
  const params = useSearchParams();
  const id = params.get('object') ?? null;
  const router = useRouter();
  if (!id) {
    router.push('/listings');
    return null;
  }

  return (
    <DataFetcher collectionName={"listings"} id={id as string}>
      <PropertyPage />
    </DataFetcher>
  );
}

export default Page;
