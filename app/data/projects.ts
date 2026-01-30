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
        id: "02",
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
        id: "03",
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
    },
    {
        id: "04",
        slug: "karbhawan",
        title: "Karbhawan",
        subtitle: "Aether Luxe Automotive Accessories",
        category: "E-Commerce & Branding",
        role: "Full Stack Development",
        timeline: "4 Months",
        image: "/projects/karbhawan.png",
        description: "A premium e-commerce platform for tech-infused automotive accessories, featuring a unique 'doorstep installation' service in Delhi NCR. The design reflects a dark, cinematic, and high-tech aesthetic, merging luxury with functionality.",
        challenge: "The automotive accessory market is fragmented and often lacks visual appeal. The challenge was to create a platform that felt 'premium' and 'trustworthy' while simplifying the complex logistics of doorstep installation bookings. We needed a system that could handle SKU variants and installation feasibility checks in real-time.",
        solution: "We built a high-performance Next.js store with a custom booking engine for installation slots. The UI uses a dark, glassmorphism-inspired theme to evoke a 'night drive' feel, matching the products' tech-focused nature. We integrated server-side validation for pricing and installation areas to ensure accuracy.",
        impact: [
            { label: "Booking Efficiency", value: "+40%" },
            { label: "User Engagement", value: "High" },
            { label: "Return Rate", value: "< 2%" }
        ],
        stack: ["Next.js", "Tailwind CSS", "Framer Motion", "React"],
        color: "#ef4444",
        liveLink: "https://karbhawancom.vercel.app/"
    }
];
