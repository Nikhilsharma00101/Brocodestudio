export interface Project {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    category: string;
    role?: string;
    timeline?: string;
    image: string;
    description: string;
    challenge?: string;
    solution?: string;
    impact?: { label: string; value: string }[];
    stack: string[];
    gallery?: string[];
    color: string;
    liveLink?: string;
}

export const projects: Project[] = [
    {
        id: "01",
        slug: "fintech-analytics-engine",
        title: "FinTech Dashboard",
        subtitle: "Institutional Grade Analytics",
        category: "System Architecture",
        role: "Lead Engineering",
        timeline: "4 Months",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        description: "Reimagining institutional finance through a high-performance analytics engine. We focused on data density without cognitive overload.",
        challenge: "In the high-stakes world of institutional trading, milliseconds matter. The client, a Tier-1 investment firm, struggled with a legacy dashboard that lagged under the weight of real-time global market data. They needed a system that could render millions of data points instantly, provide actionable insights without visual clutter, and maintain 99.999% uptime.",
        solution: "We engineered a bespoke React-based architecture, utilizing WebGL for high-performance data visualization. By moving heavy computations to a Rust-based backend and using WebSockets for real-time streaming, we achieved a near-zero latency experience. The UI was designed with a 'dark cockpit' aesthetic to reduce eye strain during long trading sessions, focusing on high-contrast data alerts and fluid transitions.",
        impact: [
            { label: "Latency Reduction", value: "92%" },
            { label: "Data Processed", value: "5TB/day" },
            { label: "User Adoption", value: "100%" }
        ],
        stack: ["Next.js", "Web3", "D3.js", "Rust", "Lottie"],
        gallery: [
            "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80"
        ],
        color: "#6366f1"
    },
    {
        id: "02",
        slug: "ecoluxe-interiors",
        title: "EcoLuxe Interiors",
        subtitle: "Sustainable Luxury E-Comm",
        category: "E-Commerce Experience",
        role: "UX/UI Design & Dev",
        timeline: "3 Months",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
        description: "A luxury shopping destination where pixels meet physical textures. Integrated 3D product previews and ultra-fast checkout.",
        challenge: "Selling high-end, sustainable furniture online poses a unique problem: customers hesitate to buy expensive items they can't touch. EcoLuxe needed a digital experience that could convey the tactile quality of their fabrics and the craftsmanship of their wood, bridging the gap between digital convenience and physical luxury.",
        solution: "We developed an immersive 'tactile web' experience. Using Three.js, we created photorealistic 3D models of key pieces that users could rotate and zoom into 4K texture maps. We coupled this with a headless Shopify setup for blazing fast performance. The design language used organic fluid animations and a soft, earthy color palette to reflect the brand's sustainable ethos.",
        impact: [
            { label: "Conversion Rate", value: "+210%" },
            { label: "Return Rate", value: "-35%" },
            { label: "Avg Order Value", value: "$4.2k" }
        ],
        stack: ["Shopify", "Three.js", "GSAP", "WebGL", "Tailwind"],
        gallery: [
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1616137466211-f939a420be63?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80"
        ],
        color: "#06b6d4",
        liveLink: "https://ecoluxe-interior.vercel.app"
    },
    {
        id: "03",
        slug: "techflow-identity",
        title: "TechFlow Corp",
        subtitle: "Global Brand Evolution",
        category: "Brand Orchestration",
        role: "Creative Direction",
        timeline: "6 Months",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
        description: "A complete visual identity overhaul for a global semiconductor leader. Modern, precise, and future-proof.",
        challenge: "TechFlow, a semiconductor giant, was suffering from a 'silent innovator' problem. Their technology was everywhere, but their brand was invisible and outdated. They needed a brand identity that felt as cutting-edge as their 3nm chips—dynamic, precise, and universally adaptable across digital and physical touchpoints.",
        solution: "We created a 'living identity' system. At the core was a generative logomark that subtly shifted based on real-time data inputs (stock price, global traffic). This was supported by a Swiss-inspired typographic system and a motion language derived from circuit board pathways. The web experience served as a manifesto of their new direction, featuring micro-interactions that mimicked energy flow.",
        impact: [
            { label: "Brand Equity", value: "+$40M" },
            { label: "Talent Influx", value: "+150%" },
            { label: "Press Mentions", value: "240+" }
        ],
        stack: ["Identity", "Web Design", "Motion", "Blender", "Figma"],
        gallery: [
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
        ],
        color: "#8b5cf6"
    },
    {
        id: "04",
        slug: "urban-bites-app",
        title: "Urban Bites",
        subtitle: "Hyper-Local Food Delivery",
        category: "Mobile Product",
        role: "Product Design",
        timeline: "2 Months",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80",
        description: "Designing the fastest way to feed a city. A user-first mobile application focused on micro-interactions and speed.",
        challenge: "The food delivery market is saturated with cluttered apps that prioritize ads over food. Urban Bites wanted to be the 'anti-app'—a tool so simple and fast that ordering dinner felt like magic. The goal was to reduce the 'time-to-plate' by streamlining the discovery and checkout process.",
        solution: "We adopted a 'thumb-first' design philosophy. The entire interface is navigable with one hand. We implemented a gesture-based card system for restaurant discovery, similar to dating apps, making the process fun and addictive. The checkout flow was reduced to a single swipe. Visually, we used large, mouth-watering imagery and minimal text to let the food speak for itself.",
        impact: [
            { label: "Time-to-Order", value: "45sec" },
            { label: "App Store Rating", value: "4.9/5" },
            { label: "Active Users", value: "500k+" }
        ],
        stack: ["React Native", "UI/UX", "Prototyping", "Framer", "Firebase"],
        gallery: [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80"
        ],
        color: "#3b82f6"
    },
    {
        id: "05",
        slug: "fashion-today",
        title: "Fashion Today",
        subtitle: "Luxury E-Commerce Platform",
        category: "E-Commerce Experience",
        role: "Full Stack Development",
        timeline: "4 Months",
        image: "/projects/fashion_today.png",
        description: "An avant-garde digital boutique designed for high-end fashion, merging immersive cinematic visuals with a high-performance retail engine.",
        challenge: "The luxury clothing market requires a digital experience that feels as premium as the products themselves. Fashion Today needed a platform that could handle high-resolution visual storytelling while maintaining lightning-fast performance and a conversion-focused checkout flow.",
        solution: "We built a headless commerce solution using Next.js and a custom-built product engine. The interface features smooth, high-frame-rate transitions and cinematic video backgrounds. We optimized image delivery using a global CDN and implemented a seamless, one-page checkout process that reduced abandonment by 40%.",
        impact: [
            { label: "Mobile Engagement", value: "+180%" },
            { label: "Checkout Speed", value: "2.4s" },
            { label: "Revenue Growth", value: "65%" }
        ],
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Headless CMS"],
        color: "#06b6d4",
        liveLink: "https://fashion-today-iota.vercel.app"
    },
    {
        id: "06",
        slug: "fortis-plus",
        title: "FortisPlus",
        subtitle: "Advanced Medical Hub",
        category: "Medical Platform",
        role: "Lead Developer",
        timeline: "5 Months",
        image: "/projects/fortisplus.png",
        description: "A high-precision medical platform engineered for seamless patient data management and interactive health visualization.",
        challenge: "Modern healthcare requires a digital bridge between complex medical data and patient-first interfaces. FortisPlus needed to unify disparate medical records into a single, high-security dashboard while providing doctors with intuitive 3D visualization tools for surgery planning.",
        solution: "We developed a secure, HIPAA-compliant architecture using Next.js and specialized data visualization libraries. The platform features real-time telemetry from medical devices and a custom-built neural rendering engine for MRI/CT scans. We prioritized data density and accessibility, ensuring critical information is never more than two clicks away.",
        impact: [
            { label: "Data Accuracy", value: "99.99%" },
            { label: "Doctor Efficiency", value: "+45%" },
            { label: "Patient Retention", value: "88%" }
        ],
        stack: ["Next.js", "Three.js", "Web3", "Tailwind CSS"],
        color: "#10b981",
        liveLink: "https://fortis-plus.vercel.app"
    }
];
