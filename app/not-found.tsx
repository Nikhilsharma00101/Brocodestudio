"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h1 className="text-9xl font-black text-slate-200 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Page Not Found</h2>
            <p className="text-slate-500 mb-8 max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/">
                <Button variant="primary" className="rounded-full px-8">
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
