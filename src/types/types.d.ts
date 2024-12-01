export type ValueOf<T> = T[keyof T];

export type serverSearchParamType = { [key: string]: string | string[] | undefined };

type imageRecordType = {
    title: string
    images: string[]
  } & BaseSystemFields
  
