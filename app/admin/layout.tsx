import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Verify Role is Admin
    const dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (dbUser?.role !== 'admin') {
        // Standard clients trying to access /admin get redirected to their dashboard
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 mb-20 relative overflow-hidden">
            {/* Ambient Backgrounds */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-accent/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 noise-bg" />
            </div>

            <div className="max-w-7xl mx-auto relative z-0">
                <header className="mb-12 border-b border-border pb-6 flex justify-between items-center glass-card px-8 py-4 rounded-3xl mt-4 max-w-7xl mx-auto top-6 sticky z-50">
                    <div>
                        <h1 className="text-3xl font-brand font-bold tracking-tight text-gradient">Nexus Command Center</h1>
                        <p className="text-muted-foreground text-sm mt-1 uppercase tracking-widest font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Admin Control Panel
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="/dashboard" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all text-sm font-semibold border border-transparent hover:border-border">
                            Back to Client Portal
                        </a>
                        <div className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-sm font-bold tracking-widest hidden md:block shadow-sm">
                            ADMIN
                        </div>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-10 h-10 border-2 border-accent/20"
                                }
                            }}
                        />
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
