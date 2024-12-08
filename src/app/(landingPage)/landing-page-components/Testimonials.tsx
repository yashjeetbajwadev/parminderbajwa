"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "../../contentSections";
import Image from "next/image";

function Testimonials() {
  return (
    <div className="mx-auto my-[60px] md:mt-[100px]max-w-7xl px-5 xl:px-0">
      <div className="relative rounded-xl bg-blue-400/20 sm:left-5 lg:-m-4 lg:ring-1 lg:ring-blue-500/50">
        <div className="relative px-8 pt-8 bg-gray-900 shadow-xl rounded-xl dark:bg-boxdark sm:right-5 sm:top-5 sm:rounded-xl sm:px-10 sm:pt-16 md:px-12 lg:px-20">
          <h2 className="text-2xl font-semibold leading-7 tracking-wide text-center md:text-3xl text-white/90 dark:text-white md:text-left">
            Our Happy Clients
          </h2>
          <div className="flex flex-col items-center py-10">
            <Carousel
              className="w-full max-w-xs md:max-w-5xl"
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              opts={{
                align: "start",
                slidesToScroll: 1,
                loop: true,
              }}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="items-center justify-center md:basis-1/3"
                  >
                    <Image
                      className="w-full h-full rounded-xl"
                      src={testimonial.avatarSrc}
                      alt="Avatar"
                      width={300}
                      height={300}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-10 text-center text-[18px] font-normal italic leading-normal text-white/80">
              <p>
                &quot;Home is where love resides, memories are created, friends
                always belong, and laughter never ends.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
