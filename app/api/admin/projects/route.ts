import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the user is an admin
        const currentUser = await prisma.user.findUnique({
            where: { clerkId: userId }
        });

        if (!currentUser || currentUser.role !== "admin") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const body = await req.json();
        const { title, clientId, status, progress } = body;

        if (!title || !clientId) {
            return new NextResponse("Missing title or client", { status: 400 });
        }

        const project = await prisma.project.create({
            data: {
                title,
                clientId,
                status: status || "Planning",
                progress: progress || 0,
            }
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error("[PROJECT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
