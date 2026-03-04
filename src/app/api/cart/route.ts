import { NextResponse } from "next/server";
import { getCartData } from "@/lib/cart-data";

export async function GET() {
    const cartData = await getCartData();
    return NextResponse.json(cartData);
}
