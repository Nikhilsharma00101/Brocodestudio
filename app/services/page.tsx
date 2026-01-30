import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Services | BroCode Studio",
    description: "Explore our premium web design and development packages. From starter websites to advanced e-commerce platforms.",
    openGraph: {
        title: "Services | BroCode Studio",
        description: "Explore our premium web design and development packages. From starter websites to advanced e-commerce platforms.",
    }
};

export default function ServicesPage() {
    return <ServicesClient />;
}
