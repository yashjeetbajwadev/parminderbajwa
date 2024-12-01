import { NextRequest, NextResponse } from "next/server";
import { getPocketBaseInstance } from "@/lib/pocketbase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const recordId = searchParams.get("recordId");
  const collectionId = searchParams.get("collectionId");
  const filename = searchParams.get("filename");
  const thumb = searchParams.get("thumb");

  if (!recordId || !collectionId || !filename) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const pb = getPocketBaseInstance();

  try {
    // Construct the file URL directly
    let fileUrl = `api/files/${collectionId}/${recordId}/${encodeURIComponent(
      filename
    )}`;
    fileUrl = pb.buildUrl(fileUrl);
    // Add thumb parameter if provided
    if (thumb) {
      fileUrl += `?thumb=${encodeURIComponent(thumb)}`;
    }

    // Fetch the image file using pb.send
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      console.error("Failed to fetch image:", JSON.stringify(fileResponse));
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 500 }
      );
    }

    const imageData = await fileResponse.arrayBuffer();

    // Return the image with appropriate headers
    return new NextResponse(imageData, {
      headers: {
        "Content-Type":
          fileResponse.headers.get("Content-Type") ||
          "application/octet-stream",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
