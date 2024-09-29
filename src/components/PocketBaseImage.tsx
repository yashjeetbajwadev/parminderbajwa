import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface PocketBaseImageProps extends Omit<ImageProps, 'src'> {
  record: { id: string; collectionId: string }
  filename: string
  thumb?: string
  modalWidth?: number
  modalHeight?: number
}

export default function PocketBaseImage({
  record,
  filename,
  thumb,
  modalWidth = 800,
  modalHeight = 600,
  ...props
}: PocketBaseImageProps) {
  const [imageUrl, setImageUrl] = useState("/placeholder.png")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      if (!record.id || !record.collectionId || !filename) {
        console.error('Missing required parameters for image fetch')
        return
      }

      try {
        let url = `/api/image?recordId=${record.id}&collectionId=${record.collectionId}&filename=${encodeURIComponent(filename)}`
        if (thumb) {
          url += `&thumb=${encodeURIComponent(thumb)}`
        }

        const response = await fetch(url)
        if (response.ok) {
          const blob = await response.blob()
          const objectUrl = URL.createObjectURL(blob)
          setImageUrl(objectUrl)
        } else {
          console.error('Failed to fetch image', await response.text())
        }
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }

    fetchImage()
  }, [record, filename, thumb])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full h-full">
        <Image
          {...props}
          src={imageUrl}
          alt={props.alt || `${record.id}_${filename}`}
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw]">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={imageUrl}
            alt={props.alt || `${record.id}_${filename}`}
            width={modalWidth}
            height={modalHeight}
            className="object-contain max-w-full max-h-[80vh]"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}