import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article" | "sports_team";
}

const SEOHead = ({ 
  title = "Nürnberg Renegades e.V. | Flag Football Team",
  description = "Nürnberg Renegades e.V. - First Division DFFL Flag Football Team in Nürnberg, Germany. Join our professional training and become part of the team.",
  canonical = "https://www.nuernberg-renegades.de/",
  type = "website"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonical);
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonical);

  }, [title, description, canonical]);

  return null;
};

// JSON-LD Structured Data for the organization
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": "Nürnberg Renegades e.V.",
    "alternateName": "Renegades",
    "url": "https://www.nuernberg-renegades.de",
    "logo": "https://www.nuernberg-renegades.de/logo.png",
    "image": "https://www.nuernberg-renegades.de/logo.png",
    "description": "First Division DFFL Flag Football Team based in Nürnberg, Germany. Professional training for all skill levels.",
    "email": "info@nuernberg-renegades.de",
    "foundingDate": "2022",
    "sport": "Flag Football",
    "memberOf": {
      "@type": "SportsOrganization",
      "name": "Deutsche Flag Football Liga (DFFL)",
      "url": "https://www.5erdffl.de"
    },
    "location": {
      "@type": "Place",
      "name": "Nürnberg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nürnberg",
        "addressCountry": "DE"
      }
    },
    "sameAs": [
      "https://www.instagram.com/renegades_nuernberg/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default SEOHead;
