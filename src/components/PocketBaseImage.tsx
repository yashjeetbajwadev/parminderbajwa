import { getPocketBaseInstance } from "@/lib/pocketbase";
import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface FileOptions {
  [key: string]: any;
}

interface PocketBaseImageProps extends ImageProps {
  record: { [key: string]: any };
  filename: string;
  queryParams?: FileOptions;
}

const getPocketBaseUrl = (
  record: { [key: string]: any },
  filename: string,
  queryParams?: FileOptions
): string => {
  const pb = getPocketBaseInstance();
  return pb.getFileUrl(record, filename);
};

const PocketBaseImage: React.FC<PocketBaseImageProps> = ({
    record,
    filename,
    queryParams,
    width = 300,
    height = 300,
    ...props
  }) => {
    const [imageUrl, setImageUrl] = useState("/placeholder.png");
  
    useEffect(() => {
      const url = getPocketBaseUrl(record, filename, queryParams);
      setImageUrl(url);
    }, [record, filename, queryParams]);
  
    return (
        <Image
        {...props}
        src={imageUrl || "/placeholder.png"}
        alt={record?.title + "_" + filename}
        width={width}   // Ensure width is passed
        height={height} // Ensure height is passed
      />
    );
  };

export default PocketBaseImage;
