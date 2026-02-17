import { ServiceGallery } from "@/components/services/ServiceGallery";
import { projects } from "@/app/data/projects";
import type { Metadata } from "next";

// Define the service categories and their mapping to project fields
const SERVICE_CATEGORIES: Record<string, string> = {
    "website-design": "website",
    "visiting-card-design": "visitingCard",
    "banner-design": "banner",
    "pamphlet-design": "pamphlet",
    "flex-board-design": "flexBoard",
    "logo-design": "logo",
    "google-business-profile": "gbp"
};

const CATEGORY_TITLES: Record<string, string> = {
    "website-design": "Premium Websites",
    "visiting-card-design": "Visiting Cards",
    "banner-design": "Banner Designs",
    "pamphlet-design": "Pamphlet Designs",
    "flex-board-design": "Flex Board Designs",
    "logo-design": "Logo Designs",
    "google-business-profile": "Google Business Profiles"
};

interface PageProps {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params;
    const title = CATEGORY_TITLES[category] || "Service Gallery";

    return {
        title: `${title} | BroCode Studio`,
        description: `Explore our collection of ${title.toLowerCase()} created for various clients.`,
    };
}

export function generateStaticParams() {
    return Object.keys(SERVICE_CATEGORIES).map((category) => ({
        category,
    }));
}

export default async function ServiceCategoryPage({ params }: PageProps) {
    const { category } = await params;
    const fieldName = SERVICE_CATEGORIES[category];
    const title = CATEGORY_TITLES[category] || "Our Work";

    if (!fieldName) {
        return (
            <ServiceGallery
                title={title}
                description={`Explore our collection of ${title.toLowerCase()}.`}
                items={[]}
            />
        );
    }

    // Filter projects that have specific image(s) for this service
    const items = projects
        .filter(p => p.serviceImages && p.serviceImages[fieldName as keyof typeof p.serviceImages])
        .map(p => ({
            projectId: p.id,
            projectTitle: p.title,
            image: p.serviceImages![fieldName as keyof typeof p.serviceImages] as string,
            liveLink: p.liveLink
        }));

    const isContainLayout = category === "logo-design" || category === "visiting-card-design";

    const description = `Discover our hand-picked selection of high-end ${title.toLowerCase()}. Excellence in every pixel.`;

    return <ServiceGallery title={title} description={description} items={items} objectFit={isContainLayout ? "contain" : "cover"} />;
}
