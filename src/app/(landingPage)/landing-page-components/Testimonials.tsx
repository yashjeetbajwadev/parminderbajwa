import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { testimonials } from '../../contentSections';
import Image from 'next/image';

function Testimonials() {
  return (
    <div className='mx-auto mt-32 max-w-7xl sm:mt-56 sm:px-6 lg:px-8'>
      <div className='relative rounded-xl bg-blue-400/20 sm:left-5 lg:-m-4 lg:ring-1 lg:ring-blue-500/50'>
        <div className='relative bg-gray-900 px-8 pt-8 shadow-xl dark:bg-boxdark sm:right-5 sm:top-5 sm:rounded-xl sm:px-10 sm:pt-16 md:px-12 lg:px-20'>
          <h2 className='text-center text-2xl font-semibold leading-7 tracking-wide text-white dark:text-white md:text-left'>
            Hear From Our Happy Homeowners
          </h2>
          <div className='flex flex-col items-center py-10'>
            <Carousel
              className='w-full max-w-xs md:max-w-5xl'
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              opts={{
                align: 'start',
                slidesToScroll: 1,
                loop: true,
              }}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className='items-center justify-center md:basis-1/3'>
                    <Image className='h-full w-full rounded-xl' 
                    src={testimonial.avatarSrc} 
                    alt='Avatar'
                    width={300}
                    height={300}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className='text-white' />
              <CarouselNext className='text-white' />
            </Carousel>
            <div className='mt-10 text-center text-[18px] font-normal italic leading-normal text-white'>
              <p>&quot;Home is where love resides, memories are created, friends always belong, and laughter never ends.&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
