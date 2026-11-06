import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  // শুধু নেভিগেশন মেনু মুছবে, অন্য কোনো টেবিলে হাত দেবে না
  await prisma.navigationMenu.deleteMany();

  await prisma.navigationMenu.create({
    data: { title: "শপ", titleEn: "Shop", url: "/shop", displayOrder: 1 },
  });
  await prisma.navigationMenu.create({
    data: { title: "ব্লগ", titleEn: "Blog", url: "/blog", displayOrder: 2 },
  });

  const media = await prisma.navigationMenu.create({
    data: {
      title: "মিডিয়া",
      titleEn: "Media",
      url: "/media/image",
      displayOrder: 3,
    },
  });
  await prisma.navigationMenu.createMany({
    data: [
      {
        title: "ছবি",
        titleEn: "Images",
        url: "/media/image",
        displayOrder: 1,
        parentId: media.id,
      },
      {
        title: "ভিডিও",
        titleEn: "Videos",
        url: "/media/video",
        displayOrder: 2,
        parentId: media.id,
      },
    ],
  });

  await prisma.navigationMenu.create({
    data: {
      title: "আমাদের সম্পর্কে",
      titleEn: "About Us",
      url: "/about",
      displayOrder: 4,
    },
  });
  await prisma.navigationMenu.create({
    data: {
      title: "যোগাযোগ",
      titleEn: "Contact",
      url: "/contact",
      displayOrder: 5,
    },
  });

  console.log("✅ মেনু তৈরি হয়েছে");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());