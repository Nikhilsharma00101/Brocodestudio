import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
    title: "Our Process | BroCode Studio",
    description: "Learn about our precision workflow, from discovery to deployment. We build digital products with a strategic, interdisciplinary approach.",
    openGraph: {
        title: "Our Process | BroCode Studio",
        description: "Learn about our precision workflow, from discovery to deployment. We build digital products with a strategic, interdisciplinary approach.",
    }
};

export default function ProcessPage() {
    return <ProcessClient />;
}
