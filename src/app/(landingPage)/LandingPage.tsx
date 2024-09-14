import React from 'react';
import Hero from './landing-page-components/Hero';
import Incentive from './landing-page-components/Incentive';
import Testimonials from './landing-page-components/Testimonials';
import Head from 'next/head';
import { websiteName } from '../contentSections';

export default function LandingPage() {
  return (
    <React.Fragment>
      <Head>
        <title>{websiteName}</title>
        <meta name='description' content={websiteName} />
      </Head>
      <Incentive />
      <main className='isolate mx-auto max-w-7xl dark:bg-boxdark-2'>
        <Hero />
        <Testimonials />
      </main>
    </React.Fragment>
  );
}
