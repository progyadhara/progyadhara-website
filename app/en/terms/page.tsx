import PolicyPage from "@/app/components/PolicyPage";
import { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteConfig.brand.nameEn}`,
  description: `Read the terms and conditions for using the ${siteConfig.brand.nameEn} website, placing orders, payment, and delivery.`,
  alternates: {
    canonical: "/en/terms",
    languages: {
      bn: "/terms",
      en: "/en/terms",
    },
  },
};

const sections = [
  {
    title: "Introduction & Agreement",
    content: `By using the website www.${siteConfig.domain.host}, you agree to the terms below. Please read the full terms before placing an order.`,
  },
  {
    title: "Use of the Website",
    content:
      "This website may only be used for lawful purposes. Any fraudulent, harmful, or illegal use of the website is prohibited.",
  },
  {
    title: "Products & Pricing",
    content:
      "The prices of religious books and puja items are as shown on the website. Depending on the edition, or for handmade items, slight variations in color, size, or design may occur, which does not affect product quality. We reserve the right to change prices without prior notice. If stock is limited, orders may be cancelled or adjusted, and the customer will be informed.",
  },
  {
    title: "Special Terms for Fragile Items",
    content:
      "Fragile items such as idols and clay or glass lamps are packed carefully before shipping. If an item arrives damaged, you must inform us within 24 hours of delivery with photos or video of the unboxing (see our Return Policy for details). In case of unintentional damage during courier transport, we will assist as best we can.",
  },
  {
    title: "Orders & Payment",
    content:
      "We accept Cash on Delivery (COD). If you choose the online payment option, you must send money directly to the bKash, Nagad, or Rocket number shown at checkout. Orders cannot be processed without completed payment (except for COD orders).",
  },
  {
    title: "Delivery",
    content:
      "Delivery within Dhaka costs 75 taka per kg (minimum 60 taka), and outside Dhaka 120 taka per kg (minimum 100 taka). Delivery timeframes are approximate and may be slightly delayed due to weather or logistical reasons. Providing an accurate address and phone number is the customer's responsibility.",
  },
  {
    title: "Intellectual Property",
    content: `All content, logos, images, and videos on this website are the property of ${siteConfig.brand.nameEn}. Copying or reuse without permission is prohibited.`,
  },
  {
    title: "Limitation of Liability",
    content: `${siteConfig.brand.nameEn} makes every effort to supply accurate, quality products. However, we are not liable for damages arising from unintentional errors or uncontrollable circumstances (such as natural disasters or courier delays).`,
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to change these terms as needed. Updated terms take effect as soon as they are published on this page.",
  },
  {
    title: "Governing Law",
    content: "These terms are governed by the laws of Bangladesh.",
  },
  {
    title: "Contact",
    content: `If you have any questions about these terms, contact us on WhatsApp (${siteConfig.contact.phoneDisplay}). Our address: ${siteConfig.address.villageEn}, ${siteConfig.address.localityEn}, ${siteConfig.address.regionEn}.`,
  },
];

export default function TermsPageEn() {
  return (
    <PolicyPage title="Terms & Conditions">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            {section.title}
          </h2>
          <p className="text-gray-600">{section.content}</p>
        </div>
      ))}
    </PolicyPage>
  );
}
