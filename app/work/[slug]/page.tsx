import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";
import ProjectClient from "./ProjectClient";

// Helper to get next project
const getNextProject = (currentId: string) => {
    const currentIndex = projects.findIndex(p => p.id === currentId);
    return projects[(currentIndex + 1) % projects.length];
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found | BroCode Studio",
        };
    }

    return {
        title: `${project.title} | BroCode Studio`,
        description: project.description,
        openGraph: {
            title: `${project.title} | BroCode Studio`,
            description: project.description,
            images: [project.image],
        },
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const nextProject = getNextProject(project.id);

    return <ProjectClient project={project} nextProject={nextProject} />;
}
