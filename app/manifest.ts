import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "প্রজ্ঞাধারা - জ্ঞানের ধারায় জীবনের পথ",
    short_name: "প্রজ্ঞাধারা",
    description:
      "ধর্মীয় বই ও পূজা উপকরণের বিশ্বস্ত অনলাইন প্ল্যাটফর্ম। সারা বাংলাদেশে হোম ডেলিভারি।",
      id: "/",
      lang: "bn",
      dir: "ltr",
      scope: "/",
      start_url: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: "#FFF8EC",
      theme_color: "#1F2A5A",
      categories: ["shopping", "books", "education"],
      icons: [
        {
          src: "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/icon-maskable-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      shortcuts: [
        { name: "পণ্য দেখুন", short_name: "পণ্য", url: "/shop" },
        { name: "আমার কার্ট", short_name: "কার্ট", url: "/cart" },
        { name: "যোগাযোগ", short_name: "যোগাযোগ", url: "/contact" },
      ],
  };
}
