import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Public endpoint — used by the brief wizard (no auth required)
// We only generate a signature; the actual upload goes directly to Cloudinary from the client
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const folder = body.folder || "brocodestudio/briefs";

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      folder,
    });
  } catch (error) {
    console.error("[upload-signature] Error:", error);
    return NextResponse.json({ error: "Failed to generate upload signature." }, { status: 500 });
  }
}
