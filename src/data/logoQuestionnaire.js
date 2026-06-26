export const DELIVERABLE_OPTIONS = [
  "Primary logo",
  "Logo variations",
  "Brand guidelines",
  "Social media assets",
  "Stationery / print",
  "Packaging",
  "Other",
];

export const BUDGET_OPTIONS = [
  "Under $1,500",
  "$1,500 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $8,000",
  "$8,000+",
  "Not sure yet",
];

export const TIMELINE_OPTIONS = [
  "ASAP (rush)",
  "2–4 weeks",
  "1–2 months",
  "2–3 months",
  "Flexible",
];

export const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  website: "",
  businessDescription: "",
  targetAudience: "",
  brandGoals: "",
  brandMessage: "",
  brandPersonality: "",
  preferredStyles: "",
  colorPreferences: "",
  styleToAvoid: "",
  competitors: "",
  differentiation: "",
  deliverables: [],
  deliverablesNotes: "",
  timeline: "",
  deadline: "",
  budgetRange: "",
  additionalNotes: "",
};

export const LOGO_QUESTIONNAIRE_STEPS = [
  {
    id: "contact",
    title: "Contact Info",
    description: "How should I reach you about this project?",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Alex Mercer" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "alex@company.com" },
      { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "(555) 555-0199" },
      { name: "company", label: "Company", type: "text", required: true, placeholder: "Company name" },
    ],
  },
  {
    id: "business",
    title: "Business Info",
    description: "Tell me what the business does and who it serves.",
    fields: [
      { name: "industry", label: "Industry", type: "text", required: true, placeholder: "Coffee, SaaS, retail, etc." },
      { name: "website", label: "Website", type: "url", required: false, placeholder: "https://example.com" },
      {
        name: "businessDescription",
        label: "Business Description",
        type: "textarea",
        required: true,
        placeholder: "What does the company do, and what makes it different?",
      },
      {
        name: "targetAudience",
        label: "Target Audience",
        type: "textarea",
        required: true,
        placeholder: "Who are you trying to reach?",
      },
    ],
  },
  {
    id: "goals",
    title: "Logo & Brand Goals",
    description: "What should this identity accomplish?",
    fields: [
      {
        name: "brandGoals",
        label: "Brand Goals",
        type: "textarea",
        required: true,
        placeholder: "What should the logo help the business achieve?",
      },
      {
        name: "brandMessage",
        label: "Brand Message",
        type: "textarea",
        required: true,
        placeholder: "What should people understand about the brand at a glance?",
      },
      {
        name: "brandPersonality",
        label: "Brand Personality",
        type: "textarea",
        required: true,
        placeholder: "If the brand were a person, how would you describe them?",
      },
    ],
  },
  {
    id: "style",
    title: "Style Preferences",
    description: "Share the visual direction you are drawn to.",
    fields: [
      {
        name: "preferredStyles",
        label: "Preferred Styles",
        type: "textarea",
        required: true,
        placeholder: "Minimal, bold, vintage, editorial, playful, etc.",
      },
      {
        name: "colorPreferences",
        label: "Color Preferences",
        type: "textarea",
        required: true,
        placeholder: "Favorite colors, palettes, or moods.",
      },
      {
        name: "styleToAvoid",
        label: "Styles to Avoid",
        type: "textarea",
        required: false,
        placeholder: "Anything you definitely do not want.",
      },
    ],
  },
  {
    id: "competitors",
    title: "Competitors",
    description: "Who else is in the space, and how should you stand apart?",
    fields: [
      {
        name: "competitors",
        label: "Competitors",
        type: "textarea",
        required: true,
        placeholder: "List competitors or brands in a similar space.",
      },
      {
        name: "differentiation",
        label: "Differentiation",
        type: "textarea",
        required: true,
        placeholder: "How should your brand feel different from them?",
      },
    ],
  },
  {
    id: "deliverables",
    title: "Deliverables",
    description: "What do you need at the end of the project?",
    fields: [
      { name: "deliverables", label: "Requested Deliverables", type: "checkbox-group", required: true, options: DELIVERABLE_OPTIONS },
      {
        name: "deliverablesNotes",
        label: "Deliverable Notes",
        type: "textarea",
        required: false,
        placeholder: "File types, usage needs, or special requests.",
      },
    ],
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "When do you need this completed?",
    fields: [
      { name: "timeline", label: "Timeline", type: "select", required: true, options: TIMELINE_OPTIONS },
      { name: "deadline", label: "Specific Deadline", type: "date", required: false },
    ],
  },
  {
    id: "budget",
    title: "Budget",
    description: "This helps me recommend the right scope.",
    fields: [{ name: "budgetRange", label: "Budget Range", type: "select", required: true, options: BUDGET_OPTIONS }],
  },
  {
    id: "notes",
    title: "Additional Notes",
    description: "Anything else I should know before we start?",
    fields: [
      {
        name: "additionalNotes",
        label: "Additional Notes",
        type: "textarea",
        required: false,
        placeholder: "Links, inspiration, constraints, or context.",
      },
    ],
  },
];

export function validateStep(step, form) {
  const errors = {};

  step.fields.forEach((field) => {
    const value = form[field.name];

    if (field.required) {
      if (field.type === "checkbox-group") {
        if (!Array.isArray(value) || !value.length) {
          errors[field.name] = "Select at least one option.";
        }
        return;
      }

      if (!String(value ?? "").trim()) {
        errors[field.name] = "This field is required.";
      }
    }

    if (field.name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.email = "Enter a valid email address.";
    }
  });

  return errors;
}
