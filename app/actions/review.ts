"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// ─────────────────────────────────────────────────────────
// APPROVE DEMO  (client says: looks good, ready to pay)
// ─────────────────────────────────────────────────────────
export async function approveDemo(projectId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user) return { success: false, error: "User not found." };

        const project = await prisma.project.findUnique({ where: { id: projectId } });
        if (!project || project.clientId !== user.id)
            return { success: false, error: "Project not found." };

        await prisma.project.update({
            where: { id: projectId },
            data: { reviewStatus: "APPROVED" },
        });

        revalidatePath(`/dashboard/project/${projectId}/review`);
        revalidatePath(`/dashboard/vault`);
        return { success: true };
    } catch (error) {
        console.error("[approveDemo] Error:", error);
        return { success: false, error: "Failed to approve demo." };
    }
}

// ─────────────────────────────────────────────────────────
// REQUEST REVISION  (client submits feedback text)
// ─────────────────────────────────────────────────────────
export async function requestRevision(projectId: string, feedback: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user) return { success: false, error: "User not found." };

        const project = await prisma.project.findUnique({ where: { id: projectId } });
        if (!project || project.clientId !== user.id)
            return { success: false, error: "Project not found." };

        if (!feedback.trim())
            return { success: false, error: "Please describe what changes you need." };

        // Create the revision record + update review status
        await prisma.$transaction([
            prisma.revision.create({
                data: {
                    projectId,
                    feedback: feedback.trim(),
                    status: "OPEN",
                },
            }),
            prisma.project.update({
                where: { id: projectId },
                data: {
                    reviewStatus: "CHANGES_REQUESTED",
                    clientFeedback: feedback.trim(),
                },
            }),
        ]);

        revalidatePath(`/dashboard/project/${projectId}/review`);
        return { success: true };
    } catch (error) {
        console.error("[requestRevision] Error:", error);
        return { success: false, error: "Failed to submit revision." };
    }
}
