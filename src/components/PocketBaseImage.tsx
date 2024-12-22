import { cn } from "@/lib/utils";
import { BaseSystemFields } from "@/types/pocketbase";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface PocketBaseImageProps extends Omit<ImageProps, 'src'> {
  record: BaseSystemFields
  filename: string
  urlProps?: Record<string, string>
}

export default function PocketBaseImage({
  record,
  filename,
  urlProps,
  ...props
}: PocketBaseImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  let url = `/api/image?recordId=${record.id}&collectionId=${record.collectionId}&filename=${encodeURIComponent(filename)}`
  if (urlProps) {
    url += `&${new URLSearchParams(urlProps).toString()}`
  }
  const [imageUrl, setImageUrl] = useState(url ?? "/placeholder.png")

  useEffect(() => {
    const fetchImage = async () => {
      if (!record.id || !record.collectionId || !filename) {
        console.error('Missing required parameters for image fetch')
        return
      }

      try {
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
  }, [record, filename, url])


  return (
    <Image
      {...props}
      src={imageUrl}
      alt={props.alt || `${record.id}_${filename}`}
      onClick={() => setIsOpen(true)}
      className={cn("cursor-pointer object-contain h-full w-full md:object-scale-down", props.className)}
    />
  )
}