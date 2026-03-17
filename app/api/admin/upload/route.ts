import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

// Increase body size limit for file uploads in Next.js App Router
export const maxDuration = 60; // Set max duration for API route (Vercel specific)

export async function POST(req: NextRequest) {
    try {
        const { userId, sessionClaims } = await auth();

        // Basic Security Check: Verify user is admin
        // In production, you would check sessionClaims or DB for actual role
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (dbUser?.role !== "admin") {
            return NextResponse.json({ error: "Forbidden. Admin access required." }, { status: 403 });
        }

        const body = await req.json();
        const { file, fileName, projectId, assetName } = body;

        if (!file || !projectId || !assetName) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Determine resource type based on likely file content
        const isPdf = typeof file === 'string' && file.includes('application/pdf');
        const isVideo = typeof file === 'string' && file.includes('video/');
        const resourceType = isPdf || isVideo ? 'auto' : 'image';

        // 1. Upload to Cloudinary
        const cloudinaryResponse = await uploadToCloudinary(file, undefined, resourceType);

        // 2. Save Asset to Database
        const asset = await prisma.asset.create({
            data: {
                name: assetName,
                url: cloudinaryResponse.secure_url,
                type: isPdf ? 'DOCUMENT' : isVideo ? 'VIDEO' : 'IMAGE',
                projectId: projectId,
            },
        });

        return NextResponse.json({ success: true, asset });

    } catch (error: any) {
        console.error("Upload API Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to process upload." },
            { status: 500 }
        );
    }
}
