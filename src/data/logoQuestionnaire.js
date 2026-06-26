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

export const INDUSTRY_OPTIONS = [
  "Food & beverage",
  "Retail / e-commerce",
  "Health & wellness",
  "Professional services",
  "Technology / SaaS",
  "Creative / media",
  "Real estate",
  "Nonprofit / community",
  "Education",
  "Other",
];

export const AUDIENCE_OPTIONS = [
  "Local community",
  "Young professionals",
  "Families",
  "Business owners",
  "Students",
  "Luxury / high-end buyers",
  "Online / nationwide audience",
  "Not sure yet — help me decide",
];

export const BRAND_GOAL_OPTIONS = [
  "Build trust & credibility",
  "Look more professional",
  "Stand out from competitors",
  "Feel modern & current",
  "Attract new customers",
  "Launch a new business",
  "Refresh an outdated brand",
  "Not sure yet — help me decide",
];

export const BRAND_MESSAGE_OPTIONS = [
  "Quality & craftsmanship",
  "Friendly & approachable",
  "Innovative & forward-thinking",
  "Premium & elevated",
  "Fun & energetic",
  "Reliable & dependable",
  "Local & community-focused",
  "Not sure yet — help me decide",
];

export const BRAND_PERSONALITY_OPTIONS = [
  "Bold",
  "Friendly",
  "Sophisticated",
  "Playful",
  "Minimal",
  "Warm",
  "Confident",
  "Creative",
  "Not sure yet — help me decide",
];

export const STYLE_OPTIONS = [
  "Minimal",
  "Classic",
  "Modern",
  "Vintage / retro",
  "Bold & graphic",
  "Elegant",
  "Hand-drawn / organic",
  "Geometric",
  "Editorial",
  "Not sure yet — open to ideas",
];

export const COLOR_OPTIONS = [
  "Neutral (black, white, gray)",
  "Warm (red, orange, yellow)",
  "Cool (blue, green)",
  "Earth tones",
  "Bright & bold",
  "Pastels",
  "Dark & moody",
  "Open to your suggestions",
];

export const AVOID_STYLE_OPTIONS = [
  "Too corporate",
  "Too playful / childish",
  "Too trendy",
  "Too generic",
  "Clip art / stock look",
  "Overly complex",
  "Nothing specific",
];

export const COMPETITOR_OPTIONS = [
  "Still researching competitors",
  "No direct competitors",
  "Similar local businesses",
  "Big national brands in my space",
  "Not sure yet",
];

export const DIFFERENTIATION_OPTIONS = [
  "More personal / human",
  "More premium",
  "More approachable",
  "More modern",
  "More local / community-focused",
  "Better quality / craft",
  "Not sure yet — help me decide",
];

export const BUSINESS_PROMPTS = [
  "We provide a service to local customers.",
  "We sell products online and in person.",
  "We're launching a new business.",
  "We've been around for years and want a fresh look.",
];

export const NOT_SURE_OPTION = "Not sure yet — help me decide";

export const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  industryOther: "",
  website: "",
  businessDescription: "",
  targetAudience: [],
  targetAudienceDetails: "",
  brandGoals: [],
  brandGoalsDetails: "",
  brandMessage: [],
  brandMessageDetails: "",
  brandPersonality: [],
  brandPersonalityDetails: "",
  preferredStyles: [],
  preferredStylesDetails: "",
  colorPreferences: [],
  colorPreferencesDetails: "",
  styleToAvoid: [],
  styleToAvoidDetails: "",
  competitors: [],
  competitorsDetails: "",
  differentiation: [],
  differentiationDetails: "",
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
    description: "Tell me what the business does and who it serves. Select what fits — you don't need to write a perfect answer.",
    fields: [
      {
        name: "industry",
        otherName: "industryOther",
        label: "Industry",
        type: "select-with-other",
        required: true,
        options: INDUSTRY_OPTIONS,
        otherLabel: "Describe your industry",
        otherPlaceholder: "e.g. pet grooming, architecture, events",
      },
      { name: "website", label: "Website", type: "url", required: false, placeholder: "https://example.com" },
      {
        name: "businessDescription",
        label: "Business Description",
        type: "textarea-with-prompts",
        required: true,
        placeholder: "What does the company do, and what makes it different?",
        prompts: BUSINESS_PROMPTS,
        hint: "Tap a prompt below if you're not sure where to start.",
      },
      {
        name: "targetAudience",
        detailsName: "targetAudienceDetails",
        label: "Target Audience",
        type: "guided",
        required: true,
        options: AUDIENCE_OPTIONS,
        hint: "Select anyone you're trying to reach.",
        placeholder: "Anything else about your audience? (optional)",
      },
    ],
  },
  {
    id: "goals",
    title: "Logo & Brand Goals",
    description: "What should this identity accomplish? Pick anything that resonates.",
    fields: [
      {
        name: "brandGoals",
        detailsName: "brandGoalsDetails",
        label: "Brand Goals",
        type: "guided",
        required: true,
        options: BRAND_GOAL_OPTIONS,
        hint: "Select all that apply.",
        placeholder: "Any other goals? (optional)",
      },
      {
        name: "brandMessage",
        detailsName: "brandMessageDetails",
        label: "Brand Message",
        type: "guided",
        required: true,
        options: BRAND_MESSAGE_OPTIONS,
        hint: "What should people feel or understand about your brand?",
        placeholder: "Anything else? (optional)",
      },
      {
        name: "brandPersonality",
        detailsName: "brandPersonalityDetails",
        label: "Brand Personality",
        type: "guided",
        required: true,
        options: BRAND_PERSONALITY_OPTIONS,
        hint: "If your brand were a person, how would you describe them?",
        placeholder: "Any other traits? (optional)",
      },
    ],
  },
  {
    id: "style",
    title: "Style Preferences",
    description: "Share the visual direction you're drawn to — selections are enough if you're not sure yet.",
    fields: [
      {
        name: "preferredStyles",
        detailsName: "preferredStylesDetails",
        label: "Preferred Styles",
        type: "guided",
        required: true,
        options: STYLE_OPTIONS,
        hint: "Select styles you like or want to explore.",
        placeholder: "Links, inspiration, or other style notes (optional)",
      },
      {
        name: "colorPreferences",
        detailsName: "colorPreferencesDetails",
        label: "Color Preferences",
        type: "guided",
        required: true,
        options: COLOR_OPTIONS,
        hint: "Select palettes or moods you're drawn to.",
        placeholder: "Specific colors or combinations (optional)",
      },
      {
        name: "styleToAvoid",
        detailsName: "styleToAvoidDetails",
        label: "Styles to Avoid",
        type: "guided",
        required: false,
        options: AVOID_STYLE_OPTIONS,
        hint: "Optional — select anything you definitely don't want.",
        placeholder: "Anything else to avoid? (optional)",
      },
    ],
  },
  {
    id: "competitors",
    title: "Competitors",
    description: "Who else is in your space? It's okay if you're still figuring this out.",
    fields: [
      {
        name: "competitors",
        detailsName: "competitorsDetails",
        label: "Competitors",
        type: "guided",
        required: true,
        options: COMPETITOR_OPTIONS,
        hint: "Select what best describes your situation.",
        placeholder: "Name specific competitors or brands (optional)",
      },
      {
        name: "differentiation",
        detailsName: "differentiationDetails",
        label: "Differentiation",
        type: "guided",
        required: true,
        options: DIFFERENTIATION_OPTIONS,
        hint: "How should your brand feel different?",
        placeholder: "Anything else that sets you apart (optional)",
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

function isGuidedFieldSatisfied(form, field) {
  const selections = form[field.name];
  const details = field.detailsName ? form[field.detailsName] : "";
  const hasSelections = Array.isArray(selections) && selections.length > 0;
  const hasDetails = String(details ?? "").trim().length > 0;
  return hasSelections || hasDetails;
}

function isSelectWithOtherSatisfied(form, field) {
  const value = String(form[field.name] ?? "").trim();
  if (!value) return false;
  if (value === "Other") return String(form[field.otherName] ?? "").trim().length > 0;
  return true;
}

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

      if (field.type === "guided") {
        if (!isGuidedFieldSatisfied(form, field)) {
          errors[field.name] = "Select at least one option or add a short note.";
        }
        return;
      }

      if (field.type === "select-with-other") {
        if (!isSelectWithOtherSatisfied(form, field)) {
          errors[field.name] = field.name === "industry" && form.industry === "Other"
            ? "Describe your industry."
            : "Select an option.";
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
