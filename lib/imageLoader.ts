export default function supabaseImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Supabase/external URL হলে সরাসরি ব্যবহার হবে, নাহলে নিজেদের ডোমেইনের সাথে জোড়া লাগানো হবে
  // লোকাল ছবি ডেভেলপমেন্টে সরাসরি, প্রোডাকশনে নিজের ডোমেইন থেকে
  if (!src.startsWith("http") && process.env.NODE_ENV !== "production") {
    return src;
  }

  const absoluteSrc = src.startsWith("http")
    ? src
    : `https://progyadhara.com${src}`;

  const params = new URLSearchParams({
    url: absoluteSrc,
    w: String(width),
    q: String(quality || 75),
    output: "webp",
  });

  return `https://images.weserv.nl/?${params.toString()}`;
}
