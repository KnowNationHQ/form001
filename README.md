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
  eventName: 'Your Event Name',
  brand: '#d4a574',       // accent color
  bg: '#f8f6f2',          // background color
  text: '#2c2824',        // text color
  footer: 'Your Company', // footer credit
  codePrefix: 'EVENT',    // confirmation code prefix
  tickets: [              // ticket tiers
    { tier: 'Basic', price: 5000, desc: 'Standard access' },
    { tier: 'VIP', price: 15000, desc: 'Priority seating' },
  ],
};
```

That's it. The form, ticket page, and all colors update automatically.

## Flow

1. Select ticket tier & quantity
2. Enter name, email, phone
3. Pay via TikTok Shop → tap "I've Paid — Get My Ticket"
4. Print or save the digital pass as PDF

All prices in ₦. Zero dependencies — open any `.html` directly in a browser.
