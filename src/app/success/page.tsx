"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function SuccessPage() {
    const router = useRouter();
    const { orderPlaced, orderId, grandTotal, shippingAddress, resetCheckout } = useCheckout();

    useEffect(() => {
        if (!orderPlaced) {
            router.push("/");
        }
    }, [orderPlaced, router]);

    if (!orderPlaced || !shippingAddress) return null;

    const handleContinueShopping = () => {
        resetCheckout();
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4 py-8">
            <div className="bg-white border border-ecoyaan-border rounded-2xl shadow-md max-w-md w-full text-center animate-scaleIn overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-ecoyaan-green via-ecoyaan-teal to-emerald-400 w-full" />

                <div className="p-8 sm:p-10">
                    {/* Animated checkmark */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full bg-ecoyaan-green-light animate-pulse" style={{ animationDuration: "2s" }} />
                            <div className="relative w-20 h-20 rounded-full bg-ecoyaan-green-light flex items-center justify-center">
                                <svg className="w-12 h-12" viewBox="0 0 52 52">
                                    <circle
                                        className="animate-circle"
                                        cx="26" cy="26" r="25"
                                        fill="none" stroke="#0d7a5f" strokeWidth="2"
                                    />
                                    <path
                                        className="animate-checkmark"
                                        fill="none" stroke="#0d7a5f" strokeWidth="3"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                        Order Confirmed!
                    </h1>
                    <p className="text-ecoyaan-gray text-sm mb-6">
                        Thank you for choosing sustainable products, {shippingAddress.fullName.split(" ")[0]}.
                    </p>

                    {/* Order Details */}
                    <div className="bg-ecoyaan-gray-light rounded-xl p-5 mb-5 text-left space-y-3.5">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-ecoyaan-gray flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                                Order ID
                            </span>
                            <span className="font-mono font-bold text-foreground text-xs bg-white border border-ecoyaan-border px-2.5 py-1 rounded-lg">
                                {orderId}
                            </span>
                        </div>
                        <div className="h-px bg-ecoyaan-border" />
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-ecoyaan-gray flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Amount Paid
                            </span>
                            <span className="font-bold text-foreground">
                                ₹{grandTotal.toLocaleString("en-IN")}
                            </span>
                        </div>
                        <div className="h-px bg-ecoyaan-border" />
                        <div className="flex justify-between items-start text-sm">
                            <span className="text-ecoyaan-gray flex items-center gap-1.5 mt-0.5">
                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Delivery To
                            </span>
                            <div className="text-right">
                                <p className="font-semibold text-foreground">{shippingAddress.fullName}</p>
                                <p className="text-xs text-ecoyaan-gray mt-0.5">
                                    {shippingAddress.city}, {shippingAddress.state}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Eco Message */}
                    <div className="bg-gradient-to-br from-ecoyaan-green-light to-emerald-50 border border-ecoyaan-green/20 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                        <span className="text-xl mt-0.5">🌱</span>
                        <p className="text-sm text-ecoyaan-green leading-relaxed">
                            By choosing eco-friendly products, you&apos;re making a real difference.
                            Every sustainable choice counts!
                        </p>
                    </div>

                    <button
                        onClick={handleContinueShopping}
                        className="btn-primary w-full bg-ecoyaan-green hover:bg-ecoyaan-green-dark active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl text-sm transition-all shadow-sm hover:shadow-md shadow-ecoyaan-green/20"
                    >
                        Continue Shopping
                    </button>

                    <p className="text-xs text-ecoyaan-gray mt-4 flex items-center justify-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Confirmation email sent to {shippingAddress.email}
                    </p>
                </div>
            </div>
        </div>
    );
}
