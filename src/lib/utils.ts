import { CollectionRecords, CollectionResponses } from "@/types/pocketbase";
import { serverSearchParamType, ValueOf } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { ListOptions, ListResult, RecordOptions } from "pocketbase";
import { twMerge } from "tailwind-merge";
import { getDataHandleRequest } from "./handlers/getData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NZD",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const defaultListCollectionOptions: ListOptions = {
  limit: 6,
  perPage: 6,
  page: 1,
  sort: "-created",
  order: "desc",
};

export async function getCollectionData<T extends keyof CollectionRecords>({
  collectionName,
  options,
}: CommonAPIProps<T>): Promise<ListResult<CollectionResponses[T]>> {
  options = { ...defaultListCollectionOptions, ...options };
  const optionsString = new URLSearchParams(options).toString();
  if (isServer()) {
    const response = await getDataHandleRequest(
      collectionName,
      undefined,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } else {
    let url = `/api/data?collection=${collectionName}`;
    if (optionsString) {
      url += `&${optionsString}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
}
export async function getCollectionDataWithId<
  T extends keyof CollectionRecords,
>({
  collectionName,
  id,
  options,
}: CommonAPIPropsWithId<T>): Promise<CollectionResponses[T]> {
  const optionsString = new URLSearchParams(options).toString();
  if (isServer()) {
    const response = await getDataHandleRequest(collectionName, id, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } else {
    let url = `/api/data?collection=${collectionName}&id=${id}`;
    if (optionsString) {
      url += `&${optionsString}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
}
async function abstractedAPICall<T extends keyof CollectionRecords>(
  apiFunction: (props: any) => Promise<APIResult<T>>,
  props: CommonAPIProps<T> & { id?: string },
  callbacks: {
    setData?: (data: APIResult<T> | null) => void;
    setError?: (error: string | null) => void;
    setIsLoading?: (isLoading: boolean) => void;
  }
): Promise<void> {
  const { setData, setError, setIsLoading } = callbacks;
  try {
    setIsLoading?.(true);
    const result = await apiFunction(props);
    setData?.(result);
    setError?.(null);
  } catch (err) {
    setError?.(
      err instanceof Error ? err.message : "An unknown error occurred"
    );
    setData?.(null);
  } finally {
    setIsLoading?.(false);
  }
}
export async function fetchDataFromAPI<T extends keyof CollectionRecords>({
  collectionName,
  id,
  options,
  setData,
  setError,
  setIsLoading,
}: FetchDataFromAPIProps<T>): Promise<void> {
  const apiFunction = id ? getCollectionDataWithId : getCollectionData;
  await abstractedAPICall<T>(
    apiFunction as (props: any) => Promise<APIResult<T>>,
    { collectionName, id, options },
    { setData, setError, setIsLoading }
  );
}
export function formatSinglePage(
  collectionName: keyof CollectionRecords,
  id: string,
  title: string
) {
  return `/${collectionName}/${encodeURIComponent(title)}/${encodeURIComponent(id)}`;
}
export function validDate(date: string) {
  return new Date(date).toString() !== "Invalid Date";
}
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const isServer = () => typeof window === "undefined";

export const getSearchParams = (
  searchParam: serverSearchParamType,
  key: string
) => {
  return searchParam[key] as string | undefined;
};

export type CommonAPIProps<T extends keyof CollectionRecords> = {
  collectionName: T;
  options?: ListOptions;
};
export type CommonAPIPropsWithId<T extends keyof CollectionRecords> =
  CommonAPIProps<T> & { id: string };

export type APIResult<T extends keyof CollectionRecords> =
  | ListResult<CollectionResponses[T]>
  | ValueOf<CollectionResponses>;

export type FetchDataFromAPIProps<T extends keyof CollectionRecords> =
  CommonAPIProps<T> & {
    id?: string;
    setData?: (data: APIResult<T> | null) => void;
    setError?: (error: string | null) => void;
    setIsLoading?: (isLoading: boolean) => void;
  };
