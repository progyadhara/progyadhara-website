import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  const [phone, password, name = "Admin"] = process.argv.slice(2);
  if (!phone || !password) {
    console.log(
      'ব্যবহার: npx tsx scripts/create-admin.ts <ফোন> <পাসওয়ার্ড> "<নাম>"',
    );
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { phone },
    update: { password: hash, role: "SUPER_ADMIN", isActive: true, name },
    create: { phone, name, password: hash, role: "SUPER_ADMIN" },
  });
  console.log("✅ অ্যাডমিন তৈরি হয়েছে:", user.phone, user.role);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());