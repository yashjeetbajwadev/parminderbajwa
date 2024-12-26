import { NextRequest, NextResponse } from "next/server";
import { getPocketBaseInstance } from "@/lib/pocketbase";
import path from "path";
import fs from "fs";

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
    let fileUrl = `api/files/${collectionId}/${recordId}/${encodeURIComponent(filename)}`;
    fileUrl = pb.buildUrl(fileUrl);

    // Add thumb parameter if provided
    if (thumb) {
      fileUrl += `?thumb=${encodeURIComponent(thumb)}`;
    }

    // Fetch the image file using pb.send
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      console.error("Failed to fetch image:", JSON.stringify(fileResponse));
      const placeholderPath = path.join(
        process.cwd(),
        "public",
        "placeholder.png"
      );

      // Read the placeholder file
      const placeholderBuffer = await fs.promises.readFile(placeholderPath);

      // Create File object
      const file = new File([placeholderBuffer], "placeholder.png", {
        type: "image/png",
      });

      // Convert File to Response
      return new Response(file.stream(), {
        headers: {
          "Content-Type": file.type,
          "Content-Disposition": `inline; filename="${file.name}"`,
        },
      });
    }

    const imageBuffer = Buffer.from(await fileResponse.arrayBuffer());
    const contentType =
      fileResponse.headers.get("Content-Type") ?? "application/octet-stream";

    // Create File object
    const file = new File([imageBuffer], filename, { type: contentType });

    // Convert File to Response
    return new Response(file.stream(), {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `inline; filename="${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
