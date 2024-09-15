import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CollectionRecords, CollectionResponses } from '@/types/pocketbase';
import { ListResult } from 'pocketbase';

// Create context for data
const DataContext = createContext<any>(null);

interface DataFetcherProps<T extends keyof CollectionRecords> {
  collectionName: T;
  children: ReactNode;
}

export default function DataFetcher<T extends keyof CollectionRecords>({ collectionName, children }: DataFetcherProps<T>): JSX.Element {
  const [data, setData] = useState<ListResult<CollectionResponses[T]> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/data?collection=${collectionName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: ListResult<CollectionResponses[T]> = await response.json();
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
  }, [collectionName]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <DataContext.Provider value={data}>
      {typeof children === 'function' ? (children as (data: ListResult<CollectionResponses[T]>) => JSX.Element)(data) : children}
    </DataContext.Provider>
  );
}

// Custom hook to use data context
export function useData() {
  return useContext(DataContext);
}
