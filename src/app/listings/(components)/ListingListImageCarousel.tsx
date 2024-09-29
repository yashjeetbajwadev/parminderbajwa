'use client';

import React from 'react';
import { ListingsResponse } from '@/types/pocketbase';
import PocketBaseImage from '@/components/PocketBaseImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, isServer } from '@/lib/utils';

function ListingListImageCarousel({ record, ImageClassName}: { record: ListingsResponse, ImageClassName?: string}) {
  if (!record.images.length){
    record.images = ['placeholder.png'];
  } 

  return (
    <Carousel className={cn("w-full")}>
      <CarouselContent>
        {record.images.map((image, index) => (
          <CarouselItem key={index}>
            <PocketBaseImage
              record={record}
              filename={image}
              className={cn("object-cover",  ImageClassName)}
              width={isServer()? 1920: window.innerWidth}
              height={isServer()? 1080: window.innerWidth}
              alt={`${record.title} - Image ${index + 1}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {record.images.length > 1 && (
        <>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
        </>
      )}
    </Carousel>
  );
}

export default ListingListImageCarousel;