import { CollectionRecords, CollectionResponses, Collections } from "@/types/pocketbase";
import { type ClassValue, clsx } from "clsx";
import { ListResult, RecordFullListOptions, RecordModel } from "pocketbase";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCollectionData<T extends keyof CollectionRecords>({ collectionName, id, options }: getCollectionDataProps<T>): Promise<Response> {
  const optionsString = new URLSearchParams(options).toString();
  const url = id
    ? `/api/data?collection=${collectionName}&id=${id}&${optionsString}`
    : `/api/data?collection=${collectionName}&${optionsString}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response;
}

export async function fetchDataFromAPI<T extends keyof CollectionRecords>({
  collectionName,
  id,
  options,
  setData,
  setError,
  setIsLoading,
}: FetchDataFromAPIProps<T>): Promise<void> {
  try {
    setIsLoading?.(true);
    const response = await getCollectionData<T>({ collectionName, id, options });
    const result = await response.json();
    setData?.(result);
    setError?.(null);
  } catch (err) {
    setError?.(err instanceof Error ? err.message : "An unknown error occurred");
    setData?.(null);
  } finally {
    setIsLoading?.(false);
  }
}

export function formatSinglePage(collectionName: keyof CollectionRecords, id: string, title: string) {
  return `${collectionName}/${encodeURI(title)}?object=${encodeURI(id)}`;
}

export function ValidDate(date: string) {
  return new Date(date).toString() !== "Invalid Date";
}
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Types at the bottom of the file
type FetchDataFromAPIProps<T extends keyof CollectionRecords> = {
  collectionName: T;
  options?: RecordFullListOptions;
  id?: string | undefined;
  setData?: React.Dispatch<
    React.SetStateAction<
      ListResult<CollectionResponses[T]> | RecordModel | null
    >
  >;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
};

type getCollectionDataProps<T extends keyof CollectionRecords> = {
  collectionName: T;
  id?: string;
  options?: RecordFullListOptions;
};

