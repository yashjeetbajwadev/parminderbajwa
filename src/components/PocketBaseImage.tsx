import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface PocketBaseImageProps extends Omit<ImageProps, 'src'> {
  record: { id: string; collectionId: string };
  filename: string;
  thumb?: string;
}

const PocketBaseImage: React.FC<PocketBaseImageProps> = ({
  record,
  filename,
  thumb,
  width = 300,
  height = 300,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState("/placeholder.png");
  
  useEffect(() => {
    const fetchImage = async () => {
      if (!record.id || !record.collectionId || !filename) {
        console.error('Missing required parameters for image fetch');
        return;
      }
  
      try {
        let url = `/api/image?recordId=${record.id}&collectionId=${record.collectionId}&filename=${encodeURIComponent(filename)}`;
        if (thumb) {
          url += `&thumb=${encodeURIComponent(thumb)}`;
        }
  
        const response = await fetch(url);
        if (response.ok) {
          // Get the image data as a blob
          const blob = await response.blob();
  
          // Create an object URL from the blob and set it to the state
          const objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl); 
        } else {
          console.error('Failed to fetch image', await response.text());
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
  
    fetchImage();
  }, [record, filename, thumb]);

  return (
    <Image
      {...props}
      src={imageUrl}
      alt={props.alt || `${record.id}_${filename}`}
      width={width}
      height={height}
    />
  );
};

export default PocketBaseImage;