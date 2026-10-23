// The ways into the work. Used by the Work menu in the header, the mobile
// menu and the index at the bottom of the Work page, so they always match.
export const WORK_SECTIONS = [
  { to: "/projects", label: "Featured work", note: "Case studies" },
  { to: "/branding", label: "Branding", note: "Identity systems" },
  { to: "/logos", label: "Logos", note: "Marks and wordmarks" },
  { to: "/posters", label: "Posters", note: "Poster archive" },
  { to: "/photography", label: "Photography", note: "Coming soon", soon: true },
  { to: "/experiments", label: "Experiments", note: "One-offs and motion" },
];

export const WORK_PATHS = [...WORK_SECTIONS.map((section) => section.to), "/projects/"];
