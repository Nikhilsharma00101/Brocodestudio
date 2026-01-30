"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Assuming Button exists, need to check path or standard button

interface ExternalLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    url: string;
}

export function ExternalLinkModal({ isOpen, onClose, onConfirm, url }: ExternalLinkModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Decorative Top Border */}
                        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-violet-500" />

                        <div className="p-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 text-slate-900 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 opacity-100" />
                                <ExternalLink className="w-8 h-8 relative z-10" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                                Visiting Live Project
                            </h3>

                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                You are about to navigate to an external live site.
                                <br />
                                <span className="text-xs text-slate-400 mt-2 block font-mono bg-slate-50 py-2 px-3 rounded-lg border border-slate-100 truncate max-w-[300px] mx-auto">
                                    {url}
                                </span>
                            </p>

                            <div className="flex gap-4 w-full">
                                <Button
                                    onClick={onClose}
                                    variant="ghost"
                                    className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onConfirm}
                                    className="flex-1 h-12 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200"
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
