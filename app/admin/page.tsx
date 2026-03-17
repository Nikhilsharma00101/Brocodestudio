import { User, Activity, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Project, User as PrismaUser } from "@prisma/client";
import { CreateProjectButton } from "@/components/admin/CreateProjectButton";
import Link from "next/link";

export default async function AdminPage() {
    const clients = await prisma.user.findMany({
        where: { role: 'client' }, // Show all standard clients
        include: {
            projects: {
                orderBy: { updatedAt: 'desc' },
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-8">

            <div className="flex justify-between items-end bg-card/40 border border-border/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm relative z-20">
                <div>
                    <h2 className="text-3xl font-bold font-heading mb-2 tracking-tight text-foreground">Client Roster</h2>
                    <p className="text-muted-foreground text-sm font-medium">Manage global clients and track project execution.</p>
                </div>
                <CreateProjectButton clients={clients.map(c => ({ id: c.id, name: c.name, email: c.email }))} />
            </div>

            <div className="grid grid-cols-1 gap-8">
                {clients.map((client: PrismaUser & { projects: Project[] }) => (
                    <div key={client.id} className="p-8 glass-card rounded-[2rem] hover:ring-1 hover:ring-border/50 transition-all group/client">
                        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border/60">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-subtle flex items-center justify-center border border-border shadow-sm group-hover/client:shadow-md transition-all">
                                <User className="text-muted-foreground" size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold font-brand text-foreground mb-1">{client.name || "Unnamed Client"}</h3>
                                <p className="text-muted-foreground text-sm font-medium">{client.email}</p>
                            </div>
                            <div className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-4 py-2 rounded-xl border border-border uppercase tracking-widest font-semibold shadow-inner">
                                ID: {client.id.split('-')[0]}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                                <Activity size={14} className="text-accent-foreground/50" />
                                Active Projects
                            </h4>
                            {client.projects.length === 0 ? (
                                <div className="p-10 border-2 border-dashed border-border rounded-3xl text-center bg-muted/30">
                                    <p className="text-sm text-muted-foreground italic font-medium">No projects currently assigned to this client.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {client.projects.map((project: Project) => (
                                        <div key={project.id} className="p-6 border border-border/80 rounded-[1.5rem] bg-card flex flex-col justify-between hover:bg-muted/40 transition-colors group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 duration-300">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="font-bold text-base text-foreground group-hover:text-accent-foreground transition-colors pr-2 leading-tight">{project.title}</div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm shrink-0
                                                    ${project.status === 'Completed' ? 'bg-green-100/50 text-green-700 border-green-200' :
                                                        project.status === 'Review' ? 'bg-amber-100/50 text-amber-700 border-amber-200' :
                                                            'bg-accent/10 text-accent-foreground border-accent/20'}`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <div className="flex-1 bg-muted rounded-full h-2 border border-border shadow-inner overflow-hidden">
                                                    <div className="bg-[image:var(--gradient-primary)] h-2 rounded-full transition-all duration-700 ease-out" style={{ width: `${project.progress}%` }}></div>
                                                </div>
                                                <span className="text-xs text-muted-foreground font-mono w-9 text-right font-bold">{project.progress}%</span>
                                            </div>

                                            <Link href={`/admin/projects/${project.id}`} className="mt-6 w-full">
                                                <button className="w-full py-3 bg-background group-hover:bg-card rounded-xl text-xs font-bold text-foreground transition-all border border-border shadow-sm group-hover:shadow group-hover:border-accent/20">
                                                    Manage Project
                                                </button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                ))}

                {clients.length === 0 && (
                    <div className="col-span-1 text-center p-24 text-muted-foreground glass-card rounded-[2rem] relative overflow-hidden group">
                        <User className="mx-auto mb-6 text-border group-hover:scale-110 transition-transform duration-500" size={56} />
                        <h3 className="text-3xl font-bold text-foreground mb-3 font-brand relative z-10">No clients registered</h3>
                        <p className="relative z-10 text-lg font-medium text-muted-foreground">Once clients create an account, they will appear here automatically.</p>

                        {/* Ambient Background Logo */}
                        <div className="absolute top-1/2 left-1/2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
                            <Activity className="w-[400px] h-[400px] text-foreground" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
