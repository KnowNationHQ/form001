# Know Nation — Form Projects

Collection of ready-to-use HTML registration forms with WhatsApp DM delivery. No backend, no database, no build step.

| Project | Description | Price |
|---------|-------------|-------|
| [Workshop Registration](#workshop-registration) | 3-step event registration + WhatsApp | Free |
| [Fitness Form](#fitness-form) | Client enquiry & registration form | Free |

---

## Workshop Registration

3-step registration form for workshops, classes, and events. Collect attendee info and send it straight to your WhatsApp for manual payment confirmation.

**Demo:** [knform001.netlify.app/workshop](https://knform001.netlify.app/workshop/)

### Customize

Open `workshop/index.html`, find the `CONFIG` block at the top:

```js
const CONFIG = {
  eventName: 'Your Event',
  brand: '#d4a574',
  whatsapp: '2348012345678',  // your number (country code, no +)
  tickets: [
    { tier: 'General Admission', price: 5000, desc: 'Full access. Standard seating.' },
    { tier: 'VIP', price: 15000, desc: 'Priority seating + meet & greet.' },
  ],
};
```

That's it — event name, colors, ticket tiers, and your WhatsApp number in one place.

### Flow

1. **Select pass** — choose tier and quantity
2. **Your details** — enter name, email, phone
3. **Pay on WhatsApp** — sends a pre-filled message to you with the registration details

### Deploy

Upload the `workshop/` folder to any static host (Netlify, Vercel, GitHub Pages, or even a shared hosting folder). No server-side code needed.

---

## Fitness Form

Responsive enquiry and registration form for fitness coaches, gyms, and wellness programs.

**Demo:** [knform001.netlify.app/fitness](https://knform001.netlify.app/fitness/)

Open `fitness/index.html`, edit the config block at the top, and go live. Same zero-dependency approach.

---

## License

Both projects are free and open-source.
