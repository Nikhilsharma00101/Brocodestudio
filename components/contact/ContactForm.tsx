"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Briefcase, MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

export const ContactForm = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vision, setVision] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const phoneNumber = "919899405614";
        const message = `👋 *Hi BroCode Team!* \n\nI'm interested in starting a new project with you.\n\n*Name:* ${name}\n*Email:* ${email}\n*Service:* ${selectedService || "General Inquiry"}\n\n*Project Vision:*\n${vision}\n\n🚀 _Looking forward to building something great!_`;
        const encodedMessage = encodeURIComponent(message);

        // Using api.whatsapp.com is often more robust for pre-filled text than wa.me
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");

        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const inputClasses = "w-full bg-white/40 border-white/60 focus:bg-white/80 focus:border-cyan-500/50 transition-all duration-300 rounded-xl px-4 py-3 outline-none text-sm placeholder:text-muted-foreground/50";

    return (
        <div className="relative">
            {/* Technical Corner Markers for the entire form area */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-violet-500/30 pointer-events-none" />

            <GlassCard className="relative p-8 md:p-10 bg-white/40 backdrop-blur-2xl border-white/40 shadow-2xl overflow-hidden">
                {/* Decorative Internal Scan Line */}
                <motion.div
                    className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6 relative z-10"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name Field */}
                                <div className="space-y-2 group">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 group-hover:text-cyan-600 transition-colors">
                                        <User className="w-3 h-3" />
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className={inputClasses}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => setFocusedField(null)}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        {focusedField === "name" && (
                                            <motion.div
                                                layoutId="input-focus"
                                                className="absolute inset-0 border-2 border-cyan-500/20 rounded-xl pointer-events-none"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2 group">
                                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 group-hover:text-violet-600 transition-colors">
                                        <Mail className="w-3 h-3" />
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className={inputClasses}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        {focusedField === "email" && (
                                            <motion.div
                                                layoutId="input-focus"
                                                className="absolute inset-0 border-2 border-violet-500/20 rounded-xl pointer-events-none"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Service Field - Custom Premium Dropdown */}
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 group-hover:text-cyan-600 transition-colors">
                                    <Briefcase className="w-3 h-3" />
                                    Service Tier
                                </label>
                                <div className="relative">
                                    <div
                                        className={cn(
                                            inputClasses,
                                            "cursor-pointer flex items-center justify-between group/select",
                                            focusedField === "service" && "border-cyan-500/50"
                                        )}
                                        onClick={() => setFocusedField(focusedField === "service" ? null : "service")}
                                    >
                                        <span className={cn(!selectedService && "text-muted-foreground/50")}>
                                            {selectedService || "Select a Tier"}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: focusedField === "service" ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-50">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {focusedField === "service" && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute top-full left-0 right-0 mt-2 z-[100] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden p-1"
                                                >
                                                    {["Starter Package", "Standard Package", "Premium Package", "Custom Enterprise"].map((option) => (
                                                        <motion.div
                                                            key={option}
                                                            whileHover={{ x: 5, backgroundColor: "rgba(6, 182, 212, 0.05)" }}
                                                            className="px-4 py-3 rounded-xl cursor-pointer text-sm transition-colors flex items-center justify-between group/option"
                                                            onClick={() => {
                                                                setSelectedService(option);
                                                                setFocusedField(null);
                                                            }}
                                                        >
                                                            <span className={cn("transition-colors", selectedService === option ? "text-cyan-600 font-semibold" : "text-primary/70 group-hover/option:text-primary")}>
                                                                {option}
                                                            </span>
                                                            {selectedService === option && (
                                                                <motion.div layoutId="active-check">
                                                                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                                {/* Backdrop to close dropdown */}
                                                <div
                                                    className="fixed inset-0 z-[90]"
                                                    onClick={() => setFocusedField(null)}
                                                />
                                            </>
                                        )}
                                    </AnimatePresence>

                                    {focusedField === "service" && (
                                        <motion.div
                                            layoutId="input-focus"
                                            className="absolute inset-0 border-2 border-cyan-500/20 rounded-xl pointer-events-none z-10"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="space-y-2 group">
                                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60 group-hover:text-violet-600 transition-colors">
                                    <MessageSquare className="w-3 h-3" />
                                    Project Vision
                                </label>
                                <div className="relative">
                                    <textarea
                                        placeholder="Briefly describe your goals..."
                                        className={cn(inputClasses, "min-h-[140px] resize-none")}
                                        onFocus={() => setFocusedField("details")}
                                        onBlur={() => setFocusedField(null)}
                                        value={vision}
                                        onChange={(e) => setVision(e.target.value)}
                                        required
                                    />
                                    {focusedField === "details" && (
                                        <motion.div
                                            layoutId="input-focus"
                                            className="absolute inset-0 border-2 border-violet-500/20 rounded-xl pointer-events-none"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.div
                                whileHover="hover"
                                initial="initial"
                                className="relative pt-4"
                            >
                                <Button
                                    variant="gradient"
                                    size="lg"
                                    className="w-full text-base font-bold tracking-widest uppercase overflow-hidden group"
                                    type="submit"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Start Project
                                        <motion.div
                                            variants={{
                                                hover: { x: 5, rotate: -45 },
                                                initial: { x: 0, rotate: 0 }
                                            }}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="w-5 h-5 fill-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </motion.div>
                                    </span>
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-x-0 -top-full bottom-0 bg-gradient-to-b from-white/20 to-transparent skew-y-12 z-0"
                                        variants={{
                                            hover: { top: "100%", transition: { duration: 0.6, ease: "easeInOut" } },
                                            initial: { top: "-100%" }
                                        }}
                                    />
                                </Button>
                            </motion.div>

                            <div className="flex justify-between items-center text-[10px] font-mono text-primary/30 pt-4 border-t border-white/20">
                                <div>ENCRYPTED_SSL_v3</div>
                                <div>SYSTEM_READY</div>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-20 flex flex-col items-center text-center space-y-4"
                        >
                            <div className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.2 }}
                                    className="absolute -inset-4 bg-cyan-500/20 blur-xl rounded-full"
                                />
                                <CheckCircle2 className="w-20 h-20 text-cyan-500 relative z-10" />
                            </div>
                            <h2 className="text-2xl font-bold">Transmission Received</h2>
                            <p className="text-muted-foreground max-w-xs">
                                Your message has been encrypted and synchronized. Our agents will respond shortly.
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-8"
                                onClick={() => setIsSubmitted(false)}
                            >
                                Send Another
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};
