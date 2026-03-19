import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminProjectDetail from "@/components/admin/AdminProjectDetail";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Secure Admin Check
    const dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
    });
    if (dbUser?.role !== 'admin') {
        redirect("/dashboard");
    }

    // Fetch the project and ALL phase 4 related data
    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            assets: {
                orderBy: { createdAt: 'desc' }
            },
            demoScreenshots: {
                orderBy: { createdAt: 'desc' }
            },
            revisions: {
                orderBy: { createdAt: 'desc' }
            },
            brief: {
                select: { id: true, name: true, email: true, quotedPrice: true }
            },
            client: {
                select: { id: true, name: true, email: true }
            }
        }
    });

    if (!project) {
        return (
            <div className="text-center p-20 text-white/50 border border-white/5 rounded-3xl bg-white/5">
                <h3 className="text-2xl font-bold font-brand mb-2">Project not found in Registry.</h3>
            </div>
        );
    }

    return <AdminProjectDetail project={project} assets={project.assets} />;
}

