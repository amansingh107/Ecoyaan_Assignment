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
        <div className="animate-fadeIn pb-28">
            <StepIndicator currentStep={3} />

            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Review & Pay
                </h1>
                <p className="text-sm text-ecoyaan-gray mt-1">
                    Confirm your details before placing the order
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">

                    {/* ── Delivery address ──────────────────────────────── */}
                    <div className="card overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-ecoyaan-border bg-ecoyaan-gray-light/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-ecoyaan-green/10 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-sm text-foreground">Delivery Address</span>
                            </div>
                            <button
                                onClick={() => { setCurrentStep(2); router.push("/shipping"); }}
                                className="text-ecoyaan-green text-xs font-semibold hover:underline underline-offset-2 flex items-center gap-1 transition-opacity hover:opacity-80"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Change
                            </button>
                        </div>
                        <div className="p-5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-ecoyaan-green-light flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">{shippingAddress.fullName}</p>
                                <p className="text-xs text-ecoyaan-gray mt-0.5">{shippingAddress.email}</p>
                                <p className="text-xs text-ecoyaan-gray">+91 {shippingAddress.phone}</p>
                                <p className="text-xs text-foreground font-semibold mt-1.5 bg-ecoyaan-gray-light inline-block px-2.5 py-1 rounded-lg">
                                    {shippingAddress.city}, {shippingAddress.state} · {shippingAddress.pinCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── Order items ────────────────────────────────────── */}
                    <div className="card overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-ecoyaan-border bg-ecoyaan-gray-light/80 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-ecoyaan-green/10 flex items-center justify-center">
                                    <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <span className="font-semibold text-sm text-foreground">Order Items</span>
                            </div>
                            <span className="text-xs font-semibold text-ecoyaan-green bg-ecoyaan-green/10 px-2.5 py-1 rounded-full">
                                {itemCount} {itemCount === 1 ? "item" : "items"}
                            </span>
                        </div>
                        <div className="divide-y divide-ecoyaan-border/60">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="p-4 sm:p-5 flex items-center gap-4">
                                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-ecoyaan-green-light flex-shrink-0 border border-ecoyaan-border/60">
                                        <ProductImage src={item.image} alt={item.product_name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
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

                    {/* ── Payment method ─────────────────────────────────── */}
                    <div className="card p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-ecoyaan-green/10 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <span className="font-semibold text-sm text-foreground">Payment Method</span>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-ecoyaan-green-light border border-ecoyaan-green/25 rounded-2xl">
                            <div className="w-5 h-5 rounded-full border-2 border-ecoyaan-green flex items-center justify-center flex-shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-ecoyaan-green" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-foreground">Simulated Secure Payment</p>
                                <p className="text-xs text-ecoyaan-gray mt-0.5">No real transaction is processed</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                            {[
                                { icon: "🔒", text: "256-bit SSL" },
                                { icon: "🛡️", text: "PCI DSS" },
                                { icon: "✅", text: "Ecoyaan Verified" },
                            ].map((b) => (
                                <div key={b.text} className="flex items-center gap-1.5 text-xs text-ecoyaan-gray bg-ecoyaan-gray-light border border-ecoyaan-border rounded-xl px-3 py-1.5 font-medium">
                                    <span>{b.icon}</span>
                                    <span>{b.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
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
                nextLabel={`Pay ₹${grandTotal.toLocaleString("en-IN")} Securely`}
                isLoading={isProcessing}
                loadingLabel="Processing Payment..."
            />
        </div>
    );
}
