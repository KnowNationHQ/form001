# Event Workshop Registration Form

**About** — A lightweight, multi-step registration system for Prime Event workshops. Customers select ticket tiers (General Admission, VIP, Premium), provide contact details, and proceed to checkout via TikTok Shop. After payment verification, the seller generates and shares a unique digital ticket link. Built with vanilla HTML/CSS/JS — zero dependencies, runs directly in the browser from `file://`.

## Forms

| File | Purpose |
|------|---------|
| `index.html` | Hub gallery linking all forms |
| `prime-athlete-reg.html` | Fitness client registration |
| `event-workshop-reg.html` | Workshop signup with 3-step flow + TikTok Shop CTA |
| `ticket.html` | Static digital ticket page (reads URL params) |

## Usage

Open any `.html` file directly in a browser — no server or build step required.

## Flow

1. **Tickets** — select tier (General Admission ₦29 / VIP ₦79 / Premium ₦149) and quantity
2. **Your Details** — name, email, phone
3. **Confirm** — order summary → TikTok Shop checkout

After payment, the seller taps the ⚙️ button on step 3 to reveal the unique ticket link to send to the buyer.

## Currency

Naira (₦) — all prices in NGN.

## Tech

Vanilla HTML/CSS/JS. No dependencies. Works from `file://`.
