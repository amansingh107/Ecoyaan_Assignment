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
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="bg-white border border-ecoyaan-border rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center animate-scaleIn">
                {/* Success Animation */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-ecoyaan-green-light flex items-center justify-center">
                        <svg className="w-12 h-12" viewBox="0 0 52 52">
                            <circle
                                className="animate-circle"
                                cx="26"
                                cy="26"
                                r="25"
                                fill="none"
                                stroke="#0d7a5f"
                                strokeWidth="2"
                            />
                            <path
                                className="animate-checkmark"
                                fill="none"
                                stroke="#0d7a5f"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Order Successful! 🎉
                </h1>
                <p className="text-ecoyaan-gray mb-6">
                    Thank you for choosing sustainable products.
                </p>

                {/* Order Details */}
                <div className="bg-ecoyaan-gray-light rounded-xl p-5 mb-6 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-ecoyaan-gray">Order ID</span>
                        <span className="font-mono font-semibold text-foreground">{orderId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-ecoyaan-gray">Amount Paid</span>
                        <span className="font-semibold text-foreground">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-ecoyaan-gray">Delivery To</span>
                        <span className="font-medium text-foreground text-right">
                            {shippingAddress.fullName}
                            <br />
                            <span className="text-xs text-ecoyaan-gray">
                                {shippingAddress.city}, {shippingAddress.state}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Eco Message */}
                <div className="bg-ecoyaan-green-light border border-ecoyaan-green/20 rounded-lg p-4 mb-6 flex items-start gap-3">
                    <span className="text-lg">🌱</span>
                    <p className="text-sm text-ecoyaan-green text-left">
                        By choosing eco-friendly products, you&apos;re making a positive impact
                        on the planet. Every sustainable choice counts!
                    </p>
                </div>

                <button
                    onClick={handleContinueShopping}
                    className="btn-primary w-full bg-ecoyaan-green hover:bg-ecoyaan-green-dark text-white font-semibold py-3.5 rounded-lg text-sm"
                >
                    Continue Shopping
                </button>

                <p className="text-xs text-ecoyaan-gray mt-4">
                    A confirmation email will be sent to {shippingAddress.email}
                </p>
            </div>
        </div>
    );
}
