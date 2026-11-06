// app/llms.txt/route.ts
// AI সার্চ ইঞ্জিনের জন্য সাইটের পরিচয়-ফাইল — সব তথ্য lib/siteConfig.ts থেকে আসে।
import { siteConfig } from "@/lib/siteConfig";

export function GET() {
  const { brand, domain, contact, address, social, seo, business } = siteConfig;
  const base = domain.url;

  const addressBn = `${address.village}, ${address.locality}, ${address.region}, বাংলাদেশ`;
  const addressEn = `${address.villageEn}, ${address.localityEn}, ${address.regionEn}, Bangladesh`;
  const mapUrl = `https://www.google.com/maps?q=${address.latitude},${address.longitude}`;

  const pages: [string, string, string][] = [
    ["/shop", "সব পণ্য দেখুন", "Shop all products"],
    ["/blog", "ব্লগ", "Blog"],
    ["/media/video", "ভিডিও", "Videos"],
    ["/media/image", "ছবির গ্যালারি", "Photo gallery"],
    ["/about", "আমাদের সম্পর্কে", "About us"],
    ["/faq", "প্রশ্ন ও উত্তর (FAQ)", "FAQ"],
    ["/contact", "যোগাযোগ", "Contact"],
    ["/track", "অর্ডার ট্র্যাক", "Track your order"],
    ["/privacy-policy", "গোপনীয়তা নীতি", "Privacy Policy"],
    ["/terms", "শর্তাবলী", "Terms & Conditions"],
    ["/return-policy", "রিটার্ন পলিসি", "Return Policy"],
  ];

  const text = [
    `# ${brand.nameBn} – ${brand.nameEn}`,
    ``,
    `> ${seo.description}`,
    `>`,
    `> ${seo.descriptionEn}`,
    ``,
    `## ব্যবসায়িক তথ্য`,
    `- নাম: ${brand.nameEn} (বাংলায়: ${brand.nameBn})`,
    `- স্লোগান: ${brand.slogan}`,
    `- প্রতিষ্ঠাতা: ${brand.founderName}`,
    `- প্রতিষ্ঠার সাল: ${brand.foundingYear}`,
    `- ঠিকানা: ${addressBn}`,
    `- ফোন / WhatsApp: ${contact.phone}`,
    `- ইমেইল: ${contact.email}`,
    `- ওয়েবসাইট: ${base}`,
    `- Facebook: ${social.facebook}`,
    `- YouTube: ${social.youtube}`,
    `- Instagram: ${social.instagram}`,
    `- TikTok: ${social.tiktok}`,
    `- WhatsApp: https://wa.me/${contact.whatsapp}`,
    `- Google Maps: ${mapUrl}`,
    `- পেমেন্ট: ${business.paymentAccepted}`,
    ``,
    `## গুরুত্বপূর্ণ পেজ (বাংলা)`,
    ...pages.map(([path, bn]) => `- [${bn}](${base}${path})`),
    ``,
    `## Business Information`,
    `- Name: ${brand.nameEn} (Bangla: ${brand.nameBn})`,
    `- Slogan: ${brand.sloganEn}`,
    `- Founder: ${brand.founderName}`,
    `- Founded: ${brand.foundingYear}`,
    `- Address: ${addressEn}`,
    `- Phone / WhatsApp: ${contact.phone}`,
    `- Payment: ${business.paymentAccepted}`,
    ``,
    `## Key Pages (English)`,
    ...pages.map(([path, , en]) => `- [${en}](${base}/en${path})`),
    ``,
  ].join("\n");

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}