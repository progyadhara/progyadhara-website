import { prisma } from "@/lib/prisma";
import ProductCard from "@/app/components/ProductCard";
import type { Metadata } from "next";
import Breadcrumb from "../components/Breadcrumb";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `আমাদের সকল পণ্য - ধর্মীয় বই ও পূজা উপকরণ | ${siteConfig.brand.name}`,
  description: `${siteConfig.brand.name}-এর সব পণ্য একসাথে দেখুন — হিন্দু ধর্মগ্রন্থ, গীতা, পূজার বই ও পূজার উপকরণ, সারা বাংলাদেশে হোম ডেলিভারি।`,
  alternates: {
    canonical: "/shop",
  },
};

export default async function ShopPage() {
  const [products, systemSettings] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.systemControlCenter.findUnique({ where: { id: 1 } }),
  ]);
  const deliveryMode = (systemSettings?.deliveryChargeMode ?? "NORMAL") as
    "NORMAL" | "FREE" | "HALF";
  return (
    <div>
      <Breadcrumb items={[{ label: "হোম", href: "/" }, { label: "শপ" }]} />
      <div className="max-w-7xl mx-auto px-2 py-1">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-green-800">আমাদের সকল পণ্য</h1>
          <p className="text-sm text-gray-500 mt-2">
            যত্ন সহকারে পৌঁছে দিচ্ছি আপনার কাছে
          </p>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              এখনো কোনো পণ্য যোগ করা হয়নি
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Admin panel থেকে পণ্য যোগ করুন
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                deliveryMode={deliveryMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
