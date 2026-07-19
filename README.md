# Prime Event — Workshop Registration

Multi-step ticket registration with TikTok Shop checkout and digital ticket delivery. Built with vanilla HTML/CSS/JS — no dependencies, no build step, runs from any static host or `file://`.

## Live Demo

| Form | URL |
|------|-----|
| Workshop Signup | [`workshop/`](https://workshop-form-01.netlify.app/workshop/) |
| Fitness Registration | [`fitness/`](https://workshop-form-01.netlify.app/fitness/) |
| Form Gallery | [`index.html`](https://workshop-form-01.netlify.app/) |

## Features

- **3-step checkout** — ticket selection → attendee details → order confirmation
- **Ticket tiers** — General Admission (₦29,900), VIP (₦79,900), Premium (₦149,900)
- **TikTok Shop integration** — pay via TikTok, then tap "I've Paid" to claim tickets
- **Digital ticket page** — renders attendee name, tier, confirmation code from URL params
- **Print / Save as PDF** — one-click print with print-optimized CSS

## Structure

```
RegForm/
  index.html            ← hub gallery linking all forms
  fitness/
    index.html          ← fitness client registration form
  workshop/
    index.html          ← event workshop signup (3-step + TikTok Shop)
    ticket.html         ← digital ticket page with print support
  README.md
```

## Workflow

1. **Select tier & qty** — choose from three ticket tiers, adjust with +/- steppers
2. **Enter details** — name, email, phone (inline validation)
3. **Confirm & pay** — review order → pay via TikTok Shop → tap "I've Paid — Get My Ticket"
4. **Save your ticket** — download or print your digital pass as PDF

## Currency

All prices in Nigerian Naira (₦).

## Deployment

Auto-deploys to Netlify from the `main` branch. Each subfolder serves its own `index.html` — no server config needed.

## Tech

Vanilla HTML/CSS/JS. Tailwind CSS (CDN) on the hub gallery only. Zero npm dependencies.
