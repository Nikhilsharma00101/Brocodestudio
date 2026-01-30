import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | BroCode Studio",
    description: "Learn more about BroCode Studio, our philosophy, and our team. We are a high-performance digital collective.",
    openGraph: {
        title: "About Us | BroCode Studio",
        description: "Learn more about BroCode Studio, our philosophy, and our team. We are a high-performance digital collective.",
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
