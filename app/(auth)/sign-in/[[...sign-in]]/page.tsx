import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="relative z-10 p-8 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl">
                <SignIn />
            </div>

            {/* Decorative background elements matching BroCode aesthetic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        </div>
    );
}
