import type { KbEntry } from "../support-kit/types";
export type { KbEntry };

export const KB: KbEntry[] = [
  {
    id: "what",
    title: "What MeetMind does",
    keywords: ["MeetMind", "meeting-mind-mvp", "what", "product", "about", "Turn any meeting into clear, actionable notes"],
    body: "Turn any meeting into clear, actionable notes. Paste a transcript or jot the topic and get AI-generated meeting minutes in seconds \\u2014 a tight summary, the key decisions, and action items with owners and due dates.",
    source: "MeetMind product definition",
    tags: [],
  },
  {
    id: "features",
    title: "MeetMind features",
    keywords: ["features", "feature", "can", "does", "Summary, decisions and action items", "Auto-assigned owners and due dates", "Multiple formats (bullets, email, Slack)", "One-click follow-up draft"],
    body: "MeetMind includes: Summary, decisions and action items; Auto-assigned owners and due dates; Multiple formats (bullets, email, Slack); One-click follow-up draft. It does not add capabilities that are not listed here.",
    source: "MeetMind feature list",
    tags: [],
  },
  {
    id: "pricing",
    title: "MeetMind pricing",
    keywords: ["price", "pricing", "plan", "cost", "billing", "subscription", "monthly", "yearly"],
    body: "Listed prices for MeetMind: $29/month and $290/year. Checkout uses the in-app checkout route. This assistant cannot change a subscription or issue a refund.",
    source: "MeetMind pricing fields",
    tags: [],
  },
  {
    id: "howto",
    title: "How to use MeetMind",
    keywords: ["how", "start", "use", "tool", "run", "Generate meeting notes"],
    body: "Open MeetMind and use Generate meeting notes. The form asks for: Meeting notes or transcript; Output format; Tone.",
    source: "MeetMind tool fields",
    tags: [],
  },
  {
    id: "faq-1",
    title: "What is MeetMind?",
    keywords: ["What", "is", "MeetMind?"],
    body: "MeetMind is a tool that turns a transcript or topic into meeting minutes: summary, decisions, and action items with owners and due dates.",
    source: "MeetMind FAQ",
    tags: [],
  },
  {
    id: "faq-2",
    title: "What do I paste in?",
    keywords: ["What", "do", "I", "paste", "in?"],
    body: "A transcript or just the meeting topic.",
    source: "MeetMind FAQ",
    tags: [],
  },
  {
    id: "faq-3",
    title: "Does it assign action items?",
    keywords: ["Does", "it", "assign", "action", "items?"],
    body: "It auto-assigns owners and due dates to action items.",
    source: "MeetMind FAQ",
    tags: [],
  },
  {
    id: "honesty",
    title: "What this assistant will not claim",
    keywords: ["legal", "advice", "guarantee", "demo", "human", "refund", "support"],
    body: "Answers about MeetMind are decision support only, not legal, tax, accessibility-certification, or compliance sign-off. This assistant does not invent integrations, SSO, CSV export, or Slack connections unless they are already in the product description. If live AI is unavailable, the product must not pretend a demo result is live. Say you want a human and leave an email if you need a person.",
    source: "MeetMind support policy",
    tags: ["compliance"],
  },
];

function normalize(s: string): string {
  return (s || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
}
function toWords(s: string): string[] {
  return normalize(s).split(/\s+/).map((w) => w.trim()).filter(Boolean);
}
function cjkBigrams(s: string): string[] {
  const grams: string[] = [];
  const han = /[\u4e00-\u9fff]/;
  for (const w of toWords(s)) {
    if (han.test(w) && w.length >= 2) {
      for (let i = 0; i < w.length - 1; i++) grams.push(w.slice(i, i + 2));
    }
  }
  return grams;
}
function scoreEntry(entry: KbEntry, query: string): number {
  const q = normalize(query);
  const qWords = new Set(toWords(q));
  const qGrams = new Set(cjkBigrams(q));
  let s = 0;
  for (const kw of entry.keywords) {
    const k = kw.toLowerCase();
    if (q.includes(k)) s += 3;
  }
  for (const tw of toWords(entry.title)) {
    if (qWords.has(tw)) s += 2;
  }
  const idx = normalize(entry.keywords.join(" ") + " " + entry.title + " " + entry.body.slice(0, 400));
  for (const g of qGrams) if (idx.includes(g)) s += 0.5;
  return s;
}

export interface RetrieveResult {
  entries: KbEntry[];
  topScore: number;
}

export function retrieve(query: string, topK = 4, entries: KbEntry[] = KB): RetrieveResult {
  const scored = entries
    .map((e) => ({ e, s: scoreEntry(e, query) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, topK);
  return { entries: scored.map((x) => x.e), topScore: scored.length ? scored[0].s : 0 };
}

export function isComplianceRelated(entries: KbEntry[]): boolean {
  return entries.some((e) => e.tags.includes("compliance"));
}
