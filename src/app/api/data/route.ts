import { getDataHandleRequest } from "@/lib/handlers/getData";
import { CollectionRecords } from "@/types/pocketbase";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection") as keyof CollectionRecords;
  const id = searchParams.get("id");
  if (!collection) {
    return NextResponse.json(
      { error: "Missing collection query parameter" },
      { status: 400 }
    );
  }

  return getDataHandleRequest(collection, id ?? undefined);
}
