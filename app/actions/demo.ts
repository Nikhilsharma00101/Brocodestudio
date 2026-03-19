"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─────────────────────────────────────────────────────────
// SAVE DEMO URL  (admin sets the staging/preview link)
// ─────────────────────────────────────────────────────────
export async function saveDemoUrl(projectId: string, demoUrl: string) {
    try {
        await prisma.project.update({
            where: { id: projectId },
            data: {
                demoUrl: demoUrl.trim() || null,
                // Flip status to Review automatically when a demo URL is set
                reviewStatus: demoUrl.trim() ? "PENDING_REVIEW" : "PENDING_REVIEW",
            },
        });

        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("[saveDemoUrl] Error:", error);
        return { success: false, error: "Failed to save demo URL." };
    }
}

// ─────────────────────────────────────────────────────────
// ADD DEMO SCREENSHOT  (called after Cloudinary upload)
// ─────────────────────────────────────────────────────────
export async function addDemoScreenshot(
    projectId: string,
    url: string,
    publicId: string,
    caption: string
) {
    try {
        const screenshot = await prisma.demoAsset.create({
            data: { projectId, url, publicId, caption: caption.trim() || null },
        });

        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true, screenshot };
    } catch (error) {
        console.error("[addDemoScreenshot] Error:", error);
        return { success: false, error: "Failed to save screenshot." };
    }
}

// ─────────────────────────────────────────────────────────
// DELETE DEMO SCREENSHOT
// ─────────────────────────────────────────────────────────
export async function deleteDemoScreenshot(screenshotId: string, projectId: string) {
    try {
        await prisma.demoAsset.delete({ where: { id: screenshotId } });
        revalidatePath(`/admin/projects/${projectId}`);
        return { success: true };
    } catch (error) {
        console.error("[deleteDemoScreenshot] Error:", error);
        return { success: false, error: "Failed to delete screenshot." };
    }
}
