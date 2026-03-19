"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

/**
 * SIMULATED PAYMENT ACTION (DEMO MODE)
 * In a real app, this would be handled by Stripe Webhooks.
 */
export async function simulatePayment(projectId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const user = await prisma.user.findUnique({ where: { clerkId: userId } });
        if (!user) return { success: false, error: "User not found." };

        const project = await prisma.project.findUnique({ 
            where: { id: projectId },
            include: { brief: true }
        });
        
        if (!project || project.clientId !== user.id)
            return { success: false, error: "Project not found." };

        // Update project to Unlocked and set status to Completed
        await prisma.project.update({
            where: { id: projectId },
            data: { 
                isUnlocked: true,
                status: "Completed",
                progress: 100
            },
        });

        revalidatePath(`/dashboard/vault`);
        revalidatePath(`/dashboard/project/${projectId}`);
        
        return { success: true };
    } catch (error) {
        console.error("[simulatePayment] Error:", error);
        return { success: false, error: "Payment simulation failed." };
    }
}
