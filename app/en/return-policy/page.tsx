import PolicyAccordion from "@/app/components/PolicyAccordion";
import { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Return Policy | ${siteConfig.brand.nameEn}`,
  description: `Learn about ${siteConfig.brand.nameEn}'s return, exchange, and refund policy for religious books, scriptures, and puja items.`,
  alternates: {
    canonical: "/en/return-policy",
    languages: {
      bn: "/return-policy",
      en: "/en/return-policy",
    },
  },
};

const sections = [
  {
    title: "General Rules",
    content:
      "To protect the sanctity and quality of religious books and puja items, opened, used, or worshipped-with items cannot be returned. Returns or exchanges are accepted only in the specific cases listed below.",
  },
  {
    title: "Eligible for Return/Exchange",
    content:
      "If a product arrives damaged (torn or wet book, damaged cover or pages, broken or cracked item, broken packaging), the wrong product or edition was sent, or there is a printing defect (missing pages, faulty binding) — in these cases we guarantee a replacement or refund.",
  },
  {
    title: "Return Timeframe",
    content:
      "You must inform us within 24-48 hours of delivery. If possible, take photos or video before opening the packaging, as this makes verifying the complaint easier.",
  },
  {
    title: "Return Process",
    content: `Send a description of the issue along with photos/video to our WhatsApp (${siteConfig.contact.phoneDisplay}). Our team will review it and contact you within 24 hours. If the issue is confirmed, we will arrange a replacement or refund.`,
  },
  {
    title: "Refund Method",
    content:
      "If a refund is approved, the amount will be returned within 3-7 business days depending on the payment method. For Cash on Delivery orders, the refund will be made via bKash or Nagad.",
  },
  {
    title: "Special Rules for Fragile Items",
    content:
      "If fragile items such as idols, clay or glass lamps, or kalash are found broken or cracked at delivery, you must inform us within 24 hours of delivery with photos/video of the unboxing, and we will arrange a replacement or refund. We are not liable for any damage caused by carelessness after delivery has been accepted.",
  },
  {
    title: "What Is Not Returnable",
    content:
      "Opened, used, or worshipped-with items; books with writing, stains, or marks; failed delivery due to an incorrect address provided by the customer; and complaints reported more than 48 hours after delivery are not returnable.",
  },
  {
    title: "Contact",
    content: `If you have any questions about returns, contact us on WhatsApp (${siteConfig.contact.phoneDisplay}). Our address: ${siteConfig.address.villageEn}, ${siteConfig.address.localityEn}, ${siteConfig.address.regionEn}.`,
  },
];

export default function ReturnPolicyPageEn() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        Return Policy
      </h1>
      <PolicyAccordion
        items={sections.map((s) => ({ q: s.title, a: s.content }))}
      />
    </main>
  );
}
