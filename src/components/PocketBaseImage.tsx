import { BaseSystemFields } from "@/types/pocketbase";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface PocketBaseImageProps extends Omit<ImageProps, 'src'> {
  record: BaseSystemFields
  filename: string
  thumb?: string
}

export default function PocketBaseImage({
  record,
  filename,
  thumb,
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
    <Image
      {...props}
      src={imageUrl}
      alt={props.alt || `${record.id}_${filename}`}
      onClick={() => setIsOpen(true)}
      className="cursor-pointer"
    />
  )
}