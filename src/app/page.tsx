import CartPageClient from "@/components/CartPage";
import { getCartData } from "@/lib/cart-data";

/**
 * Cart Page — Server Component
 * Fetches cart data server-side (SSR) by directly importing the data module.
 * This avoids self-fetching API routes, which is unreliable in Server Components on Vercel.
 */
export default async function CartPage() {
  const cartData = await getCartData();

  return <CartPageClient initialCartData={cartData} />;
}
