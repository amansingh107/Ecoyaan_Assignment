# Ecoyaan Checkout Flow

A simplified checkout flow inspired by [Ecoyaan](https://ecoyaan.com), built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

## 🚀 Live Demo & Repository

- **GitHub**: [github.com/amansingh107/Ecoyaan_Assignment](https://github.com/amansingh107/Ecoyaan_Assignment)
- **Deployed**: [Deployed on Vercel -> ecoyaan-assignment-dzbmt96na-amans-projects-3d0112f7.vercel.app](https://ecoyaan-assignment-dzbmt96na-amans-projects-3d0112f7.vercel.app/)

---

## 📸 Flow Overview

**Cart → Shipping → Payment → Order Success**

1. **Cart / Order Summary** — SSR-fetched product list with pricing breakdown
2. **Shipping Address** — Validated form (email, 10-digit phone, 6-digit PIN)
3. **Payment & Review** — Final summary with simulated secure payment
4. **Order Success** — Animated confirmation with order details

---

## 🏗️ Architectural Choices & Rationale

### Why Next.js 15 with App Router?
- **Server Components (SSR)**: The Cart page (`src/app/page.tsx`) is a **Server Component** that fetches product data server-side from a local API route using `fetch()` with `cache: "no-store"`. This ensures the page is **server-rendered on every request**, demonstrating true SSR — the HTML is fully rendered before being sent to the client.
- **App Router over Pages Router**: Chosen because App Router is the recommended approach in Next.js 15, offers better layouts via `layout.tsx`, and natively supports React Server Components — making SSR more idiomatic and simpler to implement.
- **API Routes**: The mock backend lives in `src/app/api/cart/route.ts` using Next.js Route Handlers. This simulates a real backend endpoint and keeps the data layer decoupled from the UI.

### Why React Context API for State Management?
- **Simplicity**: For a 3-step checkout flow with cart, address, and order state, Context API provides sufficient capability without the overhead of Redux or Zustand.
- **Cross-page persistence**: The `CheckoutProvider` wraps the entire app in `layout.tsx`, so state (cart items, shipping address, current step, and order status) persists across all route navigations without prop drilling.
- **Why not Redux/Zustand?**: The state complexity doesn't justify a full state management library. Context API keeps the bundle smaller and the code simpler for this scope.

### Why Tailwind CSS v4?
- **Rapid development**: Utility-first CSS enables fast iteration without context-switching to separate stylesheets.
- **Custom theme**: Extended with Ecoyaan's brand colors (earthy greens, teals) using CSS custom properties in `globals.css` via Tailwind's `@theme inline` directive.
- **Responsive design**: Tailwind's breakpoint utilities (`sm:`, `lg:`) make mobile-first responsive layouts straightforward.

### Form Validation Strategy
- **Real-time inline validation** with a **touched-field** tracking pattern — errors only show after a user has interacted with a field, avoiding an aggressive initial error state.
- **Indian-specific rules**: 10-digit mobile phone starting with 6-9 (`/^[6-9]\d{9}$/`), 6-digit PIN code, and all 28 states + 8 UTs in the dropdown.
- **No external library**: Validation logic is hand-written to keep the bundle lean and demonstrate understanding of form state management patterns.

### Component Architecture
- **Server/Client separation**: `page.tsx` (Server Component) handles data fetching → passes props to `CartPage.tsx` (Client Component) for interactivity. This is the recommended Next.js pattern for combining SSR with client-side state.
- **Reusable components**: `StepIndicator`, `OrderSummaryCard`, `ProductImage`, and `Header` are reusable across multiple pages.
- **Progressive enhancement**: `ProductImage` component includes a graceful SVG fallback when external images fail to load.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/cart/route.ts       # Mock API endpoint (Route Handler)
│   ├── page.tsx                # Cart page (Server Component → SSR)
│   ├── shipping/page.tsx       # Shipping address form (Client Component)
│   ├── payment/page.tsx        # Payment review & confirmation
│   ├── success/page.tsx        # Order success page
│   ├── layout.tsx              # Root layout with CheckoutProvider
│   └── globals.css             # Tailwind theme + custom animations
├── components/
│   ├── CartPage.tsx            # Cart client component
│   ├── Header.tsx              # Ecoyaan-branded header
│   ├── OrderSummaryCard.tsx    # Reusable price breakdown card
│   ├── ProductImage.tsx        # Image with fallback placeholder
│   └── StepIndicator.tsx       # Visual step progress indicator
├── context/
│   └── CheckoutContext.tsx     # React Context for checkout state
└── types/
    └── index.ts                # TypeScript interfaces
```

---

## 🛠️ How to Run Locally

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Step-by-Step

```bash
# 1. Clone the repository
git clone https://github.com/amansingh107/Ecoyaan_Assignment.git

# 2. Navigate to the project directory
cd Ecoyaan_Assignment

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

The production build optimizes the app and starts a Node.js server on port 3000.

---

## 🧪 Mock Data

The API route `/api/cart` serves the following data (fetched server-side on the Cart page):

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

## 📋 Key Features Summary

| Feature | Implementation | Why |
|---|---|---|
| SSR Data Fetching | Server Component + API Route | Demonstrates Next.js best practices |
| State Management | React Context API | Right-sized for checkout flow complexity |
| Form Validation | Real-time regex + touched tracking | UX-friendly, no extra dependencies |
| Responsive Design | Tailwind CSS breakpoints | Mobile-first, consistent layout |
| Animations | CSS keyframes + transitions | Polished UX without JS libraries |
| Type Safety | Full TypeScript | Catches errors at compile time |
| Error Handling | ProductImage fallback | Graceful degradation |
