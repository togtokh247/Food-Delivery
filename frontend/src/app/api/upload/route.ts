import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename)
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );

    if (!request.body)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = await request.arrayBuffer();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      const contentType = request.headers.get("content-type") ?? "image/png";
      const base64 = Buffer.from(buffer).toString("base64");

      return NextResponse.json({
        url: `data:${contentType};base64,${base64}`,
      });
    }

    const blob = await put(filename, buffer, {
      access: "public",
      allowOverwrite: true,
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
