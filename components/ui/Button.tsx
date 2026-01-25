/**
 * @file components/ui/Button.tsx
 * @description A reusable, accessible button component with multiple variants, sizes, and loading states.
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "gradient";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    asChild?: boolean;
}

// Combining HTMLButtonProps and MotionProps is tricky, so simplified approach
// We wrap standard button with motion if needed or just use motion.button
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {

        const variants = {
            primary: "bg-primary text-primary-foreground shadow-sm hover:translate-y-[-1px] hover:shadow-md active:translate-y-[0px] transition-all",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            destructive: "bg-red-500 text-white hover:bg-red-600",
            link: "text-primary underline-offset-4 hover:underline",
            gradient: "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md hover:opacity-90 hover:scale-[1.02] border-0",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-11 px-6 py-2",
            lg: "h-14 px-8 text-lg",
            icon: "h-10 w-10",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    "active:scale-95 duration-200", // Click effect
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
