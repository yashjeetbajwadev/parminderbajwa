import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CollectionRecords, CollectionResponses } from '@/types/pocketbase';
import { ListResult, RecordModel } from 'pocketbase';

// Create contexts for data
const ListDataContext = createContext<any>(null);
const SingleDataContext = createContext<any>(null);

interface DataFetcherProps<T extends keyof CollectionRecords> {
  collectionName: T;
  id?: string;
  children: ReactNode;
}

export function DataFetcher<T extends keyof CollectionRecords>({ collectionName, id, children }: DataFetcherProps<T>): JSX.Element {
  const [data, setData] = useState<ListResult<CollectionResponses[T]> | RecordModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const url = id 
          ? `/api/data?collection=${collectionName}&id=${id}`
          : `/api/data?collection=${collectionName}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [collectionName, id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

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