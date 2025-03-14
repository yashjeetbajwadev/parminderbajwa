import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import PocketBaseImage from "@/components/PocketBaseImage";
import { cn } from "@/lib/utils";
import { imageRecordType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

type ListingListImageCarouselProps = {
  record: imageRecordType;
  ImageClassName?: string;
  openDialogOnClick?: boolean;
  thumbs?: string;
};

type CarouselComponentProps = {
  record: imageRecordType;
  handleImageClick: (index: number) => void;
  ImageClassName?: string;
  startIndex?: number;
  id: string;
  thumbs?: string;
};

type CarouselContentComponentProps = {
  record: imageRecordType;
  handleImageClick: (index: number) => void;
  ImageClassName?: string;
  curentSlide: number;
  id: string;
  thumbs?: string;
};

export const ListingListImageCarousel = ({
  record,
  ImageClassName,
  openDialogOnClick = false,
  thumbs,
}: ListingListImageCarouselProps) => {
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
      <CarouselComponent
        record={record}
        handleImageClick={handleImageClick}
        ImageClassName={ImageClassName}
        id={"ListingListImageCarousel" + record.id}
        thumbs={thumbs}
      />
      {openDialogOnClick && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-[90vw] max-h-[90vh] p-4 flex items-center justify-center overflow-hidden bg-white">
            <VisuallyHidden>
              <DialogTitle>{record.title}</DialogTitle>
              <DialogDescription>{record.description}</DialogDescription>
            </VisuallyHidden>
            <CarouselComponent
              record={record}
              handleImageClick={handleImageClick}
              ImageClassName={ImageClassName}
              startIndex={selectedImageIndex}
              id={"ListingListImageCarouselDialog" + record.id}
              thumbs={thumbs}
            />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

const CarouselComponent = ({
  record,
  handleImageClick,
  ImageClassName,
  startIndex = 0,
  id,
  thumbs,
}: CarouselComponentProps) => {
  const [currentSlide, setCurrentSlide] = useState(startIndex ?? 0);
  return (
    <Carousel className="w-full h-full" opts={{ startIndex }}>
      <CarouselContentComponent
        record={record}
        handleImageClick={handleImageClick}
        ImageClassName={ImageClassName}
        curentSlide={currentSlide}
        id={id + "CarouselComponent" + record.id}
        thumbs={thumbs}
      />
      {record.images.length > 1 && (
        <React.Fragment>
          <CarouselPrevious
            className="absolute transform -translate-y-1/2 left-2 top-1/2"
            buttonevent="Listing Image Carousel Previous"
            handleClick={() => {
              setCurrentSlide(
                (currentSlide - 1 + record.images.length) % record.images.length
              );
            }}
          />
          <CarouselNext
            buttonevent="Listing Image Carousel Next"
            className="absolute transform -translate-y-1/2 right-2 top-1/2"
            handleClick={() =>
              setCurrentSlide((currentSlide + 1) % record.images.length)
            }
          />
        </React.Fragment>
      )}
    </Carousel>
  );
};

const CarouselContentComponent = ({
  record,
  handleImageClick,
  ImageClassName,
  curentSlide,
  thumbs,
}: CarouselContentComponentProps) => {
  let urlProps: Record<string, string> = {};
  if (thumbs) {
    urlProps = { thumb: thumbs };
  }
  return (
    <CarouselContent>
      {record.images.map((image: string, index: number) => (
        <CarouselItem
          key={"item" + index}
          id={record.id + "item" + index}
          data-index={curentSlide}
        >
          {index < 2 || curentSlide > 0 ? (
            <Button
              type="button"
              buttonevent="Listing Image Click"
              className="flex w-full h-full p-0 overflow-hidden rounded-lg bg-inherit hover:bg-inherit"
              onClick={() => handleImageClick(index)}
            >
              <PocketBaseImage
                record={record}
                filename={image}
                className={cn(
                  "justify-center h-full w-full object-cover rounded-lg",
                  ImageClassName
                )}
                width={1920}
                height={1080}
                alt={`${record.title} - Image ${index + 1}`}
                urlProps={urlProps}
              />
            </Button>
          ) : null}
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

export { CarouselContentComponent };
