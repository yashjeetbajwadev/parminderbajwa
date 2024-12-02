import Head from 'next/head';
import React from 'react';
import { websiteName } from '../contentSections';
import Hero from './landing-page-components/Hero';
import Incentive from './landing-page-components/Incentive';
import Testimonials from './landing-page-components/Testimonials';
import ListingsSwiper from '../listings/(components)/ListingSwiper';
import { getCollectionData } from '@/lib/utils';
import { ListingsResponse } from '@/types/pocketbase';
import { ListResult } from 'pocketbase';
import {ContactMe} from '@/components/custom/ContactMe/ContactMe';

export default async function LandingPage() {
  const listingsList: ListResult<ListingsResponse> = await getCollectionData({
    collectionName: "listings",
    options: {
      perPage: 10,
      sort: '-featuredOnHomePage,-created,@random',
      filter: `status='active'`
    }
  });

  return (
    <React.Fragment>
      <Head>
        <title>{websiteName}</title>
        <meta name='description' content={websiteName} />
      </Head>
      <Incentive />
      <main className='isolate mx-auto max-w-7xl dark:bg-boxdark-2'>
        <Hero />
        <ListingsSwiper data={listingsList}/>
        <Testimonials />
        <div className='mt-20'>
          <ContactMe/>
        </div>
      </main>
    </React.Fragment>
  );
}
