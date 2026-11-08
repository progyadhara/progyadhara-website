import FaqAccordion from "@/app/components/FaqAccordion";
import { Metadata } from "next";
import { safeJsonLd } from "@/lib/jsonLd";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `FAQ | ${siteConfig.brand.nameEn}`,
  description: `Common questions about ${siteConfig.brand.nameEn}'s books, items, orders, payment, delivery, and returns. Learn about our religious books, scriptures, and puja items.`,
  alternates: {
    canonical: "/en/faq",
    languages: {
      bn: "/faq",
      en: "/en/faq",
    },
  },
};

const faqGroups = [
  {
    category: `About ${siteConfig.brand.nameEn}`,
    items: [
      {
        q: `Who is ${siteConfig.brand.nameEn} (${siteConfig.brand.nameBn})?`,
        a: `${siteConfig.brand.nameEn} and ${siteConfig.brand.nameBn} are the same brand — the English and Bengali forms of one name. It is an online platform for religious books, scriptures, and puja items. Our founder is ${siteConfig.brand.founderName}. Our slogan: "${siteConfig.brand.sloganEn}".`,
      },
      {
        q: `What products does ${siteConfig.brand.nameEn} sell?`,
        a: "Currently we supply Hindu scriptures (such as the Gita, Ramayana, and Mahabharata), puja books, and puja items. More religious texts and items will be added in the future.",
      },
      {
        q: `Where can I watch ${siteConfig.brand.nameEn}'s videos?`,
        a: "We publish readings and explanations of the Bhagavad Gita and other scriptures on our YouTube channel and Facebook page. You can also watch them on the video page of this website.",
      },
      {
        q: `Why buy books and items from ${siteConfig.brand.nameEn}?`,
        a: "We offer three things: religious books and puja items in one place, home delivery across Bangladesh, and direct support on WhatsApp if anything goes wrong.",
      },
      {
        q: `What is ${siteConfig.brand.nameEn}'s goal?`,
        a: "Our goal is to make religious books and items easily available to everyone, and to spread the knowledge of the scriptures in simple language through videos.",
      },
    ],
  },
  {
    category: "About Our Books & Items",
    items: [
      {
        q: "Which books are available?",
        a: "We offer Hindu scriptures such as the Gita, Ramayana, and Mahabharata, along with puja books. You can see the current list on the shop page; new books and items will be added step by step.",
      },
      {
        q: "Which puja items are available?",
        a: `Various essential puja items are listed on the shop page. If you cannot find a specific item, let us know on WhatsApp (${siteConfig.contact.phoneDisplay}).`,
      },
      {
        q: "How can I find out the publisher and edition of a book?",
        a: `Each product page shows the book's name, description, and price. If you want specific details about the publisher or edition, ask us on WhatsApp (${siteConfig.contact.phoneDisplay}) before ordering.`,
      },
      {
        q: "What if a book is out of stock?",
        a: `The product page shows when an item is out of stock. To ask about another edition or when it will be available again, contact us on WhatsApp (${siteConfig.contact.phoneDisplay}).`,
      },
    ],
  },
  {
    category: "Orders & Payment",
    items: [
      {
        q: "How do I place an order?",
        a: "Add your preferred products to the cart on the website and confirm your order from the checkout page. You'll receive a confirmation message on WhatsApp after ordering.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept Cash on Delivery (COD). You can also choose the online payment option at checkout, where a bKash, Nagad, or Rocket number is shown (with a copy button) — send money there to complete payment. Direct gateway payment will be added in the future.",
      },
      {
        q: "How will I get order updates?",
        a: "Order confirmation and delivery status are sent via WhatsApp. You can also track your order by logging into your account dashboard on the website.",
      },
      {
        q: "Do I need to create an account to order?",
        a: "No. You can order as a guest. However, creating an account lets you easily view your order history and status in the future.",
      },
      {
        q: "What should I do after making a payment?",
        a: "After completing payment via bKash, Nagad, or Rocket, keep the transaction number. Our team may request it for verification if needed.",
      },
      {
        q: "Is Cash on Delivery available across Bangladesh?",
        a: "Cash on Delivery is available in most areas. However, advance payment may be required for certain products or locations.",
      },
    ],
  },
  {
    category: "Delivery",
    items: [
      {
        q: "How much is the delivery charge?",
        a: "Delivery within Dhaka costs 75 taka per kg (minimum 60 taka), and outside Dhaka costs 120 taka per kg (minimum 100 taka). The exact charge is shown at checkout.",
      },
      {
        q: "Do you deliver books and items across all of Bangladesh?",
        a: "Yes. We deliver books, puja items, and other products across Bangladesh via courier service.",
      },
      {
        q: "How will I know my order is confirmed?",
        a: "Once an order is successfully placed, confirmation is sent via WhatsApp or phone call.",
      },
      {
        q: "How long does delivery take?",
        a: "Delivery is usually completed within 2-5 business days after order confirmation; timing may vary slightly depending on distance.",
      },
      {
        q: "Which areas do you deliver to?",
        a: "We deliver across all of Bangladesh via courier service.",
      },
      {
        q: "How are fragile items shipped?",
        a: "Fragile items such as idols and lamps are packed carefully. If an item arrives damaged, let us know within 24 hours of delivery with photos/video; the details are in our Return Policy.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What should I do if I receive a damaged product?",
        a: "Let us know on WhatsApp as soon as you receive it, including photos/video if possible. See our Return Policy for detailed terms.",
      },
      {
        q: "Can I exchange a wrongly delivered product?",
        a: "Yes, if the wrong product or edition was sent, we take full responsibility and will resend the correct product at no extra cost.",
      },
      {
        q: "Can I return an opened or used product?",
        a: "No. To protect the sanctity and quality of religious books and puja items, opened, used, or worshipped-with items cannot be returned. See our Return Policy for details.",
      },
    ],
  },
  {
    category: "Address & Contact",
    items: [
      {
        q: "Where are you located?",
        a: `Our address is ${siteConfig.address.villageEn} village, ${siteConfig.address.localityEn} Upazila, ${siteConfig.address.regionEn} District.`,
      },
      {
        q: "How can I contact you?",
        a: `WhatsApp/Phone: ${siteConfig.contact.phoneDisplay}. You can also message our Facebook and YouTube (${siteConfig.brand.youtubeHandle}) pages. You can also share your feedback on our official email:\n✉️ ${siteConfig.contact.email}`,
      },
    ],
  },
];

export default function FaqPageEn() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500">
            Common questions about products, orders, delivery, and returns
          </p>
        </div>
        <FaqAccordion groups={faqGroups} locale="en" />
      </main>
    </>
  );
}
