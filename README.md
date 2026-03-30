# Ecoyaan Checkout Flow

A simplified checkout flow inspired by [Ecoyaan](https://ecoyaan.com), built with **Next.js**, **TypeScript**, and **Tailwind CSS v4**.

## Live Demo & Repository

- **GitHub**: [github.com/amansingh107/Ecoyaan_Assignment](https://github.com/amansingh107/Ecoyaan_Assignment)
- **Deployed**: [ecoyaan-assignment-phi.vercel.app](https://ecoyaan-assignment-phi.vercel.app/)

---

## Flow Overview

**Cart → Shipping → Payment → Order Success**

1. **Cart / Order Summary** — SSR-fetched product list with pricing breakdown
2. **Shipping Address** — Saved addresses + validated new address form
3. **Payment & Review** — Final order summary with simulated secure payment
4. **Order Success** — Animated confirmation with order details

---

## Architectural Choices & Rationale

### Next.js App Router with Server Components (SSR)

The Cart page (`src/app/page.tsx`) is an **async Server Component** — it calls `getCartData()` on the server before sending any HTML to the browser. The data module (`src/lib/cart-data.ts`) is imported directly rather than self-fetched via `fetch('/api/cart')`, because self-fetching in Server Components is unreliable on edge runtimes like Vercel (the server URL is not available at render time). The `/api/cart` Route Handler still exists as an external-facing endpoint.

This pattern ensures the cart HTML is **fully server-rendered** before reaching the client, satisfying the SSR requirement while remaining Vercel-compatible.

### React Context API for State Management

`CheckoutProvider` (in `layout.tsx`) wraps the entire app, so cart data, the selected shipping address, saved addresses, and order state all persist across route navigations without prop drilling. Computed values (`subtotal`, `grandTotal`) live in the context so no page needs to recalculate them.

Redux/Zustand were not used — the state complexity for a 3-step checkout flow does not justify the overhead.

### localStorage Persistence

The context persists three pieces of state to `localStorage`:

| Key | What it stores |
|---|---|
| `ecoyaan_saved_addresses` | All addresses the user has ever entered |
| `ecoyaan_shipping_address` | The address selected for the current order |
| `ecoyaan_order_state` | Order ID + placed flag (so the success page survives a reload) |

Cart items are intentionally excluded — they are always re-fetched fresh from the Server Component on the Cart page.

A `isHydrated` flag prevents UI flash: pages that depend on `savedAddresses` render a skeleton until the context has finished reading from `localStorage`.

### Multiple Saved Addresses

Users can save multiple delivery addresses. On the Shipping page:
- Saved addresses render as selectable radio-button cards.
- Any card can be removed with the trash icon (revealed on hover).
- "Add New Address" opens a form below the cards; on submit the address is saved and automatically selected.
- The previously used address is pre-selected on return visits.

### Sticky Bottom Action Bar

All checkout pages (Cart, Shipping, Payment) use a `StickyActionBar` component fixed to the bottom of the viewport. On Shipping and Payment pages it shows **Back** and **Next/Pay** together in one bar, so both actions are always reachable without scrolling. On mobile the Back button collapses to an arrow-only icon to save space.

### Form Validation

Real-time validation with a **touched-field** pattern — errors only appear after a field has been interacted with, avoiding an aggressive initial error state. Validation rules are Indian-specific:

- Phone: 10 digits starting with 6–9 (`/^[6-9]\d{9}$/`)
- PIN Code: exactly 6 digits (`/^\d{6}$/`)
- State: dropdown of all 28 states + 8 Union Territories

No external validation library (yup/zod/react-hook-form) is used.

### Responsive Design

All pages use a **1-column (mobile) → 3-column (desktop)** Tailwind CSS grid. The Order Summary card sits in the right sidebar on desktop and stacks below the main content on mobile. The sticky bottom bar adapts its label visibility at the `sm` breakpoint.

---

## Project Structure

```
src/
├── app/
│   ├── api/cart/route.ts         # Mock API endpoint (Route Handler)
│   ├── page.tsx                  # Cart page — async Server Component (SSR)
│   ├── shipping/page.tsx         # Shipping address screen (Client Component)
│   ├── payment/page.tsx          # Payment review & confirmation
│   ├── success/page.tsx          # Order success page
│   ├── layout.tsx                # Root layout with CheckoutProvider
│   └── globals.css               # Tailwind theme + custom animations
├── components/
│   ├── CartPage.tsx              # Cart client component
│   ├── Header.tsx                # Ecoyaan-branded sticky header
│   ├── OrderSummaryCard.tsx      # Reusable price breakdown card
│   ├── ProductImage.tsx          # Image with SVG fallback placeholder
│   ├── StickyActionBar.tsx       # Fixed-bottom Back/Next action bar
│   └── StepIndicator.tsx         # Visual step progress (Cart → Shipping → Payment)
├── context/
│   └── CheckoutContext.tsx       # React Context: cart, addresses, order + localStorage sync
├── lib/
│   └── cart-data.ts              # Mock data source (shared by Server Component + API route)
└── types/
    └── index.ts                  # TypeScript interfaces (CartItem, ShippingAddress, etc.)
```

---

## How to Run Locally

### Prerequisites
- **Node.js** >= 18
- **npm** >= 9

```bash
# 1. Clone the repository
git clone https://github.com/amansingh107/Ecoyaan_Assignment.git

# 2. Navigate into the project
cd Ecoyaan_Assignment

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Mock Data

The API route `/api/cart` (and the SSR Server Component) serve:

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

## Key Features

| Feature | Implementation |
|---|---|
| Server-Side Rendering | Async Server Component fetches data before HTML is sent to client |
| State Management | React Context API — cart, addresses, order state across all routes |
| localStorage Persistence | Addresses + order state survive page reloads; cart re-fetched from SSR |
| Multiple Saved Addresses | Add, select, and remove delivery addresses; persisted across sessions |
| Sticky Action Bar | Fixed bottom bar with Back + Next together on all checkout pages |
| Form Validation | Real-time regex + touched-field tracking, no external library |
| Responsive Design | Mobile-first Tailwind grid, sticky sidebar on desktop |
| Animations | Pure CSS keyframes (fade-in, scale-in, SVG checkmark draw) |
| Type Safety | Full TypeScript with strict mode |
| Error Handling | ProductImage SVG fallback; route guards redirect to Cart if state is missing |
