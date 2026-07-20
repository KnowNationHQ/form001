# Workshop Registration System

Clean 3-step registration form with WhatsApp DM delivery. [Live Demo](https://knform001.netlify.app/workshop/)

Edit one config block to rebrand for any event. No build step — just HTML.

## Files

```
workshop/index.html  ← select tickets → enter details → Pay on WhatsApp
```

## Usage

1. Download the zip
2. Open `workshop/index.html` in any editor
3. Edit the `CONFIG` block at the top:

```js
const CONFIG = {
  eventName: 'Your Event',
  brand: '#d4a574',
  whatsapp: '2348012345678',  // your WhatsApp number (country code, no +)
  tickets: [
    { tier: 'Basic', price: 5000, desc: 'Standard access' },
  ],
};
```

4. Upload `workshop/` folder to any static host (Netlify, Vercel, GitHub Pages)

## Flow

1. Select ticket tier & quantity
2. Enter name, email, phone
3. Tap "Pay on WhatsApp" — opens DM to seller with registration details pre-filled

No dependencies, no build step.
