---
target: portfolio home and case studies
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/home/claude/tcdesign/src/pages/Home.jsx"
target_fingerprint: "sha256:81341b33d2041dc1bc60566bcde5225f527817958d60c7449e4f5bfe3d0cc7f4"
target_path: /home/claude/tcdesign/src/pages/Home.jsx
timestamp: 2026-10-24T01-01-32Z
slug: src-pages-home-jsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active Work state, hover and menu preview work; cold-load intro gives no hint it can be skipped |
| 2 | Match System / Real World | 3 | Home copy plain and first-person; case studies slip into jargon and "we" |
| 3 | User Control and Freedom | 2 | ~4s cold-load intro; focus escapes the open Work panel |
| 4 | Consistency and Standards | 2 | Two visual systems (tc-* home vs portfolio-* case studies); project labels differ by page |
| 5 | Error Prevention | 3 | Pre-filled project email, structured logo brief |
| 6 | Recognition Rather Than Recall | 3 | Resume missing from header and menus |
| 7 | Flexibility and Efficiency | n/a | Portfolio, no expert workflows |
| 8 | Aesthetic and Minimalist Design | 3 | Calm home; empty right half of hero; 16,300px Civil Goat image wall |
| 9 | Error Recovery | 2 | Old-style project-not-found; Photography "coming soon" is a dead end in every menu |
| 10 | Help and Documentation | n/a | Portfolio, no task help needed |
| **Total** | | **21/32** | **Acceptable (66%)** |

## Design Specificity Verdict
Authored at the edges (intro, dot-field hero, red-point full stops, glass pills, Work menu); template in the middle (home grid, "Hi, I'm Travis", "What I make", CTA band) and generic on case studies (portfolio-* scaffolding). Detector: 24 findings in source (all one bounce-easing rule on the inline intro dots); page scans across 10 routes: unbalanced-heading 8, straggler 6, line-length 4, low-contrast 4 (logo-brief placeholders 3.5:1), skipped-heading 3 (/projects, /logos, /branding), oversized-h1 1 (/posters), nested-cards 1 (logo-brief form). Overlay injected on 5 pages: skipped-heading on /projects and /logos, clean elsewhere.

## Priority Issues
- [P0] Case studies bury the thinking under the images: Challenge/Approach at ~12,500px of 16,300px on Civil Goat (ProjectDetails.jsx renders ProjectVisuals first). Fix: problem → approach → visuals grouped by decision, ~8 captioned images, first-person overview. Commands: layout, distill, clarify.
- [P1] Case studies look like a different, generic site (portfolio-* styles, Title Case eyebrows, meta card, pill Prev/Next); detector's unbalanced headings and long lines concentrate here. Fix: port to brand.css, halftone section markers in cobalt, big next-project teaser. Commands: polish, bolder.
- [P1] Hiring managers not served: hero speaks only to freelance clients, no Resume in header/mobile menu, no work above the fold, 4s intro. Fix: Resume in nav, "open to full-time roles and freelance" line, work in the fold, shorter intro. Commands: layout, onboard.
- [P1] Labeling drift: Yellow Bike (team-of-4 UX concept) unlabeled and named three ways; categories differ per page. Fix: one category + status field per project, concept chip everywhere. Commands: clarify, harden.
- [P2] Work panel focus escapes to the hidden page (no aria-modal/inert). Fix: dialog role, focus trap or inert background. Commands: harden, audit.

## Persona Red Flags
Jordan: 4s unexplained intro; no work on first screen; "Coming soon" row; "All projects" vs "Featured work" naming. Casey: no work on first 390px screen; no Resume in mobile menu; glass menu muddied by hero buttons behind; 16k px case studies with no jump links. Sam: focus escapes Work panel; case hero alt "Civil Goat Coffee hero"; autoplaying looped videos without pause. Dana (hiring manager, 60s): intro, client-only hero, no Resume in header, never reaches the case-study thinking.

## Minor Observations
Two intro systems run at once (inline index.html intro keyed tc-intro on top; React IntroOverlay keyed tc-intro-seen hidden underneath). Logo-brief placeholder contrast 3.5:1. Tap targets under 44px in contact/footer email links. Skipped heading levels (h1→h3) on /projects, /logos, /branding. Posters h1 92px/60 chars. "What I make" repeats the hero. Work menu preview leaves ~40% of the panel empty. Lone red point in hero reads as stray until hovered; never moves on touch.

## Questions to Consider
What if the hero dots resolved into the first project cover? Would a creative director understand a case study from its first screen? Where do hiring managers feel invited?
