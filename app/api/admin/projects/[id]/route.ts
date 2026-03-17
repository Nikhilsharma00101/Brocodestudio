import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (dbUser?.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { progress, status } = body;

        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                progress,
                status,
            },
        });

        return NextResponse.json({ success: true, project: updatedProject });

    } catch (error: any) {
        console.error("Update API Error:", error);
        return NextResponse.json(
            { error: "Failed to update project." },
            { status: 500 }
        );
    }
}
