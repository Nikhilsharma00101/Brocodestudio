import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Optional: Sync user if webhook failed or was delayed
    let dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

    const user = await currentUser();
    if (user) {
        const email = user.emailAddresses[0]?.emailAddress;
        const name = [user.firstName, user.lastName].filter(Boolean).join(" ");

        dbUser = await prisma.user.upsert({
            where: { clerkId: userId },
            update: { email: email, name: name || null },
            create: { clerkId: userId, email: email, name: name || null, role: 'client' }
        });
    }

    const isAdmin = dbUser?.role === 'admin';

    return (
        <div className="min-h-screen bg-secondary text-foreground selection:bg-primary/20 selection:text-primary relative overflow-hidden">
            {/* Subtle Light Texture */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 noise-bg" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
            </div>

            {/* Sleek Light Navigation Rail */}
            <header className="sticky top-0 z-50 w-full glass border-b-0 border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-2xl font-brand font-bold tracking-tight text-slate-800 group cursor-pointer transition-colors hover:text-indigo-600">
                            The Nexus<span className="text-indigo-500">.</span>
                        </h1>
                        <p className="hidden md:block uppercase tracking-[0.2em] text-[10px] text-slate-500 font-semibold">Client Operations</p>
                    </div>
                    <div className="flex items-center gap-6">
                        {isAdmin && (
                            <a href="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm hover:shadow-md text-[10px] uppercase tracking-widest font-bold transition-all duration-300">
                                Admin Protocol
                            </a>
                        )}
                        <div className="relative border border-slate-200 bg-white rounded-full p-0.5 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-300">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-8 h-8 rounded-full"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-6 md:p-12 relative z-10 min-h-[calc(100vh-5rem)]">
                {children}
            </main>
        </div>
    );
}
