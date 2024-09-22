import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CollectionRecords, CollectionResponses } from '@/types/pocketbase';
import { ListResult, RecordFullListOptions, RecordModel } from 'pocketbase';
import Loading from './custom/Loading';
import ErrorComponent from './custom/Error';
import { fetchDataFromAPI } from '@/lib/utils';

// Create contexts for data
const ListDataContext = createContext<any>(null);
const SingleDataContext = createContext<any>(null);

interface DataFetcherProps<T extends keyof CollectionRecords> {
  collectionName: T;
  id?: string;
  children: ReactNode;
  options?: RecordFullListOptions;
}

export function DataFetcher<T extends keyof CollectionRecords>({ collectionName, id, children, options }: DataFetcherProps<T>): JSX.Element {
  const [data, setData] = useState<ListResult<CollectionResponses[T]> | RecordModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataFromAPI<T>({ setIsLoading, id, collectionName, options, setData, setError });
  }, [collectionName, id, options]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent message={error} />;
  if (!data) return <ErrorComponent message="No data found" />;

  const ContextProvider = id ? SingleDataContext.Provider : ListDataContext.Provider;

  return (
    <ContextProvider value={data}>
      {typeof children === 'function' ? (children as (data: any) => JSX.Element)(data) : children}
    </ContextProvider>
  );
}

// Custom hooks to use data contexts
export function useListData() {
  return useContext(ListDataContext);
}

export function useSingleData() {
  return useContext(SingleDataContext);
}