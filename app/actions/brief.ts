"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface BriefAssetInput {
  url: string;
  publicId: string;
  description: string;
}

export interface CreateBriefInput {
  name: string;
  email: string;
  projectType: string;
  description: string;
  targetAudience: string;
  keyFeatures: string;
  budgetRange: string;
  timeline: string;
  assets: BriefAssetInput[];
}

// ─────────────────────────────────────────────────────────
// CREATE BRIEF  (called from the public wizard)
// ─────────────────────────────────────────────────────────
export async function createBrief(input: CreateBriefInput) {
  try {
    // Basic validation
    if (!input.name || !input.email || !input.projectType || !input.description) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Create brief + assets in one transaction
    const brief = await prisma.projectBrief.create({
      data: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        projectType: input.projectType,
        description: input.description.trim(),
        targetAudience: input.targetAudience?.trim() || null,
        keyFeatures: input.keyFeatures?.trim() || null,
        budgetRange: input.budgetRange,
        timeline: input.timeline,
        status: "PENDING",
        referenceAssets: {
          create: input.assets.map((a) => ({
            url: a.url,
            publicId: a.publicId,
            description: a.description?.trim() || "",
          })),
        },
      },
      include: {
        referenceAssets: true,
      },
    });

    revalidatePath("/admin/briefs");

    return { success: true, briefId: brief.id };
  } catch (error) {
    console.error("[createBrief] Error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

// ─────────────────────────────────────────────────────────
// GET ALL BRIEFS  (admin panel)
// ─────────────────────────────────────────────────────────
export async function getBriefs() {
  try {
    const briefs = await prisma.projectBrief.findMany({
      include: {
        referenceAssets: true,
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, briefs };
  } catch (error) {
    console.error("[getBriefs] Error:", error);
    return { success: false, briefs: [] };
  }
}

// ─────────────────────────────────────────────────────────
// GET SINGLE BRIEF  (admin detail view)
// ─────────────────────────────────────────────────────────
export async function getBriefById(id: string) {
  try {
    const brief = await prisma.projectBrief.findUnique({
      where: { id },
      include: {
        referenceAssets: true,
        user: true,
        project: true,
      },
    });
    return { success: true, brief };
  } catch (error) {
    console.error("[getBriefById] Error:", error);
    return { success: false, brief: null };
  }
}

// ─────────────────────────────────────────────────────────
// ACCEPT BRIEF  (admin action — creates project + user)
// ─────────────────────────────────────────────────────────
export async function acceptBrief(
  briefId: string,
  quotedPrice: number,
  adminNotes: string
) {
  try {
    const brief = await prisma.projectBrief.findUnique({ where: { id: briefId } });
    if (!brief) return { success: false, error: "Brief not found." };
    if (brief.status !== "PENDING") return { success: false, error: "Brief already processed." };

    // Find or create User by email
    let user = await prisma.user.findUnique({ where: { email: brief.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          clerkId: `pending_${brief.id}`, // placeholder until Clerk invite accepted
          email: brief.email,
          name: brief.name,
          role: "client",
        },
      });
    }

    // Update brief + create the project in one transaction
    const [, project] = await prisma.$transaction([
      prisma.projectBrief.update({
        where: { id: briefId },
        data: {
          status: "ACCEPTED",
          quotedPrice,
          adminNotes: adminNotes?.trim() || null,
          userId: user.id,
        },
      }),
      prisma.project.create({
        data: {
          title: `${brief.name}'s ${formatProjectType(brief.projectType)}`,
          description: brief.description,
          status: "Planning",
          progress: 0,
          clientId: user.id,
          briefId: brief.id,
          paymentStatus: "UNPAID",
          reviewStatus: "PENDING_REVIEW",
          isUnlocked: false,
        },
      }),
    ]);

    revalidatePath("/admin/briefs");
    revalidatePath("/admin");

    return { success: true, projectId: project.id };
  } catch (error) {
    console.error("[acceptBrief] Error:", error);
    return { success: false, error: "Failed to accept brief." };
  }
}

// ─────────────────────────────────────────────────────────
// REJECT BRIEF  (admin action)
// ─────────────────────────────────────────────────────────
export async function rejectBrief(briefId: string) {
  try {
    await prisma.projectBrief.update({
      where: { id: briefId },
      data: { status: "REJECTED" },
    });
    revalidatePath("/admin/briefs");
    return { success: true };
  } catch (error) {
    console.error("[rejectBrief] Error:", error);
    return { success: false, error: "Failed to reject brief." };
  }
}

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
function formatProjectType(type: string): string {
  const map: Record<string, string> = {
    LANDING_PAGE: "Landing Page",
    FULL_STACK: "Full Stack App",
    UI_DESIGN: "UI/UX Design",
    ECOMMERCE: "E-commerce Store",
    OTHER: "Custom Project",
  };
  return map[type] || "Project";
}
