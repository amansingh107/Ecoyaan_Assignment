# Ecoyaan Checkout Flow

A simplified checkout flow inspired by [Ecoyaan](https://ecoyaan.com), built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

## 🚀 Live Demo

[Deployed on Vercel →](#) *(Add your Vercel URL here after deployment)*

---

## 📸 Flow Overview

**Cart → Shipping → Payment → Order Success**

1. **Cart / Order Summary** — SSR-fetched product list with pricing breakdown
2. **Shipping Address** — Validated form (email, 10-digit phone, 6-digit PIN)
3. **Payment & Review** — Final summary with simulated secure payment
4. **Order Success** — Animated confirmation with order details

---

## 🏗️ Architecture & Tech Choices

### Server-Side Rendering (SSR)
- The **Cart page** is a **Server Component** that fetches product data from a local API route at request time (`cache: "no-store"`), demonstrating true SSR.
- The API route (`/api/cart`) returns mock JSON data asynchronously.

### State Management
- **React Context API** (`CheckoutContext`) manages cart items, shipping address, current step, and order status across all pages.
- Address data persists when navigating back and forth between steps.

### Form Validation
- Real-time inline validation with **touched-field** tracking.
- Rules: required fields, email regex, Indian 10-digit phone (`/^[6-9]\d{9}$/`), 6-digit PIN code.
- All Indian states/UTs in a dropdown selector.

### Styling
- **Tailwind CSS v4** with a custom Ecoyaan-inspired green palette.
- Animations: fade-in page transitions, checkmark SVG animation on success, button hover effects.
- Fully **responsive** — tested on mobile, tablet, and desktop viewports.

### Project Structure
```
src/
├── app/
│   ├── api/cart/route.ts       # Mock API endpoint
│   ├── page.tsx                # Cart (Server Component → SSR)
│   ├── shipping/page.tsx       # Shipping address form
│   ├── payment/page.tsx        # Payment review & confirmation
│   ├── success/page.tsx        # Order success page
│   ├── layout.tsx              # Root layout + CheckoutProvider
│   └── globals.css             # Custom CSS + Tailwind theme
├── components/
│   ├── CartPage.tsx            # Cart client component
│   ├── Header.tsx              # Ecoyaan-branded header
│   ├── OrderSummaryCard.tsx    # Reusable price breakdown card
│   └── StepIndicator.tsx       # Visual step progress indicator
├── context/
│   └── CheckoutContext.tsx     # React Context for checkout state
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run
```bash
# Clone the repository
git clone https://github.com/amansingh107/Ecoyaan_Assignment.git
cd Ecoyaan_Assignment

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## 🧪 Mock Data

The API route `/api/cart` serves:

```json
{
  "cartItems": [
    {
      "product_id": 101,
      "product_name": "Bamboo Toothbrush (Pack of 4)",
      "product_price": 299,
      "quantity": 2,
      "image": "https://via.placeholder.com/150"
    },
    {
      "product_id": 102,
      "product_name": "Reusable Cotton Produce Bags",
      "product_price": 450,
      "quantity": 1,
      "image": "https://via.placeholder.com/150"
    }
  ],
  "shipping_fee": 50,
  "discount_applied": 0
}
```

---

## 📋 Key Features

| Feature | Implementation |
|---|---|
| SSR Data Fetching | Server Component fetching from API route |
| State Management | React Context API |
| Form Validation | Real-time with regex + touched-field tracking |
| Responsive Design | Tailwind CSS responsive breakpoints |
| Animations | CSS keyframe animations + transitions |
| Type Safety | Full TypeScript throughout |
