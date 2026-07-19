# Event Workshop Registration Form

**About** — A lightweight, multi-step registration system for Prime Event workshops. Customers select ticket tiers (General Admission ₦29,900 / VIP ₦79,900 / Premium ₦149,900), provide contact details, and proceed to checkout via TikTok Shop. After payment, the buyer taps "I've Paid — Get My Ticket" to view their unique digital pass. Built with vanilla HTML/CSS/JS — zero dependencies, runs directly in the browser from `file://`.

## Structure

```
RegForm/
  index.html            ← hub gallery linking to all forms
  fitness/
    index.html          ← fitness client registration
  workshop/
    index.html          ← event workshop signup with TikTok Shop
    ticket.html         ← digital ticket page (reads URL params)
  README.md
```

## Usage

Open any `index.html` directly in a browser — no server or build step required.

## Flow

1. **Tickets** — select tier and quantity
2. **Your Details** — name, email, phone
3. **Confirm** — order summary → TikTok Shop checkout → tap "I've Paid — Get My Ticket"

## Currency

Naira (₦) — all prices in NGN.

## Tech

Vanilla HTML/CSS/JS. No dependencies. Works from `file://`.
