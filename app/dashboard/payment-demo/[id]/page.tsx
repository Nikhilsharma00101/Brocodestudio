"use client";

import { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { simulatePayment } from "@/app/actions/payment";
import { 
    CreditCard, Lock, ShieldCheck, 
    ArrowLeft, CheckCircle2,
    Sparkles, Zap, Smartphone, Landmark
} from "lucide-react";
import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion"; // Removed unused imports

export default function DemoPaymentPage() {
    const params = useParams();
    // const router = useRouter(); // Removed unused variable
    const projectId = params.id as string;
    
    const [, startTransition] = useTransition();
    const [step, setStep] = useState<"form" | "processing" | "success">("form");
    // const [error, setError] = useState<string | null>(null); // Removed unused state

    function handlePayment() {
        setStep("processing");
        // setError(null);
        
        // Brief delay to simulate network/gateway
        setTimeout(() => {
            startTransition(async () => {
                const res = await simulatePayment(projectId);
                if (res.success) {
                    setStep("success");
                } else {
                    // setError(res.error || "Payment failed");
                    setStep("form");
                }
            });
        }, 2000);
    }

    if (step === "success") {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-emerald-100 shadow-2xl shadow-emerald-500/5 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 size={48} className="text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-brand tracking-tighter text-slate-900 mb-4">
                    Vault Unlocked<span className="text-emerald-500">!</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed font-medium">
                    Your payment was successful. All project assets in your Vault are now ready for immediate download.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                        href="/dashboard/vault"
                        className="px-8 py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all hover:-translate-y-1 shadow-lg flex items-center gap-3"
                    >
                        <Lock className="shrink-0" size={18} />
                        Enter Unlocked Vault
                    </Link>
                    <Link 
                        href="/dashboard"
                        className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all"
                    >
                        Return to Dashboard
                    </Link>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-20 left-20 text-emerald-100 opacity-20 animate-pulse">
                    <Sparkles size={80} />
                </div>
                <div className="absolute bottom-20 right-20 text-emerald-100 opacity-20 animate-pulse delay-700">
                    <Sparkles size={100} />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-8">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/vault" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold font-brand tracking-tight text-slate-900 flex items-center gap-3">
                            <ShieldCheck size={28} className="text-indigo-500" />
                            Secure Checkout
                        </h1>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Demo Protocol Activated</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <Lock size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SSL Encrypted Session</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                {/* Left: Payment Form */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="glass-card p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60 transition-all">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-slate-900">Payment Information</h3>
                            <div className="flex gap-1.5">
                                <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200" />
                                <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200" />
                                <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200" />
                            </div>
                        </div>

                        {step === "processing" ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                                    <Lock size={20} className="absolute inset-0 m-auto text-indigo-500 animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-800">Verifying Transaction</p>
                                    <p className="text-sm text-slate-500 mt-1">Please do not refresh the page...</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Cardholder Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="BroCode Demo User" 
                                                defaultValue="BroCode Demo User"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Card Number</label>
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    placeholder="4242 4242 4242 4242" 
                                                    defaultValue="4242 4242 4242 4242"
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all pl-12"
                                                />
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Expiry</label>
                                            <input 
                                                type="text" 
                                                placeholder="MM/YY" 
                                                defaultValue="12/28"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">CVC</label>
                                            <input 
                                                type="text" 
                                                placeholder="***" 
                                                defaultValue="123"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button 
                                        onClick={handlePayment}
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-500/10 hover:-translate-y-1 active:translate-y-0"
                                    >
                                        <ShieldCheck size={18} />
                                        Complete Demo Payment
                                    </button>
                                    <p className="text-[10px] text-center text-slate-400 mt-4 font-medium uppercase tracking-[0.1em]">
                                        Powered by Nexus Secure Gateway
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Alternative Methods Overlay */}
                    <div className="flex gap-4 opacity-50 pointer-events-none">
                        <div className="flex-1 p-4 rounded-2xl border border-slate-200 flex items-center justify-center gap-2">
                            <Smartphone size={16} className="text-slate-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Apple Pay</span>
                        </div>
                        <div className="flex-1 p-4 rounded-2xl border border-slate-200 flex items-center justify-center gap-2">
                            <Landmark size={16} className="text-slate-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Bank Transfer</span>
                        </div>
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-2 space-y-6 sticky top-24">
                    <div className="p-8 rounded-[2rem] bg-indigo-50/80 border border-indigo-100 flex flex-col h-full">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Order Summary</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Project Deliverable Bundle</p>
                                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                        <Zap size={10} strokeWidth={3} />
                                        Unlimited Vault Access
                                    </p>
                                </div>
                                <p className="font-mono text-xs font-bold text-slate-400 decoration-slate-300 line-through">$4,500.00</p>
                            </div>
                            <div className="flex justify-between items-center bg-white/50 p-3 rounded-xl border border-white">
                                <span className="text-xs font-semibold text-slate-500">Discount Logic</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">-100% (Demo)</span>
                            </div>
                        </div>

                        <div className="mt-auto space-y-3 pt-6 border-t border-indigo-200">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">Subtotal</span>
                                <span className="text-xs font-mono font-bold text-slate-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">Processing Fee</span>
                                <span className="text-xs font-mono font-bold text-slate-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 mt-3 border-t border-indigo-200">
                                <span className="text-base font-bold text-slate-900 font-brand">Total Due</span>
                                <span className="text-2xl font-bold font-brand text-indigo-600 tracking-tighter">$0.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                            <Sparkles size={14} className="text-slate-500" />
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                            Completing this demo payment will instantly unlock your project vault for all collaborators.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
