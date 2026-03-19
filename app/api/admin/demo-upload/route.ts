import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (dbUser?.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { file, caption, projectId } = body;

        if (!file || !projectId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Upload screenshot to Cloudinary under a demo-specific folder
        const cloudinaryResponse = await uploadToCloudinary(
            file,
            `demo-screenshots/${projectId}`,
            "image"
        );

        return NextResponse.json({
            success: true,
            url: cloudinaryResponse.secure_url,
            publicId: cloudinaryResponse.public_id,
            caption: caption ?? "",
        });
    } catch (error: unknown) {
        console.error("[demo-upload] Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Upload failed." },
            { status: 500 }
        );
    }
}
