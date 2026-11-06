// লাইভ চ্যাটের ডিফল্ট স্বাগতম বার্তা — সার্ভার (chat/send) আর ক্লায়েন্ট (ChatWidget)
// দুই জায়গাতেই একই টেক্সট ব্যবহারের জন্য এক জায়গায় রাখা হলো।
// ফোন নম্বর ও সোশ্যাল লিংক siteConfig থেকে আসে।
import { siteConfig } from "@/lib/siteConfig";

const phone = siteConfig.contact.phoneDisplay;
const facebook = siteConfig.social.facebook;
const youtube = siteConfig.social.youtube;

export const CHAT_WELCOME_TEXT =
  `প্রজ্ঞাধারায় আপনাকে স্বাগতম 🙏\n\n` +
  `আমরা ধর্মীয় বই, ধর্মগ্রন্থ ও পূজা উপকরণ সারা বাংলাদেশে আপনার দরজায় পৌঁছে দিই।\n\n` +
  `আপনাকে কীভাবে সাহায্য করতে পারি? আপনার প্রশ্নটি নিচে লিখে দিন, আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যুক্ত হবেন।\n\n` +
  `📞 দ্রুত উত্তরের জন্য কল বা হোয়াটসঅ্যাপ করুন: ${phone}\n\n` +
  `🌐 আমাদের ফেসবুক পেজ ও ইউটিউব চ্যানেল ঘুরে আসতে পারেন:\n` +
  `- [Facebook](${facebook})\n` +
  `- [YouTube](${youtube})`;

// ইংরেজি (/en) ভিজিটরদের জন্য একই বার্তা
export const CHAT_WELCOME_TEXT_EN =
  `Welcome to Progyadhara 🙏\n\n` +
  `We deliver religious books, sacred scriptures and puja accessories to your doorstep across Bangladesh.\n\n` +
  `How can we help you? Type your question below and our representative will join you shortly.\n\n` +
  `📞 For a quick reply, call or WhatsApp: ${phone}\n\n` +
  `🌐 You can also visit our Facebook page and YouTube channel:\n` +
  `- [Facebook](${facebook})\n` +
  `- [YouTube](${youtube})`;