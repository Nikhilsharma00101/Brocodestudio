import type { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
    title: "Our Work | BroCode Studio",
    description: "View our portfolio of high-performance web applications and premium designs.",
    openGraph: {
        title: "Our Work | BroCode Studio",
        description: "View our portfolio of high-performance web applications and premium designs.",
    }
};

export default function WorkPage() {
    return <WorkClient />;
}
