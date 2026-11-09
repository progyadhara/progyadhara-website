import { safeJsonLd } from "@/lib/jsonLd";
import { siteConfig } from "@/lib/siteConfig";

export default function OrganizationSchema({ lang }: { lang: "bn" | "en" }) {
  const isEn = lang === "en";

  const siteUrl = siteConfig.domain.url;
  const alternateNames = [
    siteConfig.brand.nameBn,
    ...siteConfig.brand.alternateNames,
  ];

  const business = {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.brand.name,
    alternateName: alternateNames,
    image: `${siteConfig.domain.url}${siteConfig.domain.logo}`,
    url: siteUrl,
    telephone: siteConfig.contact.phone,
    priceRange: siteConfig.business.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: isEn
        ? siteConfig.address.localityEn
        : siteConfig.address.locality,
      addressRegion: isEn
        ? siteConfig.address.regionEn
        : siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    description: isEn
      ? siteConfig.seo.descriptionEn
      : siteConfig.seo.description,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.youtube,
      siteConfig.social.instagram,
      siteConfig.social.tiktok,
      `https://wa.me/${siteConfig.contact.whatsapp}`,
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
    foundingDate: siteConfig.brand.foundingYear,
    founder: {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: siteConfig.brand.founderName,
      alternateName: [
        siteConfig.brand.founderNameBn,
        `${siteConfig.brand.nameBn} (${siteConfig.brand.founderNameBn})`,
      ],
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: siteConfig.business.openingHours.days,
      opens: siteConfig.business.openingHours.opens,
      closes: siteConfig.business.openingHours.closes,
    },
    slogan: isEn ? siteConfig.brand.sloganEn : siteConfig.brand.slogan,
    paymentAccepted: siteConfig.business.paymentAccepted,
    currenciesAccepted: siteConfig.business.currenciesAccepted,
    areaServed: "Bangladesh",
    knowsLanguage: ["bn", "en"],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.brand.name,
    alternateName: alternateNames,
    inLanguage: isEn ? "en" : "bn",
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [website, business],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
