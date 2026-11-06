// lib/seoLandingsEn.ts
// কীওয়ার্ড-ল্যান্ডিং পেজের ইংরেজি (EN) কনটেন্ট। slug অবশ্যই lib/seoLandings.ts-এর সঙ্গে হুবহু মিলতে হবে।
// productMatch ইচ্ছা করেই বাংলা রাখা হয়েছে, কারণ ডাটাবেসে পণ্যের নাম বাংলায়, ওই শব্দ দিয়েই পণ্য খোঁজা হয়।
// related-এর href বাংলা পাথেই লেখা (যেমন /shop); EN পেজে সেটা আপনা-আপনি /en/shop হয়ে যাবে।
// বর্তমানে তালিকা খালি — প্রজ্ঞাধারার বই ও উপকরণের জন্য নতুন এন্ট্রি পরে যোগ হবে।

import type { SeoLanding } from "@/lib/seoLandings";

export const seoLandingsEn: SeoLanding[] = [];

export function getLandingEn(slug: string): SeoLanding | undefined {
  return seoLandingsEn.find((l) => l.slug === slug);
}