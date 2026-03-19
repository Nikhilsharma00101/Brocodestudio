"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PlusCircle, X, Loader2, Search, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Client {
    id: string;
    name: string | null;
    email: string;
}

interface CreateProjectButtonProps {
    clients: Client[];
}

export function CreateProjectButton({ clients }: CreateProjectButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");

    // Combobox state
    const [clientId, setClientId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter clients based on search query
    const filteredClients = clients.filter(client =>
        (client.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (client.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const selectedClient = clients.find(c => c.id === clientId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!title || !clientId) {
            setError("Title and Client are required");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, clientId }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to create project");
            }

            setIsOpen(false);
            setTitle("");
            setClientId("");
            router.refresh(); // Refresh page to show new project
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-5 py-2.5 bg-[image:var(--gradient-primary)] text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all text-sm flex items-center gap-2 shadow-lg hover:shadow-cyan-500/25 border-glow"
            >
                <PlusCircle size={18} /> New Project
            </button>

            {mounted && isOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="glass-premium rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden relative">
                        {/* Decorative Gradient Blob */}
                        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

                        <div className="flex justify-between items-center p-8 border-b border-border/50 relative z-10">
                            <h3 className="text-2xl font-bold font-heading text-foreground">Create New Project</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors bg-muted p-2 rounded-full hover:bg-border/50"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6 relative z-10">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-2 font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Project Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Website Redesign"
                                    className="w-full bg-background border border-border rounded-xl px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2 relative" ref={dropdownRef}>
                                <label className="text-sm font-bold text-foreground">Assign to Client</label>

                                <div
                                    className="relative"
                                    onClick={() => {
                                        if (!loading) setIsDropdownOpen(true);
                                    }}
                                >
                                    <Search className="absolute left-5 top-4 h-5 w-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or email..."
                                        className="w-full bg-background border border-border rounded-xl pl-12 pr-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
                                        value={isDropdownOpen ? searchQuery : (selectedClient ? `${selectedClient.name || 'Unnamed'} (${selectedClient.email})` : searchQuery)}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setIsDropdownOpen(true);
                                            if (!isDropdownOpen) {
                                                setClientId("");
                                            }
                                        }}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Custom Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute z-[100] w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto custom-scrollbar">
                                        {filteredClients.length === 0 ? (
                                            <div className="p-5 text-center text-sm text-muted-foreground font-medium">
                                                No clients found matching &quot;{searchQuery}&quot;
                                            </div>
                                        ) : (
                                            <ul className="py-2" role="listbox">
                                                {filteredClients.map((client) => (
                                                    <li
                                                        key={client.id}
                                                        role="option"
                                                        aria-selected={clientId === client.id}
                                                        onClick={() => {
                                                            setClientId(client.id);
                                                            setSearchQuery("");
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors ${clientId === client.id ? 'bg-primary/5 border-l-4 border-primary' : 'hover:bg-muted/50 border-l-4 border-transparent'}`}
                                                    >
                                                        <div>
                                                            <div className={`font-bold text-sm ${clientId === client.id ? 'text-primary' : 'text-foreground'}`}>
                                                                {client.name || "Unnamed"}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mt-0.5 font-medium">{client.email}</div>
                                                        </div>
                                                        {clientId === client.id && (
                                                            <Check className="w-5 h-5 text-primary" />
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-5 py-3.5 bg-muted hover:bg-border/50 text-muted-foreground border border-transparent rounded-xl font-bold transition-all"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-5 py-3.5 bg-[image:var(--gradient-primary)] hover:opacity-90 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-glow"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
