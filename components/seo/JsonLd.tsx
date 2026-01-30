import React from 'react';

export default function JsonLd() {
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "BroCode Studio",
        "url": "https://brocodestudio.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://brocodestudio.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BroCode Studio",
        "url": "https://brocodestudio.com",
        "logo": "https://brocodestudio.com/logo-futuristic.png",
        "sameAs": [
            "https://twitter.com/brocodestudio",
            "https://facebook.com/brocodestudio",
            "https://instagram.com/brocodestudio",
            "https://linkedin.com/company/brocodestudio"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9899405614",
            "contactType": "customer service",
            "areaServed": "Global"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </>
    );
}
