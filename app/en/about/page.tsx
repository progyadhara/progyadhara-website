"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

/* ============================================================
   Small scroll Reveal wrapper — via Intersection Observer
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
   Media Box — fallback to colored gradient block if src is empty
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
   Header's 3 images — auto-slide on mobile, all at once on desktop
   ============================================================ */
const heroGallery = [
  {
    src: "", // Path e.g. "/uploads/about-hero-1.jpg"
    emoji: "📖",
    alt: "Progyadhara Sacred Scriptures & Religious Books",
    caption: "Scriptures & Books",
  },
  {
    src: "",
    emoji: "🪔",
    alt: "Progyadhara Worship Essentials & Ritual Items",
    caption: "Worship Essentials",
  },
  {
    src: "",
    emoji: "🕉️",
    alt: "Progyadhara Religious Knowledge & Spreading Wisdom",
    caption: "Spiritual Knowledge",
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
   Progyadhara Collection — 3 blocks, image right / left / right
   ============================================================ */
const collection = [
  {
    id: 1,
    title: "Sacred Scriptures & Holy Texts",
    emoji: "📜",
    shortDesc:
      "Holy scriptures like the Gita, Ramayana, Mahabharata, and Puranas — the authentic roots of religious knowledge that guide proper spiritual understanding.",
    fullDesc: `Holy scriptures like the Gita, Ramayana, Mahabharata, and Puranas — the authentic roots of religious knowledge that guide proper spiritual understanding.\n\nScriptures form the foundation of religious wisdom. Through their teachings, ideals, and timeless narratives, one can truly comprehend the essence of righteousness.\n\nProgyadhara aims to make these sacred texts easily accessible to enthusiastic readers, enabling everyone to learn religion directly from its original sources.`,
    image: "", // e.g., "/uploads/about-collection-1.jpg"
    side: "right" as const,
  },
  {
    id: 2,
    title: "Religious Books & Reading Materials",
    emoji: "📚",
    shortDesc:
      "Books written on philosophy, teachings, and spiritual lifestyle — essential reading to deepen and enrich religious knowledge.",
    fullDesc: `Books written on philosophy, teachings, and spiritual lifestyle — essential reading to deepen and enrich religious knowledge.\n\nAlongside core scriptures, religious literature helps explain complex spiritual concepts in simple terms. These texts are valuable for both beginners and seekers looking for deeper insights.\n\nPromoting and spreading sacred knowledge by offering accessible religious books is at the core of Progyadhara's mission.`,
    image: "",
    side: "left" as const,
  },
  {
    id: 3,
    title: "Worship Essentials & Ritual Items",
    emoji: "🪔",
    shortDesc:
      "Essential items required for Puja and religious rituals — dedicated to making spiritual practice seamless and graceful.",
    fullDesc: `Essential items required for Puja and religious rituals — dedicated to making spiritual practice seamless and graceful.\n\nReligious knowledge is not only meant to be read, but also practiced. Having essential worship items readily accessible makes daily spiritual devotion easier.\n\nThat is why worship items are an integral part of Progyadhara's collection, bringing knowledge and ritual practice under one roof.`,
    image: "",
    side: "right" as const,
  },
];

export default function AboutPageEn() {
  const [showMore, setShowMore] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  const toggleSection = (id: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="bg-white text-gray-800">
      {/* ===== 1. HEADER — 3 Images ===== */}
      <section className="bg-green-50">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <Reveal className="text-center mb-6 sm:mb-8">
            <p className="text-green-700 text-sm font-bold tracking-wide mb-2">
              About Us
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 leading-snug">
              {siteConfig.brand.nameEn} — A Journey of Gathering and Spreading Spiritual Knowledge
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <MobileHeroSlider />
            <DesktopHeroGrid />
          </Reveal>
        </div>
      </section>

      {/* ===== 2. IDENTITY — Logo/Founder left, Intro right ===== */}
      <section className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <Reveal className="w-full md:w-56 shrink-0 mx-auto md:mx-0">
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-full md:h-56 mx-auto rounded-full md:rounded-2xl overflow-hidden ring-4 ring-green-100 shadow-lg bg-[#fff8ec]">
              <Image
                src="/uploads/logo-icon.png"
                alt={`${siteConfig.brand.founderName} - Founder, ${siteConfig.brand.nameEn}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 208px, 224px"
              />
            </div>
            <div className="text-center md:text-left mt-4">
              <p className="font-bold text-lg text-green-900">
                {siteConfig.brand.founderName}
              </p>
              <p className="text-sm text-gray-500">
                Founder, {siteConfig.brand.nameEn}
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex-1">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Who Is Kamol Kumar Mahato?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-[15px] sm:text-base">
              <p>
                <span className="font-semibold text-green-900">
                  Kamol Kumar Mahato
                </span>{" "}
                is the sole founder of{" "}
                <span className="font-semibold text-green-900">
                  {siteConfig.brand.nameEn}
                </span>
                . His vision is to stay connected with spiritual values through offering sacred literature, acquiring religious wisdom, and sharing that knowledge with everyone.
              </p>
              <p>
                {siteConfig.brand.nameEn} is the real manifestation of that goal — a dedicated space where readers can conveniently find sacred scriptures, religious books, and worship essentials together.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 3. TIMELINE STORY ===== */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-16">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
              The Founding Story
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Born from the quest for authentic religious knowledge — {siteConfig.brand.nameEn}
            </p>
          </Reveal>

          <div className="relative pl-8 sm:pl-10">
            <div className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-0.5 bg-green-200" />

            {/* Step 1 */}
            <Reveal className="relative mb-12">
              <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-green-600 border-4 border-green-50 shadow" />
              <span className="text-xs font-bold text-green-700 tracking-wide">
                Inspiration
              </span>
              <h3 className="text-lg font-bold text-green-900 mt-1 mb-2">
                Desire to Acquire Sacred Knowledge
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
                The journey began with an earnest desire to study religious wisdom. Acquired wisdom is not meant to be kept to oneself, but to be shared with others.
              </p>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={80} className="relative mb-12">
              <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-green-600 border-4 border-green-50 shadow" />
              <span className="text-xs font-bold text-green-700 tracking-wide">
                The Path
              </span>
              <h3 className="text-lg font-bold text-green-900 mt-1 mb-2">
                Connecting Through Books
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base mb-3">
                Spreading religious wisdom while staying deeply connected to sacred texts forms the foundation of this journey.
              </p>
              <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-green-900 font-semibold text-base sm:text-lg">
                &ldquo;{siteConfig.brand.slogan}&rdquo;
              </blockquote>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={160} className="relative">
              <span className="absolute -left-8 sm:-left-10 top-1 w-5 h-5 rounded-full bg-yellow-400 border-4 border-green-50 shadow" />
              <span className="text-xs font-bold text-green-700 tracking-wide">
                Chapter 1 · 2027
              </span>
              <h3 className="text-lg font-bold text-green-900 mt-1 mb-2">
                Beginning of a New Chapter
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
                A new phase for {siteConfig.brand.nameEn} starts in 2027. This marks just the first chapter. More milestones will unfold and be shared regularly on our{" "}
                <Link
                  href="/en/blog"
                  className="text-green-700 font-semibold underline underline-offset-2"
                >
                  blog page
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 4. COLLECTION & CONTENT ===== */}
      <section className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
        <Reveal className="mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            What You Will Find at {siteConfig.brand.nameEn}
          </h2>
          <div className="max-w-xl">
            <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">
              Sacred scriptures, religious books, and worship essentials — bringing everything needed for spiritual growth and devotion together in one place is the main goal of {siteConfig.brand.nameEn}.
              {"\n\n"}
              Understanding religion begins with reliable sources. Scriptures and books illuminate the philosophy and life lessons of righteousness, while worship materials assist in practicing those virtues in daily life.
              {showMore && (
                <>
                  {"\n\n"}
                  Gathering religious knowledge is not a single day's effort; it is a continuous lifelong journey. Every book serves as a stepping stone that takes the reader deeper into true understanding.
                  {"\n\n"}
                  We want every seeker of sacred wisdom to easily find the books they need and share that light of knowledge with their family and loved ones.
                  {"\n\n"}
                  Kamol Kumar Mahato leads this initiative independently with the sole aspiration of serving religious wisdom and making genuine spiritual books accessible to all.
                </>
              )}
            </p>

            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-3 text-sm font-bold text-green-700 hover:text-green-900 transition underline focus:outline-none"
            >
              {showMore ? "See Less" : "See More"}
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
                      {expandedSections[item.id] ? "See Less" : "See More"}
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
            <span>From knowledge to practice, continuing the continuous search for wisdom</span>
          </Reveal>
        </div>
      </section>

      {/* ===== 5. MISSION & VISION ===== */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
              Our Mission & Vision
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-green-100">
              <span className="text-3xl">🎯</span>
              <h3 className="text-lg font-bold text-green-900 mt-3 mb-2">
                Mission
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                To enrich spiritual knowledge by delivering scriptures, religious books, and worship essential items conveniently to people.
              </p>
            </Reveal>
            <Reveal
              delay={100}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-green-100"
            >
              <span className="text-3xl">📖</span>
              <h3 className="text-lg font-bold text-green-900 mt-3 mb-2">
                Vision
              </h3>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                To nurture a society enriched with religious wisdom, where every individual has the opportunity to understand and practice righteousness.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== 6. PHILOSOPHY ===== */}
      <section className="max-w-3xl mx-auto px-4 py-14 sm:py-16 text-center">
        <Reveal>
          <h2 className="text-sm font-bold tracking-wide text-green-700 mb-3">
            Our Philosophy
          </h2>
          <p className="text-green-900 font-semibold text-lg sm:text-xl leading-relaxed">
            {siteConfig.brand.slogan}
          </p>
          <p className="text-gray-700 text-[15px] leading-relaxed mt-3 max-w-xl mx-auto">
            Religious wisdom illuminates the path of life. Gathering that wisdom and sharing it with others is our purpose.
          </p>
        </Reveal>
      </section>

      {/* ===== 7. MEDIA & SOCIALS ===== */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-16 text-center">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-3">
              Stay Connected — Through Videos & Photos
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-md mx-auto">
              Follow updates, video series, and photos from {siteConfig.brand.nameEn}.
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
              YouTube Channel
            </a>
            <Link
              href="/en/media/video"
              className="inline-flex items-center gap-2 bg-white border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-5 py-2.5 rounded-full text-sm transition"
            >
              Video Gallery
            </Link>
            <Link
              href="/en/media/image"
              className="inline-flex items-center gap-2 bg-white border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-5 py-2.5 rounded-full text-sm transition"
            >
              Photo Gallery
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== 8. FINAL CTA ===== */}
      <section className="max-w-4xl mx-auto px-4 py-14 sm:py-16">
        <Reveal className="bg-white border border-gray-100 rounded-2xl px-6 py-10 sm:py-12 text-center shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-2">
            Join the Stream of Knowledge
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-7">
            Sacred scriptures, religious books, and worship materials — order directly today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/en/shop"
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-full text-sm transition"
            >
              View Books & Essentials
            </Link>
            <Link
              href="/en/contact"
              className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-6 py-3 rounded-full text-sm transition"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}