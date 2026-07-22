<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# KnowNation Projects Hub

Project hub + registration forms built with Next.js 16 + shadcn/ui.

## Tech
- **Framework:** Next.js 16.2.11 (App Router, `src/` dir)
- **UI:** shadcn/ui (base-ui/react), Tailwind CSS v4, tw-animate-css
- **Icons:** lucide-react
- **Hosting:** Vercel (auto-deploy from `main` via git)
- **Node:** 24.x

## Run
```bash
npm run dev    # local dev (port 3456 via next.config.ts)
npm run build  # production build
npm run start  # serve built app
```

## Deploy
Push to `main` → Vercel auto-deploys to production at `https://knownation-projects.vercel.app/`.

## Routes

| Path | Page | Type |
|------|------|------|
| `/` | Project hub with search, phone frame viewer, download modal | `'use client'` |
| `/workshop` | 3-step workshop registration form | `'use client'` |
| `/fitness` | 3-step fitness enquiry form | `'use client'` |
| `/job-application` | 4-step job application form (no KnowNation branding) | `'use client'` |

## Theme
- `dark` class on `<html>`, persisted in `localStorage('kn_theme')`
- Light mode toggle in nav bar + switch in slide-in menu
- Nav logo: `knownation004.png` (light mode), `logo-light.png` (dark mode), driven by `isDark` React state

## Key Components

| Component | File | Purpose |
|-----------|------|---------|
| `PhoneFrame` | `src/components/phone-frame.tsx` | iPhone 17 phone frame with device selector (Phone/Tablet/Desktop), form iframe, page arrows |
| `ProjectCard` | `src/components/project-card.tsx` | Project card with badge, tags, social links, Free Download + Live Demo buttons |
| `ThemeToggle` | `src/components/theme-toggle.tsx` | Sun/Moon icon button for dark/light toggle |

## Phone Frame Viewer
- Single frame at bottom of hub page
- Clicking any "Live Demo" button sets `viewerIdx` (0=Workshop, 1=Job App, 2=Fitness) and scrolls to frame
- Iframe loads `/${FORMS[viewerIdx]}`
- Device selector: Phone (393×844), Tablet (640×640), Desktop (448px no frame)

## Download Modal
- "Free Download" opens a dialog with social links (GitHub, X, TikTok) and "Continue Download" button
- Clicking "Continue Download" shows success animation (checkmark + confetti) and triggers the download

## Slide-In Menu
- Opens from hamburger icon on the right
- Logo, page links (Projects, Workshop, Fitness, Job Application)
- Dark Mode toggle switch at the bottom

## Conventions
- All pages use `'use client'` directive for interactivity
- No comments in code
- Forms submit via WhatsApp message with structured data
- shadcn/ui components in `src/components/ui/`
- Config: `vercel.json` (`{"framework":"nextjs"}`), `next.config.ts` (port 3456)
