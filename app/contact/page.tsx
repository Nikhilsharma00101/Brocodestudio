"use client";

import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactBackground } from "@/components/contact/ContactBackground";
import { ContactForm } from "@/components/contact/ContactForm";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = ["Extraordinary.", "The Future.", "Innovation.", "Excellence.", "Digital Dreams.", "Modern Brands."];

const ScrambledWord = ({ word }: { word: string }) => {
    const [displayWord, setDisplayWord] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayWord(
                word
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return word[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= word.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [word]);

    return <span>{displayWord}</span>;
};

export default function ContactPage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen">
            <ContactBackground />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-secondary-foreground/60 text-sm font-bold uppercase tracking-[0.3em] block mb-4">
                            Protocol: Connectivity
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">
                            Let&apos;s Build <br />
                            <span className="text-gradient inline-block min-w-[300px]">
                                <ScrambledWord word={words[index]} />
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg">
                            Ready to transform your vision into a digital masterpiece? Our systems are primed for your next groundbreaking project.
                        </p>

                        <div className="space-y-6">
                            <ContactItem
                                icon={<Mail className="w-5 h-5 text-cyan-500" />}
                                title="Data Stream"
                                value="hello@brocodestudio.com"
                                link="mailto:hello@brocodestudio.com"
                            />
                            <ContactItem
                                icon={<MessageCircle className="w-5 h-5 text-green-500" />}
                                title="Direct Frequency"
                                value="+91 98765 43210"
                                link="https://wa.me/919876543210"
                            />
                            <ContactItem
                                icon={<MapPin className="w-5 h-5 text-violet-500" />}
                                title="Base Station"
                                value="Delhi, India"
                            />
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ContactItem({ icon, title, value, link }: { icon: React.ReactNode; title: string; value: string; link?: string }) {
    const content = (
        <div className="flex items-center gap-4 group cursor-pointer hover:bg-secondary/50 p-4 rounded-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h4 className="font-semibold text-foreground">{title}</h4>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">{value}</p>
            </div>
        </div>
    );

    return link ? (
        <a href={link} className="block w-full max-w-sm">
            {content}
        </a>
    ) : (
        <div className="w-full max-w-sm">{content}</div>
    );
}
