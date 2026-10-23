// The ways into the work. `preview` is the image the Work menu shows on hover. Used by the Work menu in the header, the mobile
// menu and the index at the bottom of the Work page, so they always match.
export const WORK_SECTIONS = [
  { to: "/projects", label: "Featured work", note: "Case studies", preview: "/images/CG_6.webp" },
  { to: "/branding", label: "Branding", note: "Identity systems", preview: "/images/B_11.webp" },
  { to: "/logos", label: "Logos", note: "Marks and wordmarks", preview: "/images/CG_1.png" },
  { to: "/posters", label: "Posters", note: "Poster archive", preview: "/images/poster-card-cover.jpg" },
  { to: "/photography", label: "Photography", note: "Coming soon", soon: true },
  { to: "/experiments", label: "Experiments", note: "One-offs and motion", preview: "/images/experiments/soul-queens-billboard.png" },
];

export const WORK_PATHS = [...WORK_SECTIONS.map((section) => section.to), "/projects/"];
