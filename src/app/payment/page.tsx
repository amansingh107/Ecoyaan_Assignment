"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import StickyActionBar from "@/components/StickyActionBar";

export default function PaymentPage() {
    const router = useRouter();
    const {
        cartItems,
        shippingAddress,
        shippingFee,
        discountApplied,
        subtotal,
        grandTotal,
        setCurrentStep,
        placeOrder,
    } = useCheckout();

    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 || !shippingAddress) {
            router.push("/");
            return;
        }
        setCurrentStep(3);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePayment = async () => {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        placeOrder();
        router.push("/success");
    };

    const handleBack = () => {
        setCurrentStep(2);
        router.push("/shipping");
    };

    if (!shippingAddress) return null;

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="animate-fadeIn pb-24">
            <StepIndicator currentStep={3} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Review & Pay</h1>
                <p className="text-sm text-ecoyaan-gray mt-1">
                    Confirm your order details before paying
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">

                    {/* Shipping Address Summary */}
                    <div className="bg-white border border-ecoyaan-border rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-ecoyaan-gray-light to-white px-5 py-3.5 border-b border-ecoyaan-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-ecoyaan-green/10 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="font-semibold text-sm text-foreground">Delivery Address</h2>
                            </div>
                            <button
                                onClick={() => { setCurrentStep(2); router.push("/shipping"); }}
                                className="text-ecoyaan-green text-xs font-semibold hover:underline flex items-center gap-1"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Change
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-xl bg-ecoyaan-green-light flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground text-sm">{shippingAddress.fullName}</p>
                                    <p className="text-xs text-ecoyaan-gray mt-0.5">{shippingAddress.email}</p>
                                    <p className="text-xs text-ecoyaan-gray">+91 {shippingAddress.phone}</p>
                                    <p className="text-xs text-ecoyaan-gray mt-1 font-medium">
                                        {shippingAddress.city}, {shippingAddress.state} — {shippingAddress.pinCode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white border border-ecoyaan-border rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-ecoyaan-gray-light to-white px-5 py-3.5 border-b border-ecoyaan-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-ecoyaan-green/10 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h2 className="font-semibold text-sm text-foreground">Order Items</h2>
                            </div>
                            <span className="text-xs bg-ecoyaan-green/10 text-ecoyaan-green font-medium px-2.5 py-1 rounded-full">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                        </div>
                        <div className="divide-y divide-ecoyaan-border">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="p-4 flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-ecoyaan-green-light flex-shrink-0 border border-ecoyaan-border/60">
                                        <ProductImage src={item.image} alt={item.product_name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                                            {item.product_name}
                                        </h3>
                                        <p className="text-xs text-ecoyaan-gray mt-0.5">
                                            Qty {item.quantity} × ₹{item.product_price.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <p className="font-bold text-sm text-foreground flex-shrink-0">
                                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white border border-ecoyaan-border rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-ecoyaan-green/10 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h2 className="font-semibold text-sm text-foreground">Payment Method</h2>
                        </div>

                        <div className="flex items-center gap-3 p-3.5 bg-ecoyaan-green-light border border-ecoyaan-green/20 rounded-xl">
                            <div className="w-5 h-5 rounded-full border-2 border-ecoyaan-green flex items-center justify-center flex-shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-ecoyaan-green" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">Simulated Secure Payment</p>
                                <p className="text-xs text-ecoyaan-gray mt-0.5">Demo mode — no real payment is processed</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                            {[
                                { icon: "🔒", text: "256-bit SSL encrypted" },
                                { icon: "🛡️", text: "PCI DSS compliant" },
                                { icon: "✅", text: "Verified by Ecoyaan" },
                            ].map((badge) => (
                                <div key={badge.text} className="flex items-center gap-1.5 text-xs text-ecoyaan-gray bg-ecoyaan-gray-light rounded-lg px-2.5 py-1.5">
                                    <span>{badge.icon}</span>
                                    <span>{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20">
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
                onBack={handleBack}
                backLabel="Back to Shipping"
                onNext={handlePayment}
                nextLabel={isProcessing ? "" : `Pay ₹${grandTotal.toLocaleString("en-IN")} Securely`}
                isLoading={isProcessing}
                loadingLabel="Processing Payment..."
            />
        </div>
    );
}
