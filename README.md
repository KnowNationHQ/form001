# Workshop Registration System

Clean 3-step registration form with WhatsApp DM delivery. Edit one config block to rebrand for any event.

## Files

```
workshop/index.html  ← select tickets → enter details → WhatsApp DM
```

## Customize

Open `workshop/index.html`, find `CONFIG` at the top:

```js
const CONFIG = {
  eventName: 'Your Event',
  brand: '#d4a574',
  footer: 'Your Company',
  whatsapp: '2348012345678',  // your number (country code, no +)
  tickets: [
    { tier: 'Basic', price: 5000, desc: 'Standard access' },
  ],
};
```

## Flow

1. Select ticket tier & quantity
2. Enter name, email, phone
3. Tap "Send to WhatsApp" — opens DM with pre-filled registration details

No dependencies. Open `index.html` in any browser.
