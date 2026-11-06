// scripts/rebrand.mjs
// কাজ: কোডে হাতে লেখা "Farmer Kamol" নাম ও localStorage কী খুঁজে siteConfig থেকে নেওয়ার কোডে বদলে দেয়।
// ব্যবহার:
//   node scripts/rebrand.mjs          → শুধু দেখায় কী কী বদলাবে (কিছু লেখে না)
//   node scripts/rebrand.mjs --write  → আসলে ফাইলে বদল করে
// ক্লায়েন্ট সাইটের জন্য: নিচের OLD_NAME আর OLD_STORAGE_PREFIX বদলে একই কমান্ড চালালেই হবে।

import fs from "fs";
import path from "path";

const WRITE = process.argv.includes("--write");

// ===== শুধু এই অংশটা বদলাবেন =====
const OLD_NAME = "Farmer Kamol"; // পুরনো নাম যা কোডে লেখা আছে
const OLD_STORAGE_PREFIX = "farmer_kamol_"; // পুরনো localStorage কী-এর শুরু
// ==================================

const ROOTS = ["app", "lib"];
const EXTS = [".ts", ".tsx"];
const SKIP_DIRS = new Set(["node_modules", ".next", path.join("app", "development")]);
const SKIP_FILES = new Set([path.join("lib", "siteConfig.ts")]);
const IMPORT_LINE = 'import { siteConfig } from "@/lib/siteConfig";';

// পুরনো কী → siteConfig.storage-এর ফিল্ড
const STORAGE_MAP = {
  [`${OLD_STORAGE_PREFIX}cart_dismissed_at`]: "cartDismissKey",
  [`${OLD_STORAGE_PREFIX}cart`]: "cartKey",
  [`${OLD_STORAGE_PREFIX}notice_last_shown`]: "noticeKey",
};

const hasBengali = (s) => /[\u0980-\u09FF]/.test(s);
const isComment = (l) => /^\s*(\/\/|\/\*|\*|\{\/\*)/.test(l);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name) && !SKIP_DIRS.has(p)) walk(p, out);
    } else if (EXTS.includes(path.extname(e.name)) && !SKIP_FILES.has(p)) {
      out.push(p);
    }
  }
  return out;
}

function fixLine(line) {
  if (isComment(line)) return line;
  let out = line;

  // ১) localStorage কী
  for (const [oldKey, field] of Object.entries(STORAGE_MAP)) {
    const re = new RegExp(`(["'\`])${esc(oldKey)}\\1`, "g");
    out = out.replace(re, `siteConfig.storage.${field}`);
  }

  // ২) নাম
  if (!out.includes(OLD_NAME)) return out;
  const exprFor = (text) => `siteConfig.brand.${hasBengali(text) ? "nameBn" : "nameEn"}`;
  const nameRe = new RegExp(esc(OLD_NAME), "g");

  // ২ক) স্ট্রিং লিটারালের ভেতরে থাকলে → টেমপ্লেট স্ট্রিং
  const strRe = new RegExp(
    `(["'])((?:\\\\.|(?!\\1)[^\\\\\\n])*?${esc(OLD_NAME)}(?:\\\\.|(?!\\1)[^\\\\\\n])*?)\\1`,
    "g",
  );
  out = out.replace(strRe, (m, q, body, offset, whole) => {
    const tpl = "`" + body.replace(/`/g, "\\`").replace(nameRe, "${" + exprFor(body) + "}") + "`";
    const isAttr = /[\w-]=$/.test(whole.slice(0, offset));
    return isAttr ? "{" + tpl + "}" : tpl;
  });

  // ২খ) বাকি জায়গা (JSX টেক্সট বা আগে থেকেই টেমপ্লেটের ভেতরে)
  if (out.includes(OLD_NAME)) {
    out = out.replace(nameRe, (m, offset, whole) => {
      const ticks = (whole.slice(0, offset).match(/`/g) || []).length;
      const e = exprFor(whole);
      return ticks % 2 === 1 ? "${" + e + "}" : "{" + e + "}";
    });
  }
  return out;
}

function ensureImport(lines) {
  const text = lines.join("\n");
  if (!text.includes("siteConfig.")) return lines;
  if (/import\s*\{[^}]*\bsiteConfig\b[^}]*\}\s*from/.test(text)) return lines;
  let lastImportEnd = -1;
  let inImport = false;
  for (let i = 0; i < Math.min(lines.length, 120); i++) {
    const l = lines[i];
    if (!inImport && /^import\b/.test(l)) {
      if (/(from\s+["'][^"']+["']|^import\s+["'][^"']+["'])\s*;?\s*$/.test(l)) lastImportEnd = i;
      else inImport = true;
    } else if (inImport && /from\s+["'][^"']+["']\s*;?\s*$/.test(l)) {
      inImport = false;
      lastImportEnd = i;
    }
  }
  if (lastImportEnd >= 0) {
    lines.splice(lastImportEnd + 1, 0, IMPORT_LINE);
  } else {
    const d = lines.findIndex((l) => /^\s*["']use (client|server)["']/.test(l));
    lines.splice(d >= 0 ? d + 1 : 0, 0, ...(d >= 0 ? ["", IMPORT_LINE] : [IMPORT_LINE, ""]));
  }
  return lines;
}

let changedFiles = 0;
let changedLines = 0;
const files = ROOTS.flatMap((r) => walk(r));

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const lines = raw.split(/\r?\n/);
  const report = [];
  const next = lines.map((l, i) => {
    const n = fixLine(l);
    if (n !== l) report.push([i + 1, l.trim(), n.trim()]);
    return n;
  });
  if (!report.length) continue;

  changedFiles++;
  changedLines += report.length;
  console.log(`\n${file}`);
  for (const [ln, a, b] of report) {
    console.log(`  ${ln}:  - ${a.slice(0, 110)}`);
    console.log(`  ${" ".repeat(String(ln).length)}   + ${b.slice(0, 110)}`);
  }
  if (WRITE) fs.writeFileSync(file, ensureImport(next).join(eol), "utf8");
}

console.log(
  `\n${WRITE ? "✅ বদল হয়েছে" : "👀 শুধু দেখানো হলো (কিছু লেখা হয়নি)"}: ${changedFiles}টা ফাইল, ${changedLines}টা লাইন`,
);
if (!WRITE && changedFiles) console.log("আসলে বদলাতে চালান: node scripts/rebrand.mjs --write");