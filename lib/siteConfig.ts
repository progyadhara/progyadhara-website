// lib/siteConfig.ts
// এই ফাইলটাই siteConfig — প্রতিটা ক্লায়েন্ট সাইটের জন্য শুধু এই একটা ফাইল বদলালেই হবে

export const siteConfig = {
  // ব্র্যান্ড পরিচিতি
  brand: {
    name: "Progyadhara",
    nameEn: "Progyadhara",
    nameBn: "প্রজ্ঞাধারা",
    displayName: "প্রজ্ঞাধারা – Progyadhara",
    alternateNames: ["Proggadhara", "Prajnadhara"],
    slogan: "জ্ঞানের ধারায় জীবনের পথ",
    sloganEn: "The Path of Life Through the Stream of Knowledge",
    founderName: "Kamol Kumar Mahato",
    founderNameBn: "কমল কুমার মাহাতো",
    youtubeHandle: "@progyadhara",
    foundingYear: "2026",
  },

  // পেমেন্ট সংক্রান্ত তথ্য
  payment: {
    bkashNumber: "01737939688",
    nagadNumber: "01737939688",
    bank: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branch: "",
    },
  },

  // ডোমেইন ও URL
  domain: {
    url: "https://progyadhara.com",
    host: "progyadhara.com",
    ogImage: "/uploads/og-image.jpg",
    logo: "/uploads/logo-icon.png",
  },

  // যোগাযোগ তথ্য
  contact: {
    phone: "+8801737939688",
    phoneDisplay: "01737939688",
    whatsapp: "8801737939688",
    email: "contact@progyadhara.com",
  },

  // ঠিকানা
  address: {
    locality: "রায়গঞ্জ",
    localityEn: "Raiganj",
    region: "সিরাজগঞ্জ",
    regionEn: "Sirajganj",
    village: "সারইল",
    villageEn: "Sarail",
    country: "BD",
    latitude: 24.53776236620221,
    longitude: 89.40731198780867,
  },

  // সোশ্যাল লিংক
  social: {
    facebook: "https://www.facebook.com/progyadhara",
    youtube: "https://youtube.com/@progyadhara",
    instagram: "https://www.instagram.com/progyadhara",
    tiktok: "https://www.tiktok.com/@progyadhara",
  },

  // মেটাডেটা / SEO
  seo: {
    defaultTitle: "প্রজ্ঞাধারা – Progyadhara | জ্ঞানের ধারায় জীবনের পথ",
    titleTemplate: "%s | প্রজ্ঞাধারা",
    description:
      "প্রজ্ঞাধারা – Progyadhara: হিন্দু ধর্মীয় বই, পবিত্র ধর্মগ্রন্থ ও পূজা উপকরণের বিশ্বস্ত অনলাইন প্ল্যাটফর্ম। সারা বাংলাদেশে হোম ডেলিভারি। জ্ঞানের ধারায় জীবনের পথ।",
    descriptionEn:
      "Progyadhara: Trusted online platform for Hindu religious books, sacred scriptures and puja accessories. Home delivery across Bangladesh.",
    keywords: [
      "প্রজ্ঞাধারা",
      "Progyadhara",
      "হিন্দু ধর্মীয় বই",
      "পবিত্র ধর্মগ্রন্থ",
      "গীতা",
      "পুরাণ",
      "পূজা উপকরণ",
      "ধর্মীয় বই",
      "সনাতন ধর্ম",
    ],
  },

  // ব্যবসায়িক তথ্য
  business: {
    priceRange: "৳50-৳5000",
    paymentAccepted: "Cash on Delivery, bKash, Nagad",
    currenciesAccepted: "BDT",
    orderIdPrefix: "PG",
    openingHours: {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  },

  // অ্যানালিটিক্স
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  },
} as const;

export type SiteConfig = typeof siteConfig;