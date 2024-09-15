"use client";
import React from 'react'
import {DataFetcher} from '@/components/DataFetcher';
import { ListingsPage as ExampleListing } from './(components)/ListingsPage';

function page() {
  return (
    <DataFetcher collectionName='listings' >
        <ExampleListing />
    </DataFetcher>
  )
}

export default page