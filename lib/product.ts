export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  priceMonthly: 29,
  priceYearly: 290,
  name: "MeetMind",
  slug: "meeting-mind-mvp",
  productId: "PROD_0GS5rYpQobB0gZUt2ze0l8",
  yearlyProductId: "PROD_4vPnmC2ZDfqu8koOgf5T3a",
  checkoutUrl: "",
  tagline: "Turn any meeting into clear, actionable notes",
  description: "Paste a transcript or jot the topic and get AI-generated meeting minutes in seconds \u2014 a tight summary, the key decisions, and action items with owners and due dates.",
  definitionLead: `MeetMind turns a transcript or a topic into clear meeting minutes in seconds — a tight summary, the key decisions, and action items with owners and due dates.`,

  toolTitle: "Generate meeting notes",
  resultLabel: "Your meeting minutes",
  ctaLabel: "Generate notes",
  features: [
  "Summary, decisions and action items",
  "Auto-assigned owners and due dates",
  "Multiple formats (bullets, email, Slack)",
  "One-click follow-up draft"
],
  inputs: [
  {
    "key": "transcript",
    "label": "Meeting notes or transcript",
    "type": "textarea",
    "placeholder": "e.g. We discussed the Q3 launch. Sarah owns the landing page by Friday. We decided to delay the webinar."
  },
  {
    "key": "format",
    "label": "Output format",
    "type": "select",
    "options": [
      "Bullets",
      "Email summary",
      "Slack post"
    ]
  },
  {
    "key": "tone",
    "label": "Tone",
    "type": "select",
    "options": [
      "Neutral",
      "Friendly",
      "Formal"
    ]
  }
] as InputField[],
  systemPrompt: "You are an expert meeting scribe. From the provided notes or transcript, produce clean meeting minutes with three sections: Summary, Decisions, and Action Items (with an owner and due date wherever stated). Use the chosen output format and tone. Output only the minutes, no preamble.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 notes/day, bullets format"
  },
  {
    "tier": "Starter",
    "price": "$29/mo",
    "desc": "Unlimited notes, all formats, follow-ups"
  },
  {
    "tier": "Pro",
    "price": "$79/mo",
    "desc": "Team workspace, Slack/email export, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const notes = inputs['transcript'] || 'We discussed the Q3 launch. Sarah owns the landing page, due Friday. We decided to delay the webinar.'
  const fmt = inputs['format'] || 'Bullets'
  const tone = inputs['tone'] || 'Neutral'
  return `Meeting Minutes (${fmt} - ${tone})

**Summary**
A short sync on the Q3 launch and the upcoming webinar plans.

**Decisions**
- Delay the webinar to a later date.
- Proceed with the Q3 landing page.

**Action Items**
- Sarah - build the Q3 landing page (Due: Friday)
- Marketing - pick a new webinar date

---
(This is a mock demo. Add OPENAI_API_KEY for real AI-generated minutes.)`
},
  geoFaq: [
{ q: "What is MeetMind?", a: "MeetMind is a tool that turns a transcript or topic into meeting minutes: summary, decisions, and action items with owners and due dates." },
{ q: "What do I paste in?", a: "A transcript or just the meeting topic." },
{ q: "Does it assign action items?", a: "It auto-assigns owners and due dates to action items." },
{ q: "What formats can it export?", a: "Bullets, email, and Slack, plus a one-click follow-up draft." },
{ q: "Who should use it?", a: "Teams who want actionable notes without a dedicated scribe." },
{ q: "How fast is it?", a: "It generates minutes in seconds from the input." }
  ],

}
