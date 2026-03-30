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
        <div className="animate-fadeIn pb-28">
            <StepIndicator currentStep={1} />

            {/* Page heading */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Your Cart
                </h1>
                <p className="text-sm text-ecoyaan-gray mt-1">
                    {itemCount} {itemCount === 1 ? "item" : "items"} · Ready for checkout
                </p>
            </div>

            {/* Savings banner */}
            {discountApplied > 0 && (
                <div className="mb-6 flex items-center gap-3 bg-gradient-to-r from-ecoyaan-green-light to-emerald-50 border border-ecoyaan-green/25 rounded-2xl p-4">
                    <div className="w-9 h-9 rounded-xl bg-ecoyaan-green/15 flex items-center justify-center flex-shrink-0">
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
                {/* Product list */}
                <div className="lg:col-span-2 space-y-3">
                    <div className="card overflow-hidden">
                        {/* List header */}
                        <div className="px-5 py-3.5 border-b border-ecoyaan-border bg-ecoyaan-gray-light/80 flex justify-between items-center">
                            <span className="font-semibold text-sm text-foreground">Items in your order</span>
                            <span className="text-xs font-semibold text-ecoyaan-green bg-ecoyaan-green/10 px-2.5 py-1 rounded-full">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                        </div>

                        <div className="divide-y divide-ecoyaan-border/60">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.product_id}
                                    className="p-4 sm:p-5 flex gap-4 hover:bg-ecoyaan-gray-light/30 transition-colors duration-150"
                                    style={{ animationDelay: `${index * 0.08}s` }}
                                >
                                    {/* Image */}
                                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-ecoyaan-green-light flex-shrink-0 border border-ecoyaan-border/60 shadow-sm">
                                        <ProductImage src={item.image} alt={item.product_name} />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-foreground text-sm sm:text-[15px] leading-snug">
                                                {item.product_name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-ecoyaan-green" />
                                                <p className="text-xs font-medium text-ecoyaan-green">Eco-certified product</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-1.5 bg-ecoyaan-gray-light border border-ecoyaan-border rounded-lg px-3 py-1.5">
                                                <span className="text-xs text-ecoyaan-gray font-medium">Qty</span>
                                                <span className="text-sm font-bold text-foreground">{item.quantity}</span>
                                            </div>
                                            <div className="text-right">
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eco trust strip */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-ecoyaan-green-light/80 to-transparent border border-ecoyaan-green/15 rounded-2xl px-4 py-3">
                        <span className="text-xl flex-shrink-0">🌱</span>
                        <p className="text-xs text-ecoyaan-green font-medium leading-relaxed">
                            Every product is sustainably sourced, plastic-free packaged, and carbon-offset shipped.
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-3">
                        <OrderSummaryCard
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            discountApplied={discountApplied}
                            grandTotal={grandTotal}
                            itemCount={itemCount}
                        />
                    </div>
                </div>
            </div>

            <StickyActionBar
                nextLabel={`Proceed to Checkout  ·  ₹${grandTotal.toLocaleString("en-IN")}`}
                onNext={handleProceed}
            />
        </div>
    );
}
