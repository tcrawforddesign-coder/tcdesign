import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const BRAND = {
  cream: rgb(0.969, 0.953, 0.918),
  ink: rgb(0.067, 0.067, 0.067),
  orange: rgb(1, 0.353, 0.235),
  muted: rgb(0.337, 0.318, 0.286),
  line: rgb(0.867, 0.855, 0.82),
};

const SECTIONS = [
  {
    title: "Contact Info",
    fields: [
      ["Full Name", "fullName"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["Company", "company"],
    ],
  },
  {
    title: "Business Info",
    fields: [
      ["Industry", "industry"],
      ["Website", "website"],
      ["Business Description", "businessDescription"],
      ["Target Audience", "targetAudience"],
    ],
  },
  {
    title: "Logo & Brand Goals",
    fields: [
      ["Brand Goals", "brandGoals"],
      ["Brand Message", "brandMessage"],
      ["Brand Personality", "brandPersonality"],
    ],
  },
  {
    title: "Style Preferences",
    fields: [
      ["Preferred Styles", "preferredStyles"],
      ["Color Preferences", "colorPreferences"],
      ["Styles to Avoid", "styleToAvoid"],
    ],
  },
  {
    title: "Competitors",
    fields: [
      ["Competitors", "competitors"],
      ["Differentiation", "differentiation"],
    ],
  },
  {
    title: "Deliverables",
    fields: [
      ["Requested Deliverables", "deliverables"],
      ["Deliverable Notes", "deliverablesNotes"],
    ],
  },
  {
    title: "Timeline",
    fields: [
      ["Timeline", "timeline"],
      ["Deadline", "deadline"],
    ],
  },
  {
    title: "Budget",
    fields: [["Budget Range", "budgetRange"]],
  },
  {
    title: "Additional Notes",
    fields: [["Notes", "additionalNotes"]],
  },
];

function displayValue(data, key) {
  const value = data[key];
  if (Array.isArray(value)) return value.filter(Boolean).join(", ") || "—";
  if (typeof value === "string" && value.trim()) return value.trim();
  return "—";
}

function wrapText(text, maxChars = 88) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.length ? lines : ["—"];
}

export function buildPdfFilename(data) {
  const company = slugPart(data.company, "Company");
  const name = slugPart(data.fullName, "Client");
  return `Logo-Brief_${company}_${name}.pdf`;
}

function slugPart(value, fallback) {
  return (value || fallback)
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || fallback;
}

export async function generateLogoBriefPdf(data) {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([612, 792]);
  let y = 742;

  const addPageIfNeeded = (height = 48) => {
    if (y - height < 72) {
      page = doc.addPage([612, 792]);
      y = 742;
    }
  };

  page.drawRectangle({ x: 0, y: 752, width: 612, height: 40, color: BRAND.orange });
  page.drawText("Travis Crawford — Logo Brief", {
    x: 48,
    y: 766,
    size: 14,
    font: bold,
    color: BRAND.cream,
  });

  page.drawText(`Submitted ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`, {
    x: 48,
    y: 722,
    size: 10,
    font: regular,
    color: BRAND.muted,
  });

  y = 700;

  SECTIONS.forEach((section) => {
    addPageIfNeeded(72);
    page.drawRectangle({ x: 48, y: y - 4, width: 516, height: 24, color: BRAND.cream });
    page.drawText(section.title.toUpperCase(), {
      x: 56,
      y: y + 2,
      size: 10,
      font: bold,
      color: BRAND.ink,
    });
    y -= 34;

    section.fields.forEach(([label, key]) => {
      const value = displayValue(data, key);
      if (value === "—" && key === "styleToAvoid") return;
      if (value === "—" && key === "deliverablesNotes") return;
      if (value === "—" && key === "additionalNotes") return;
      if (value === "—" && key === "phone") return;
      if (value === "—" && key === "website") return;
      if (value === "—" && key === "deadline") return;

      addPageIfNeeded(60);
      page.drawText(label, { x: 56, y, size: 9, font: bold, color: BRAND.orange });
      y -= 14;

      wrapText(value).forEach((line) => {
        addPageIfNeeded(16);
        page.drawText(line, { x: 56, y, size: 10, font: regular, color: BRAND.ink, maxWidth: 500 });
        y -= 14;
      });

      y -= 8;
      page.drawLine({ start: { x: 56, y }, end: { x: 556, y }, thickness: 0.5, color: BRAND.line });
      y -= 16;
    });

    y -= 8;
  });

  return doc.save();
}

export function validateSubmission(data) {
  const required = [
    "fullName",
    "email",
    "company",
    "industry",
    "businessDescription",
    "targetAudience",
    "brandGoals",
    "brandMessage",
    "brandPersonality",
    "preferredStyles",
    "colorPreferences",
    "competitors",
    "differentiation",
    "timeline",
    "budgetRange",
  ];

  const errors = {};
  required.forEach((field) => {
    const value = data[field];
    const empty = Array.isArray(value) ? !value.length : !String(value ?? "").trim();
    if (empty) errors[field] = "This field is required.";
  });

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!Array.isArray(data.deliverables) || !data.deliverables.length) {
    errors.deliverables = "Select at least one deliverable.";
  }

  return errors;
}
