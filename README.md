# Workshop Registration System

Multi-step ticket registration form with TikTok Shop checkout and digital ticket delivery. Fully customizable — edit one config block to rebrand for any event.

## Files

```
workshop/
  index.html    ← 3-step registration form (tickets → details → checkout)
  ticket.html   ← digital ticket page with print/save-as-PDF
```

## How to customize

Open `workshop/index.html` and `workshop/ticket.html`, find the `CONFIG` block at the top, and change:

```js
const CONFIG = {
  eventName: 'Your Event',
  brand: '#d4a574',
  bg: '#f8f6f2',
  footer: 'Your Company',
  codePrefix: 'EVENT',
  tickets: [
    { tier: 'Basic', price: 5000, desc: 'Standard access' },
  ],
};
```

That's it. Everything updates automatically.

## Flow

1. Select ticket tier & quantity
2. Enter name, email, phone  
3. Pay via TikTok Shop → tap "I've Paid — Get My Ticket"
4. Print or save the digital pass as PDF

No dependencies. Open directly in a browser.
