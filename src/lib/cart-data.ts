import { CartData } from "@/types";

/**
 * Mock cart data — used by both the API route and the Server Component.
 * In production, this would be fetched from an external database or API.
 */
export async function getCartData(): Promise<CartData> {
    // Simulate async data fetching (e.g., from a database)
    await new Promise((resolve) => setTimeout(resolve, 100));

    return {
        cartItems: [
            {
                product_id: 101,
                product_name: "Bamboo Toothbrush (Pack of 4)",
                product_price: 299,
                quantity: 2,
                image: "https://via.placeholder.com/150",
            },
            {
                product_id: 102,
                product_name: "Reusable Cotton Produce Bags",
                product_price: 450,
                quantity: 1,
                image: "https://via.placeholder.com/150",
            },
        ],
        shipping_fee: 50,
        discount_applied: 0,
    };
}
