import {  NextResponse } from "next/server";
import { getPocketBaseInstance } from "@/lib/pocketbase";
import PocketBase, { ListResult, RecordOptions } from "pocketbase";
import { CollectionRecords, CollectionResponses } from "@/types/pocketbase";

export async function getDataHandleRequest<T extends keyof CollectionRecords>(
  collectionName: T,
  id?: string,
  options?: RecordOptions
) {
  const pb: PocketBase = getPocketBaseInstance();

  try {
    if (id) {
      // Fetch a single record
      const record = await pb.collection(collectionName).getOne(id, options);
      return NextResponse.json(record);
    } else {
      // Fetch a list of records
      const records: ListResult<CollectionResponses[T]> = await pb
        .collection(collectionName)
        .getList(1, 20, options);
      return NextResponse.json(records);
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
