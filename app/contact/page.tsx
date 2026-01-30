import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us | BroCode Studio",
    description: "Get in touch with BroCode Studio. We are ready to help you build your next project.",
    openGraph: {
        title: "Contact Us | BroCode Studio",
        description: "Get in touch with BroCode Studio. We are ready to help you build your next project.",
    }
};

export default function ContactPage() {
    return <ContactClient />;
}
