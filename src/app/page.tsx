import { CartData } from "@/types";
import CartPageClient from "@/components/CartPage";

async function getCartData(): Promise<CartData> {
  // Server-side data fetching - demonstrating SSR
  // In production, this would call an external API
  // Using the API route for local development
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store", // Ensure fresh data on every request (SSR)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data");
  }

  return res.json();
}

export default async function CartPage() {
  const cartData = await getCartData();

  return <CartPageClient initialCartData={cartData} />;
}
