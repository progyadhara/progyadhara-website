// lib/seoLandings.ts
// কীওয়ার্ড-ল্যান্ডিং পেজের সব কনটেন্ট এখানে। নতুন পণ্যের পেজ চাইলে শুধু একটা এন্ট্রি যোগ করলেই হবে।
// বর্তমানে তালিকা খালি — প্রজ্ঞাধারার বই ও উপকরণের জন্য নতুন এন্ট্রি পরে যোগ হবে।

export type LandingFaq = { q: string; a: string };
export type LandingSection = { heading: string; body: string[] };

export type SeoLanding = {
  slug: string; // URL হবে /{slug}
  updatedAt: string; // আসল আপডেটের তারিখ (sitemap-এ যায়)
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  productMatch: string[]; // পণ্যের নামে এই শব্দ থাকলে পেজে দেখাবে
  intro: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  related: { label: string; href: string }[];
};

export const seoLandings: SeoLanding[] = [];

export function getLanding(slug: string): SeoLanding | undefined {
  return seoLandings.find((l) => l.slug === slug);
}