"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { CartData } from "@/types";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import StickyActionBar from "@/components/StickyActionBar";

interface CartPageClientProps {
    initialCartData: CartData;
}

export default function CartPageClient({ initialCartData }: CartPageClientProps) {
    const router = useRouter();
    const {
        cartItems,
        shippingFee,
        discountApplied,
        setCartData,
        subtotal,
        grandTotal,
        setCurrentStep,
    } = useCheckout();

    useEffect(() => {
        setCartData(
            initialCartData.cartItems,
            initialCartData.shipping_fee,
            initialCartData.discount_applied
        );
        setCurrentStep(1);
    }, [initialCartData]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleProceed = () => {
        setCurrentStep(2);
        router.push("/shipping");
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="animate-fadeIn pb-24">
            <StepIndicator currentStep={1} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Your Cart</h1>
                <p className="text-sm text-ecoyaan-gray mt-1">
                    {itemCount} {itemCount === 1 ? "item" : "items"} ready for checkout
                </p>
            </div>

            {/* Savings Banner */}
            {discountApplied > 0 && (
                <div className="bg-gradient-to-r from-ecoyaan-green-light to-emerald-50 border border-ecoyaan-green/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-ecoyaan-green/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✨</span>
                    </div>
                    <div>
                        <p className="font-semibold text-ecoyaan-green text-sm">
                            You saved ₹{discountApplied.toLocaleString("en-IN")}!
                        </p>
                        <p className="text-xs text-ecoyaan-teal mt-0.5">
                            Great choice — sustainable shopping at its best.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product List */}
                <div className="lg:col-span-2 space-y-3">
                    <div className="bg-white border border-ecoyaan-border rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-ecoyaan-gray-light to-white px-5 py-3.5 border-b border-ecoyaan-border flex justify-between items-center">
                            <span className="font-semibold text-sm text-foreground">Order Items</span>
                            <span className="text-xs bg-ecoyaan-green/10 text-ecoyaan-green font-medium px-2.5 py-1 rounded-full">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                        </div>

                        <div className="divide-y divide-ecoyaan-border">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.product_id}
                                    className="p-4 sm:p-5 flex gap-4 hover:bg-ecoyaan-gray-light/40 transition-colors"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-ecoyaan-green-light flex-shrink-0 border border-ecoyaan-border/60">
                                        <ProductImage
                                            src={item.image}
                                            alt={item.product_name}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                                            {item.product_name}
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-ecoyaan-green inline-block"></span>
                                            <p className="text-xs text-ecoyaan-green font-medium">Eco-friendly</p>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            <div>
                                                <span className="text-base font-bold text-foreground">
                                                    ₹{item.product_price.toLocaleString("en-IN")}
                                                </span>
                                                <span className="text-xs text-ecoyaan-gray ml-1">/ unit</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-ecoyaan-gray">Qty</span>
                                                <span className="inline-flex items-center justify-center bg-ecoyaan-gray-light border border-ecoyaan-border rounded-lg px-3 py-1 text-sm font-semibold min-w-[36px]">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right flex-shrink-0 flex flex-col justify-between">
                                        <p className="font-bold text-foreground text-base">
                                            ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p className="text-xs text-ecoyaan-gray">
                                                {item.quantity} × ₹{item.product_price}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eco trust badge */}
                    <div className="flex items-center gap-3 text-xs text-ecoyaan-gray bg-white border border-ecoyaan-border/60 rounded-xl px-4 py-3">
                        <span className="text-base">🌱</span>
                        <span>Every product in your cart is sustainably sourced and eco-certified.</span>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 space-y-3">
                        <OrderSummaryCard
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            discountApplied={discountApplied}
                            grandTotal={grandTotal}
                            itemCount={itemCount}
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-ecoyaan-gray py-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure checkout · 256-bit SSL
                        </div>
                    </div>
                </div>
            </div>

            <StickyActionBar
                nextLabel={`Proceed to Checkout · ₹${grandTotal.toLocaleString("en-IN")}`}
                onNext={handleProceed}
            />
        </div>
    );
}
