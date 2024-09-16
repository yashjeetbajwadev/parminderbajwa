"use client";
import React from "react";
import { DataFetcher } from "@/components/DataFetcher";
import { useParams, useRouter } from 'next/navigation';
import BlogPost from "@/app/blogs/(components)/BlogPost";

function Page() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  if (!id) {
    router.push('/blogs');
  }
  console.log(id);
  return (
    <DataFetcher collectionName="listings" id={id as string}>
      <BlogPost />
    </DataFetcher>
  );
}

export default Page;
