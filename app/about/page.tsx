"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

/* ============================================================
   স্ক্রল-এ ভেসে ওঠার ছোট্ট Reveal wrapper — Intersection Observer দিয়ে
   ============================================================ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
   ছবি বা প্লেসহোল্ডার — src খালি ("") থাকলে সুন্দর একটা রঙিন ব্লক দেখাবে।
   ছবি পেলে শুধু নিচের তালিকার src-এ ফাইলের পাথ বসালেই ছবি চলে আসবে।
   ============================================================ */
function MediaBox({
  src,
  alt,
  emoji,
  sizes,
  priority = false,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  emoji: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-700 via-green-800 to-green-900"
    >
      <span className="text-6xl sm:text-7xl drop-shadow">{emoji}</span>
    </div>
  );
}

/* ============================================================
   হেডারের ৩টি ছবি — মোবাইলে অটো-স্লাইড, পিসিতে একসাথে
   ============================================================ */
const heroGallery = [
  {
    src: "", // ছবি পেলে এখানে যেমন: "/uploads/about-hero-1.jpg"
    emoji: "📖",
    alt: "প্রজ্ঞাধারা হিন্দু ধর্মগ্রন্থ ও ধর্মীয় বই",
    caption: "ধর্মগ্রন্থ ও ধর্মীয় বই",
  },
  {
    src: "",
    emoji: "🪔",
    alt: "প্রজ্ঞাধারা পূজার উপকরণ",
    caption: "পূজার উপকরণ",
  },
  {
    src: "",
    emoji: "🕉️",
    alt: "প্রজ্ঞাধারা ধর্মীয় জ্ঞান আহরণ ও বিস্তার",
    caption: "ধর্মীয় জ্ঞান",
  },
];

function MobileHeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % heroGallery.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="md:hidden relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
      {heroGallery.map((img, i) => (
        <div
          key={img.caption}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <MediaBox
            src={img.src}
            alt={img.alt}
            emoji={img.emoji}
            sizes="100vw"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-4 text-white text-sm font-semibold drop-shadow">
            {img.caption}
          </p>
        </div>
      ))}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {heroGallery.map((img, i) => (
          <span
            key={img.caption}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-yellow-400" : "w-1.5 bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopHeroGrid() {
  return (
    <div className="hidden md:grid grid-cols-3 gap-5">
      {heroGallery.map((img) => (
        <div
          key={img.caption}
          className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md"
        >
          <div className="absolute inset-0 animate-kenburns">
            <MediaBox
              src={img.src}
              alt={img.alt}
              emoji={img.emoji}
              sizes="33vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <p className="absolute bottom-3 left-4 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow">
            {img.caption}
          </p>
        </div>
      ))}
      <style jsx>{`
        @keyframes kenburns {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.07);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-kenburns {
          animation: kenburns 14s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ============================================================
   প্রজ্ঞাধারার সংগ্রহের ৩টি ব্লক — ডানে/বামে/ডানে ছবি
   ============================================================ */
const collection = [
  {
    id: 1,
    title: "ধর্মগ্রন্থ ও শাস্ত্র",
    emoji: "📜",
    shortDesc:
      "গীতা, রামায়ণ, মহাভারত ও পুরাণের মতো ধর্মগ্রন্থ — ধর্মীয় জ্ঞানের মূল উৎস, যা পড়ার মাধ্যমে ধর্মকে সঠিকভাবে জানা যায়।",
    fullDesc: `গীতা, রামায়ণ, মহাভারত ও পুরাণের মতো ধর্মগ্রন্থ — ধর্মীয় জ্ঞানের মূল উৎস, যা পড়ার মাধ্যমে ধর্মকে সঠিকভাবে জানা যায়।\n\nধর্মগ্রন্থই ধর্মীয় জ্ঞানের ভিত্তি। এই গ্রন্থগুলোর শিক্ষা, আদর্শ ও কাহিনির মধ্য দিয়েই ধর্মের আসল রূপ উপলব্ধি করা যায়।\n\nপ্রজ্ঞাধারার লক্ষ্য এই ধর্মগ্রন্থগুলো আগ্রহী পাঠকের হাতে সহজে পৌঁছে দেওয়া, যাতে যে কেউ নিজের ধর্মকে মূল উৎস থেকে জানতে পারেন।`,
    image: "", // ছবি পেলে যেমন: "/uploads/about-collection-1.jpg"
    side: "right" as const,
  },
  {
    id: 2,
    title: "ধর্মীয় বই ও পাঠসামগ্রী",
    emoji: "📚",
    shortDesc:
      "ধর্মের দর্শন, শিক্ষা ও জীবনচর্চা নিয়ে লেখা বই — যেগুলো পড়ে ধর্মীয় জ্ঞান আরও গভীর ও সমৃদ্ধ হয়।",
    fullDesc: `ধর্মের দর্শন, শিক্ষা ও জীবনচর্চা নিয়ে লেখা বই — যেগুলো পড়ে ধর্মীয় জ্ঞান আরও গভীর ও সমৃদ্ধ হয়।\n\nধর্মগ্রন্থের পাশাপাশি ধর্মীয় বই ও পাঠসামগ্রী ধর্মের বিষয়গুলো সহজভাবে বুঝতে সাহায্য করে। নতুন পাঠক থেকে শুরু করে যিনি ধর্ম নিয়ে আরও জানতে চান, সবার জন্যই এমন বই জরুরি।\n\nবই বিক্রির মাধ্যমে ধর্মের সাথে যুক্ত থেকে ধর্মীয় জ্ঞান ছড়িয়ে দেওয়াই প্রজ্ঞাধারার মূল কাজ।`,
    image: "",
    side: "left" as const,
  },
  {
    id: 3,
    title: "পূজার উপকরণ",
    emoji: "🪔",
    shortDesc:
      "পূজা ও ধর্মীয় আচারের প্রয়োজনীয় উপকরণ — ধর্মচর্চাকে সহজ ও সুন্দর করতে।",
    fullDesc: `পূজা ও ধর্মীয় আচারের প্রয়োজনীয় উপকরণ — ধর্মচর্চাকে সহজ ও সুন্দর করতে।\n\nধর্মীয় জ্ঞান শুধু পড়ার বিষয় নয়, চর্চারও বিষয়। পূজা ও ধর্মীয় আচার পালনের জন্য প্রয়োজনীয় উপকরণ হাতের কাছে থাকলে সেই চর্চা সহজ হয়।\n\nতাই বইয়ের পাশাপাশি পূজার উপকরণও প্রজ্ঞাধারার সংগ্রহের অংশ, যাতে জ্ঞান ও চর্চা — দুটোই এক জায়গা থেকে পাওয়া যায়।`,
    image: "",
    side: "right" as const,
  },
];

export default function AboutPage() {
  // See More-এর জন্য স্টেট
  const [showMore, setShowMore] = useState(false);
  // প্রতিটি ব্লকের জন্য আলাদাভাবে খোলা/বন্ধ অবস্থা ট্র্যাক করে
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});
  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id], // যে আইডিতে ক্লিক করা হবে, শুধু সেটির অবস্থা উল্টে যাবে
    }));
  };

  return (
    <main className="bg-white text-gray-800 font-[family-name:var(--font-hind-siliguri)]">
      {/* ===== ১. হেডার — ৩টি ছবি ===== */}
      <section className="bg-green-50">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Reveal className="text-center mb-6 sm:mb-8">
            <p className="text-green-700 text-sm font-bold tracking-wide mb-2">
              আমাদের সম্পর্কে
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 leading-snug">
              {siteConfig.brand.nameBn} — ধর্মীয় জ্ঞান আহরণ ও ছড়িয়ে দেওয়ার যাত্রা
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <MobileHeroSlider />
            <DesktopHeroGrid />
          </Reveal>
        </div>
      </section>

      {/* ===== ২. পরিচিতি — বামে লোগো/নাম, ডানে বিস্তারিত পরিচয় ===== */}
      <section className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <Reveal className="w-full md:w-56 shrink-0 mx-auto md:mx-0">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-full md:h-56 mx-auto rounded-full md:rounded-2xl overflow-hidden ring-4 ring-green-100 shadow-lg bg-[#fff8ec]">
              <Image
                src="/uploads/logo-icon.png"
                alt={`${siteConfig.brand.founderNameBn} - প্রতিষ্ঠাতা, ${siteConfig.brand.nameBn}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 208px, 224px"
              />
            </div>
            <div className="text-center md:text-left mt-4">
              <p className="font-bold text-lg text-green-900">
                {siteConfig.brand.founderNameBn}
              </p>
              <p className="text-sm text-gray-500">
                প্রতিষ্ঠাতা, {siteConfig.brand.nameBn}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex-1">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              কমল কুমার মাহাতো কে?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[15px] sm:text-base">
              <p>
                <span className="font-semibold text-green-900">
                  কমল কুমার মাহাতো
                </span>{" "}
                <span className="font-semibold text-green-900">
                  {siteConfig.brand.nameBn}
                </span>
                -র একমাত্র উদ্যোক্তা। তিনি ধর্মীয় বই বিক্রির মাধ্যমে ধর্মের সাথে
                যুক্ত থেকে ধর্মীয় জ্ঞান আহরণ করতে এবং সেই জ্ঞান মানুষের কাছে
                ছড়িয়ে দিতে চান।
              </p>
              <p>
                {siteConfig.brand.nameBn} তাঁর সেই ইচ্ছারই বাস্তব রূপ — যেখানে
                পাঠক ধর্মগ্রন্থ, ধর্মীয় বই ও পূজার উপকরণ এক জায়গায় পাবেন।
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ৩. যাত্রার গল্প — টাইমলাইন স্টাইল ===== */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-16">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
              প্রতিষ্ঠার গল্প
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              ধর্মীয় জ্ঞানের খোঁজ থেকে {siteConfig.brand.nameBn}-র জন্ম
            </p>
          </Reveal>

          <div className="relative pl-8 sm:pl-10">
            {/* উল্লম্ব টাইমলাইন থ্রেড */}
            <div className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-0.5 bg-green-200" />

            {/* ধাপ ১ — ভাবনা */}
            <Reveal className="relative mb-12">
              <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-green-600 border-4 border-green-50 shadow" />
              <span className="text-xs font-bold text-green-700 tracking-wide">
                ভাবনা
              </span>
              <h3 className="text-lg font-bold text-green-900 mt-1 mb-2">
                ধর্মীয় জ্ঞান আহরণের ইচ্ছা
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
                ধর্ম সম্পর্কে জ্ঞান আহরণ করা — এই ইচ্ছা থেকেই{" "}
                {siteConfig.brand.nameBn}-র ভাবনার শুরু। যে জ্ঞান আহরণ করা যায়,
                তা শুধু নিজের কাছে রাখার নয়, অন্যের কাছেও পৌঁছে দেওয়ার।
              </p>
            </Reveal>

            {/* ধাপ ২ — পথ */}
            <Reveal delay={80} className="relative mb-12">
              <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-green-600 border-4 border-green-50 shadow" />
              <span className="text-xs font-bold text-green-700 tracking-wide">
                পথ
              </span>
              <h3 className="text-lg font-bold text-green-900 mt-1 mb-2">
                বইয়ের মাধ্যমে ধর্মের সাথে থাকা
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base mb-3">
                ধর্মীয় বই বিক্রির মাধ্যমে ধর্মের সাথে যুক্ত থেকে ধর্মীয় জ্ঞান
                বিস্তার করাই এই যাত্রার পথ।
              </p>
              <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-green-900 font-semibold text-base sm:text-lg">
                “{siteConfig.brand.slogan}”
              </blockquote>
            </Reveal>

            {/* ধাপ ৩ — নতুন যাত্রা */}
            <Reveal delay={160} className="relative">
              <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-yellow-400 border-4 border-green-50 shadow" />
              <span className="text-xs font-bold text-green-700 tracking-wide">
                অধ্যায় ১ · ২০২৭
              </span>
              <h3 className="text-lg font-bold text-green-900 mt-1 mb-2">
                নতুন যাত্রার শুরু
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
                ২০২৭ সাল থেকে {siteConfig.brand.nameBn}-র নতুন যাত্রা শুরু হচ্ছে।
                এটা এই যাত্রার প্রথম অধ্যায়মাত্র। সময়ের সাথে নতুন নতুন অধ্যায়
                যুক্ত হবে — সেগুলো নিয়মিত প্রকাশিত হবে আমাদের{" "}
                <Link
                  href="/blog"
                  className="text-green-700 font-semibold underline underline-offset-2"
                >
                  ব্লগ পেজে
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== ৪. সংগ্রহ — ডানে/বামে/ডানে ছবি ===== */}
      <section className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
        <Reveal className="mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            {siteConfig.brand.nameBn}-য় কী পাবেন?
          </h2>
          <div className="max-w-xl">
            <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
              ধর্মগ্রন্থ, ধর্মীয় বই ও পূজার উপকরণ — ধর্মীয় জ্ঞান ও ধর্মচর্চার
              প্রয়োজনীয় জিনিস এক জায়গায় সাজিয়ে রাখাই {siteConfig.brand.nameBn}
              -র লক্ষ্য।
              {"\n\n"}
              ধর্মকে জানতে হলে প্রথমে চাই নির্ভরযোগ্য উৎস। ধর্মগ্রন্থ ও ধর্মীয়
              বইয়ের মাধ্যমে ধর্মের শিক্ষা, দর্শন ও জীবনচর্চা সম্পর্কে জানা যায়,
              আর সেই জ্ঞান জীবনে প্রয়োগ করতে সহায়তা করে পূজার উপকরণ।
              {showMore && (
                <>
                  {"\n\n"}
                  ধর্মীয় জ্ঞান আহরণ একদিনের কাজ নয়, এটা একটা ধারাবাহিক যাত্রা।
                  প্রতিটি বই সেই যাত্রার এক একটি ধাপ, যা পাঠককে ধর্মের আরও
                  গভীরে নিয়ে যায়।
                  {"\n\n"}
                  আমরা চাই, ধর্ম নিয়ে জানতে আগ্রহী প্রত্যেক মানুষ যেন নিজের
                  প্রয়োজনের বইটি সহজে খুঁজে পান এবং সেই জ্ঞান নিজের পরিবার ও
                  পরিচিতজনের মাঝেও ছড়িয়ে দিতে পারেন।
                  {"\n\n"}
                  কমল কুমার মাহাতো একাই এই উদ্যোগ পরিচালনা করেন। ধর্মের সাথে
                  থেকে ধর্মীয় বই বিক্রি করা এবং এর মাধ্যমে ধর্মীয় জ্ঞান বিস্তার
                  করাই তাঁর লক্ষ্য।
                </>
              )}
            </p>

            {/* See More / See Less Button */}
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-3 text-sm font-bold text-green-700 hover:text-green-900 transition underline focus:outline-none"
            >
              {showMore ? "কম দেখুন" : "আরও পড়ুন (See More)"}
            </button>
          </div>
        </Reveal>

        <div className="flex flex-col gap-14 sm:gap-16">
          {collection.map((item, idx) => (
            <div key={item.id}>
              <Reveal>
                <div
                  className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center ${
                    item.side === "right" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="relative w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-md group">
                    <MediaBox
                      src={item.image}
                      alt={item.title}
                      emoji={item.emoji}
                      sizes="(max-width: 768px) 100vw, 288px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs font-bold text-green-700 tracking-wide">
                      {String(item.id).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-green-900 mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
                      {expandedSections[item.id]
                        ? item.fullDesc
                        : item.shortDesc}
                    </p>
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="mt-3 text-sm font-bold text-green-700 hover:text-green-900 transition underline focus:outline-none"
                    >
                      {expandedSections[item.id]
                        ? "কম দেখুন"
                        : "আরও পড়ুন (See More)"}
                    </button>
                  </div>
                </div>
              </Reveal>

              {idx < collection.length - 1 && (
                <div className="flex justify-center mt-8">
                  <span className="text-green-700 text-lg">↓</span>
                </div>
              )}
            </div>
          ))}

          <Reveal className="flex items-center justify-center gap-2 pt-2 text-sm text-gray-500">
            <span className="text-green-700">↺</span>
            <span>জ্ঞান থেকে চর্চা, আবার নতুন জ্ঞানের খোঁজে</span>
          </Reveal>
        </div>
      </section>

      {/* ===== ৫. মিশন ও ভিশন ===== */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
              আমাদের মিশন ও ভিশন
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-green-100">
              <span className="text-3xl">🎯</span>
              <h3 className="text-lg font-bold text-green-900 mt-3 mb-2">
                মিশন
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                ধর্মীয় বই, ধর্মগ্রন্থ ও পূজার উপকরণ মানুষের কাছে সহজে পৌঁছে
                দিয়ে ধর্মীয় জ্ঞান বাড়ানো — এটাই আমাদের মূল লক্ষ্য।
              </p>
            </Reveal>
            <Reveal
              delay={100}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-green-100"
            >
              <span className="text-3xl">📖</span>
              <h3 className="text-lg font-bold text-green-900 mt-3 mb-2">
                ভিশন
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                ধর্মীয় জ্ঞানে সমৃদ্ধ একটি সমাজ গড়ে তোলা, যেখানে প্রত্যেক মানুষ
                নিজের ধর্মকে জানার ও বোঝার সুযোগ পায়।
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== ৬. আমাদের দর্শন ===== */}
      <section className="max-w-3xl mx-auto px-4 py-14 sm:py-16 text-center">
        <Reveal>
          <h2 className="text-sm font-bold tracking-wide text-green-700 mb-3">
            আমাদের দর্শন
          </h2>
          <p className="text-green-900 font-semibold text-lg sm:text-xl leading-relaxed">
            {siteConfig.brand.slogan}
          </p>
          <p className="text-gray-700 text-[15px] leading-relaxed mt-3 max-w-xl mx-auto">
            ধর্মীয় জ্ঞানই জীবনের পথ দেখায়। সেই জ্ঞান আহরণ করা আর অন্যের কাছে
            ছড়িয়ে দেওয়াই আমাদের কাজ।
          </p>
        </Reveal>
      </section>

      {/* ===== ৭. ভিডিও / ছবি — YouTube ও গ্যালারি ===== */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-16 text-center">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-3">
              আমাদের সাথে থাকুন — ভিডিও ও ছবিতে
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
              {siteConfig.brand.nameBn}-র ভিডিও ও ছবির আপডেট দেখুন।
            </p>
          </Reveal>
          <Reveal
            delay={100}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-5 py-2.5 rounded-full text-sm transition"
            >
              YouTube চ্যানেল
            </a>
            <Link
              href="/media/video"
              className="inline-flex items-center gap-2 bg-white border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-5 py-2.5 rounded-full text-sm transition"
            >
              ভিডিও গ্যালারি
            </Link>
            <Link
              href="/media/image"
              className="inline-flex items-center gap-2 bg-white border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-5 py-2.5 rounded-full text-sm transition"
            >
              ছবির গ্যালারি
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== ৮. শেষ CTA ===== */}
      <section className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
        <Reveal className="bg-white border border-gray-100 rounded-2xl px-6 py-10 sm:py-12 text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-2">
            জ্ঞানের ধারায় যুক্ত হোন
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-7">
            ধর্মগ্রন্থ, ধর্মীয় বই ও পূজার উপকরণ — সরাসরি অর্ডার করুন।
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-full text-sm transition"
            >
              বই ও উপকরণ দেখুন
            </Link>
            <Link
              href="/contact"
              className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-6 py-3 rounded-full text-sm transition"
            >
              যোগাযোগ
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}