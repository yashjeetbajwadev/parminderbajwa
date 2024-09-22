'use client';
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { CollectionRecords, CollectionResponses } from '@/types/pocketbase';
import { ListResult, RecordFullListOptions, RecordModel } from 'pocketbase';
import Loading from './custom/Loading';
import ErrorComponent from './custom/Error';
import { fetchDataFromAPI } from '@/lib/utils';

type ListDataType<T extends keyof CollectionRecords> = ListResult<CollectionResponses[T]>;
type SingleDataType<T extends keyof CollectionRecords> = ListResult<CollectionResponses[T]>;
type DataType<T extends keyof CollectionRecords> = ListDataType<T> | SingleDataType<T>;

const ListDataContext = createContext<ListDataType<any> | null>(null);
const SingleDataContext = createContext<SingleDataType<any> | null>(null);

type DataFetcherProps<T extends keyof CollectionRecords> = {
  collectionName: T;
  id?: string;
  children: ReactNode | ((data: DataType<T>) => JSX.Element);
  options?: RecordFullListOptions;
}

export function DataFetcher<T extends keyof CollectionRecords>({ 
  collectionName, 
  id, 
  children, 
  options 
}: DataFetcherProps<T>): JSX.Element {
  const [data, setData] = useState<DataType<T> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDataFromAPI<T>({ 
      setIsLoading, 
      id, 
      collectionName, 
      options, 
      setData: (newData) => setData(newData as DataType<T> | null), 
      setError 
    });
  }, [collectionName, id, options]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent message={error} />;
  if (!data) return <ErrorComponent message="No data found" />;

  if (id) {
    return (
      <SingleDataContext.Provider value={data as SingleDataType<any>}>
        {typeof children === 'function' ? (children as (data: SingleDataType<any>) => JSX.Element)(data as SingleDataType<any>) : children}
      </SingleDataContext.Provider>
    );
  } else {
    return (
      <ListDataContext.Provider value={data as ListDataType<T>}>
        {typeof children === 'function' ? (children as (data: ListDataType<T>) => JSX.Element)(data as ListDataType<T>) : children}
      </ListDataContext.Provider>
    );
  }
}

// Custom hooks to use data contexts
export function useListData<T extends keyof CollectionRecords>(): ListDataType<T> | null {
  return useContext(ListDataContext) as ListDataType<T> | null;
}

export function useSingleData<T extends keyof CollectionRecords>(): SingleDataType<T> | null {
  return useContext(SingleDataContext);
}