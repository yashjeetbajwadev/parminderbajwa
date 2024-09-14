import React from 'react';
import Hero from './landing-page-components/Hero';
import Incentive from './landing-page-components/Incentive';
import Testimonials from './landing-page-components/Testimonials';

export default function LandingPage() {
  return (
    <React.Fragment>
      <Incentive />
      <main className='isolate mx-auto max-w-7xl dark:bg-boxdark-2'>
        <Hero />
        <Testimonials />
      </main>
    </React.Fragment>
  );
}
