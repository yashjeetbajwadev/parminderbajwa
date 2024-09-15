import PocketBaseImage from '@/components/PocketBaseImage'
import { ListingsResponse } from '@/types/pocketbase'
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'

function ListingListImageCarousel({ record }: { record: ListingsResponse }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % record.images.length)
    }
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + record.images.length) % record.images.length)
    }
  
    return (
      <div className="relative">
        <PocketBaseImage
            record={record}
            filename={record.images[currentImageIndex]}
            className="w-full h-40 md:h-60 object-cover"
            width={300}
            height={300}
            alt={record.title}
            src="/placeholder.png"
        />
        {record.images.length > 1 && (
          <React.Fragment>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {record.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </ React.Fragment>
        )}
      </div>
    )
  }

export default ListingListImageCarousel