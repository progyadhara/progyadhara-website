import { Resend } from "resend";
import { siteConfig } from "@/lib/siteConfig";

let resend: Resend | null = null;
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY ?? "");
  }
  return resend;
}

export async function sendOtpEmail(
  to: string,
  otp: string,
  locale: "bn" | "en" = "bn",
) {
  const isEn = locale === "en";
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  await getResend().emails.send({
    from: `${siteConfig.brand.nameEn} <${from}>`,
    to,
    subject: isEn
      ? `Your verification code — ${siteConfig.brand.nameEn}`
      : `আপনার ভেরিফিকেশন কোড — ${siteConfig.brand.nameBn}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color:#1B4332;">${isEn ? `${siteConfig.brand.nameEn} Investment Verification` : `${siteConfig.brand.nameBn} বিনিয়োগ ভেরিফিকেশন`}</h2>
        <p>${isEn ? "Your verification code:" : "আপনার ভেরিফিকেশন কোড:"}</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p style="color:#888; font-size: 13px;">${isEn ? "This code is valid for 5 minutes. If you did not make this request, please ignore this email." : "এই কোডটি ৫ মিনিটের জন্য কার্যকর থাকবে। আপনি যদি এই অনুরোধ না করে থাকেন, এই ইমেইলটি উপেক্ষা করুন।"}</p>
      </div>
    `,
  });
}