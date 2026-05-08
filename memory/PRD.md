# AutoSolutions.in — Product Requirements

## Original Problem Statement
Build a premium agency website for **AutoSolutions.in** — an AI automation agency that helps clinics, hospitals, cafes, restaurants, retail, and other Indian SMBs grow with AI voice agents, WhatsApp bots, appointment booking, and customer support automation.

## Tech Stack (Decided)
- Frontend: React 19 (CRA) + TailwindCSS + Plus Jakarta Sans
- Animations: Framer Motion + GSAP + Lenis (smooth scroll) + react-parallax-tilt
- 3D: Vanilla Three.js (R3F removed due to visual-edits build attribute conflict)
- Backend: FastAPI + MongoDB (motor)
- Theme: Pure white (#FFFFFF) + violet (#6C5CE7) + ink (#0A0A1A). NO dark mode. NO payment gateway.

## User Personas
1. **Clinic / Hospital owner** — wants to stop missing patient calls, reduce no-shows.
2. **Cafe / Restaurant manager** — wants WhatsApp reservations + auto replies, even after-hours.
3. **Retail / Real-estate / Salon owner** — wants lead follow-ups, multi-touch nurture, quick site visits.

## Core Requirements (Static)
- Hero with 3D neural-orb (Three.js particles + lines) + text-scramble headline + CTAs
- Sticky glassmorphism navbar with smooth-scroll anchor links
- Infinite-scroll industry ticker
- 6 service cards with 3D scroll-flip
- 3-step "How it works" timeline
- 8+ industries grid with hover tilt
- Animated counting stats (4)
- Pricing — 3 tiers in INR with Monthly / Yearly toggle (yearly = 20% off), no checkout
- Testimonials carousel
- FAQ accordion
- CTA banner
- Contact form (saves leads to MongoDB) + WhatsApp green CTA + Calendly placeholder
- Footer with links + socials
- Custom glowing dot cursor (desktop only) + magnetic CTAs + Lenis smooth scroll

## What's Implemented (2025-12-08)
- ✅ Backend `POST /api/leads`, `GET /api/leads`, `GET /api/health`, `GET /api/stats/public`
- ✅ Lead model — id, name, business_type, phone, email?, message, created_at — stored in `leads` collection (no _id leak)
- ✅ All 11 sections (Navbar → Hero → Ticker → Services → How → Industries → Stats → Pricing → Testimonials → FAQ → CTA → Contact → Footer)
- ✅ 3D Three.js neural orb (vanilla, no R3F)
- ✅ Text-scramble headline, magnetic buttons, custom dot cursor, Lenis smooth scroll
- ✅ Pricing yearly/monthly toggle — 20% saving
- ✅ Contact form posts to backend with success/error states
- ✅ Plus Jakarta Sans font, SEO meta + OG tags
- ✅ Testing: 100% pass on backend (11 pytest tests) + 100% on frontend (Playwright)

## Known Decisions / Notes
- Calendly and WhatsApp links are intentional placeholders (calendly.com/demo, wa.me/919999999999, hello@autosolutions.in) — to be replaced by client.
- No authentication — public marketing site; `/api/leads` GET is unguarded by design (admin will swap to a private dashboard later).
- React Three Fiber was attempted but removed because the platform's `@emergentbase/visual-edits` build plugin injects `x-line-number` JSX attributes that R3F's prop applier rejects on Three.js objects. We use vanilla Three.js inside `useEffect` instead.

## Backlog (Prioritized)
**P0 — must-do before "real" launch**
- Replace Calendly placeholder with real Calendly inline embed
- Replace WhatsApp number / Email / phone with client-provided values
- Add basic admin auth gate on `GET /api/leads` (or remove the endpoint and use a dashboard)

**P1 — strong nice-to-haves**
- Email notification on new lead (Resend / SendGrid)
- Live chat / WhatsApp click-to-chat with prefilled context
- Case-study and blog routes
- Indic-language toggle (Hindi default for hero copy variant)

**P2 — future**
- Live demo widget that lets a visitor talk to a sample voice agent
- ROI calculator embedded in pricing
- Per-industry landing pages (/clinics, /cafes, /retail)

## Next Tasks
1. Provide real Calendly URL + WhatsApp number → swap into Contact section.
2. Add admin gate to `GET /api/leads` (simple JWT or shared secret header).
3. Wire email notification on lead submit.
