import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PocketBaseImage from "@/components/PocketBaseImage";
import { cn, isServer } from "@/lib/utils";
import { imageRecordType } from "@/types/types";

const ListingListImageCarousel = ({
  record,
  ImageClassName,
  openDialogOnClick = false,
}: {
  record: imageRecordType;
  ImageClassName?: string;
  openDialogOnClick?: boolean;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!record.images.length) {
    record.images = ["placeholder.png"];
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setOpenDialog(true);
  };

  return (
    <React.Fragment>
      <Carousel className={cn("w-full")} opts={{ loop: true }}>
        <CarouselContent>
          {record.images.map((image: string, index: number) => (
            <CarouselItem key={index}>
              <button
                onClick={() => handleImageClick(index)}>
                <PocketBaseImage
                  record={record}
                  filename={image}
                  className={cn(ImageClassName)}
                  width={isServer() ? 1920 : window.innerWidth}
                  height={isServer() ? 1080 : window.innerWidth}
                  alt={`${record.title} - Image ${index + 1}`}
                  style={{ aspectRatio: "16 / 9" }}
                />
              </button>
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
      {openDialogOnClick && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 flex items-center justify-center overflow-hidden bg-white">
            <Carousel
              className="w-full h-full"
              opts={{ startIndex: selectedImageIndex }}
            >
              <CarouselContent className="w-full h-full">
                {record.images.map((image: string, index: number) => (
                  <CarouselItem
                    key={index}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-full h-full p-10 my-10">
                      <div
                        className="relative w-full h-full"
                        style={{ aspectRatio: "16 / 9" }}
                      >
                        <PocketBaseImage
                          record={record}
                          filename={image}
                          fill
                          className="object-contain max-w-full max-h-full"
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                          alt={`${record.title} - Image ${index + 1}`}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
            </Carousel>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default ListingListImageCarousel;
