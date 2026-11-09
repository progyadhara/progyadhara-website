import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/app/components/Breadcrumb";

export const revalidate = 86400;

export async function generateMetadata() {
  return {
    title: `ব্লগ - ধর্মগ্রন্থ, পূজা ও জীবনদর্শন | ${siteConfig.brand.name}`,
    description: `${siteConfig.brand.name}-এর ব্লগে পড়ুন গীতা ও ধর্মগ্রন্থ, পূজা-উপাসনা ও জীবনদর্শন সম্পর্কে সহজ ভাষায় লেখা ও গাইড।`,
    alternates: {
      canonical: "/blog",
      languages: {
        bn: "/blog",
        en: "/en/blog",
      },
    },
  };
}


export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category || "সব";

  const dbCategories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });
  const categories = ["সব", ...dbCategories.map((c) => c.name)];

  const blogs = await prisma.blog.findMany({
    where: {
      isPublished: true,
      ...(activeCategory !== "সব" ? { category: activeCategory } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "ব্লগ" }]} />
      <div className="max-w-6xl mx-auto px-1 py-16 pt-8 text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          আমাদের ব্লগ
        </h1>
        <p className="text-gray-500 mb-8">ধর্মগ্রন্থ, পূজা ও জীবনদর্শন বিষয়ক লেখা</p>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "সব"
                  ? "/blog"
                  : `/blog?category=${encodeURIComponent(cat)}`
              }
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-green-700 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Blog List */}
        {blogs.length === 0 ? (
          <p className="text-gray-500">কোনো blog নেই।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
              >
                {blog.image && blog.image.startsWith("/") && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}
                <div className="p-4 text-left">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <h2 className="text-lg font-bold text-green-800 mt-2 group-hover:text-green-600 transition">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-xs mt-2">
                    {blog.createdAt.toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
