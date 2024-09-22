"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPost } from "@/app/blogs/(components)/BlogPost";

function Page() {
  const params = useSearchParams();
  const id = params.get('object') ?? false;
  const router = useRouter();
  if (!id) {
    router.push('/blogs');
  }
  console.log(id);
  return (
    <DataFetcher collectionName={"blogs"} id={id as string}>
      <BlogPost />
    </DataFetcher>
  );
}

export default Page;
