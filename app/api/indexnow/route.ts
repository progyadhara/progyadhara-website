// app/api/indexnow/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/siteConfig";
import { seoLandings } from "@/lib/seoLandings";
import { submitToIndexNow } from "@/lib/indexnow";

const BASE_URL = siteConfig.domain.url;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  // Secret চেক (env থেকে)
  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // ---------- Static + Landing pages ----------
    const staticPages = [
      ...seoLandings.map((l) => `${BASE_URL}/${l.slug}`),
      BASE_URL,
      `${BASE_URL}/shop`,
      `${BASE_URL}/about`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/faq`,
      `${BASE_URL}/privacy-policy`,
      `${BASE_URL}/terms`,
      `${BASE_URL}/return-policy`,
      `${BASE_URL}/media/video`,
      `${BASE_URL}/media/image`,

      // English versions
      `${BASE_URL}/en`,
      `${BASE_URL}/en/shop`,
      `${BASE_URL}/en/about`,
      `${BASE_URL}/en/blog`,
      `${BASE_URL}/en/contact`,
      `${BASE_URL}/en/faq`,
      `${BASE_URL}/en/privacy-policy`,
      `${BASE_URL}/en/terms`,
      `${BASE_URL}/en/return-policy`,
      `${BASE_URL}/en/media/video`,
      `${BASE_URL}/en/media/image`,
    ];

    // ---------- Products ----------
    const products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true },
    });

    const productPages = products
      .filter((p) => p.slug && p.slug.trim() !== "")
      .flatMap((p) => [
        `${BASE_URL}/shop/${p.slug}`,
        `${BASE_URL}/en/shop/${p.slug}`,
      ]);

    // ---------- Blogs ----------
    const posts = await prisma.blog.findMany({
      where: { isPublished: true },
      select: { slug: true, slugEn: true },
    });

    const blogPages = posts.flatMap((post) => {
      const pages = [`${BASE_URL}/blog/${post.slug}`];
      if (post.slugEn && post.slugEn.trim() !== "") {
        pages.push(`${BASE_URL}/en/blog/${post.slugEn}`);
      }
      return pages;
    });

    // সব একত্রিত
    const allUrls = [
      ...staticPages,
      ...productPages,
      ...blogPages,
    ];

    const result = await submitToIndexNow(allUrls);

    return NextResponse.json({
      success: result.success,
      submitted: result.submitted,
      totalCollected: allUrls.length,
      message: result.message,
    });
  } catch (error: any) {
    console.error("IndexNow full submit error:", error);
    return NextResponse.json(
      { error: "Internal error", details: error?.message },
      { status: 500 }
    );
  }
}