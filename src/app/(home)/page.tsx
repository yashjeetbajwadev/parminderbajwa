import React from 'react';
import Incentive from "@/app/(home)/incentive";
import Hero from "@/app/(home)/hero";

export default function Home() {
    return (
        <React.Fragment>
            <Incentive />
            <main className='isolate mx-auto max-w-7xl dark:bg-boxdark-2'>
                <Hero />
                {/*<Testimonials />*/}
            </main>
        </React.Fragment>
    );
}
