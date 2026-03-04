"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { CartData } from "@/types";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import OrderSummaryCard from "@/components/OrderSummaryCard";

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
        <div className="animate-fadeIn">
            <StepIndicator currentStep={1} />

            <h1 className="text-2xl font-bold text-foreground mb-6">Your Cart</h1>

            {/* Savings Banner */}
            {discountApplied > 0 && (
                <div className="bg-ecoyaan-green-light border border-ecoyaan-green/20 rounded-lg p-4 mb-6 flex items-center gap-3">
                    <span className="text-xl">✨</span>
                    <div>
                        <p className="font-semibold text-ecoyaan-green">
                            You saved ₹{discountApplied.toLocaleString("en-IN")} in total
                        </p>
                        <p className="text-sm text-ecoyaan-teal">
                            Great choice! You&apos;re making sustainable shopping more rewarding.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white border border-ecoyaan-border rounded-lg overflow-hidden">
                        <div className="bg-ecoyaan-gray-light px-5 py-3 border-b border-ecoyaan-border flex justify-between items-center">
                            <span className="font-semibold text-sm text-foreground">
                                List of added items
                            </span>
                            <span className="text-xs text-ecoyaan-gray">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                        </div>

                        <div className="divide-y divide-ecoyaan-border">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.product_id}
                                    className="p-5 flex gap-4 hover:bg-ecoyaan-gray-light/50 transition-colors"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-ecoyaan-border">
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
                                        <p className="text-xs text-ecoyaan-gray mt-1">
                                            Eco-friendly • Sustainable
                                        </p>

                                        <div className="mt-3 flex items-center gap-3">
                                            <span className="text-lg font-bold text-foreground">
                                                ₹{item.product_price.toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-xs text-ecoyaan-gray">Qty:</span>
                                            <span className="inline-flex items-center justify-center bg-ecoyaan-gray-light border border-ecoyaan-border rounded px-3 py-1 text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right flex-shrink-0">
                                        <p className="font-bold text-foreground">
                                            ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                        </p>
                                        {item.quantity > 1 && (
                                            <p className="text-xs text-ecoyaan-gray mt-1">
                                                ₹{item.product_price} × {item.quantity}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 space-y-4">
                        <OrderSummaryCard
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            discountApplied={discountApplied}
                            grandTotal={grandTotal}
                            itemCount={itemCount}
                        />

                        <button
                            onClick={handleProceed}
                            className="btn-primary w-full bg-ecoyaan-green hover:bg-ecoyaan-green-dark text-white font-semibold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2"
                        >
                            Proceed to Checkout
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="flex items-center justify-center gap-2 text-xs text-ecoyaan-gray">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure checkout by Ecoyaan
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
