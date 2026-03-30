"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";

export default function SuccessPage() {
    const router = useRouter();
    const { orderPlaced, orderId, grandTotal, shippingAddress, resetCheckout } = useCheckout();

    useEffect(() => {
        if (!orderPlaced) router.push("/");
    }, [orderPlaced, router]);

    if (!orderPlaced || !shippingAddress) return null;

    const handleContinueShopping = () => {
        resetCheckout();
        router.push("/");
    };

    const firstName = shippingAddress.fullName.split(" ")[0];

    return (
        <div className="flex items-center justify-center min-h-[75vh] px-4 py-10">
            <div className="w-full max-w-md animate-scaleIn">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-black/8 border border-ecoyaan-border/60 overflow-hidden">
                    {/* Gradient header strip */}
                    <div className="h-1.5 bg-gradient-to-r from-ecoyaan-green via-ecoyaan-teal to-emerald-400" />

                    {/* Top section */}
                    <div className="px-8 pt-8 pb-6 text-center">
                        {/* Animated checkmark */}
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-20 h-20 rounded-full bg-ecoyaan-green-light animate-pulse-ring" />
                                <div className="absolute inset-0 w-20 h-20 rounded-full bg-ecoyaan-green-light flex items-center justify-center">
                                    <svg className="w-12 h-12" viewBox="0 0 52 52">
                                        <circle
                                            className="animate-circle"
                                            cx="26" cy="26" r="25"
                                            fill="none" stroke="#0d7a5f" strokeWidth="1.5"
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

                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
                            Order Confirmed!
                        </h1>
                        <p className="text-ecoyaan-gray text-sm">
                            Thank you, <span className="font-semibold text-foreground">{firstName}</span>. Your eco-friendly order is on its way.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="mx-8 border-t border-dashed border-ecoyaan-border" />

                    {/* Order details */}
                    <div className="px-8 py-5 space-y-3">
                        <DetailRow
                            icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                            label="Order ID"
                            value={<span className="font-mono text-xs bg-ecoyaan-gray-light border border-ecoyaan-border px-2.5 py-1 rounded-lg font-bold">{orderId}</span>}
                        />
                        <DetailRow
                            icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            label="Amount Paid"
                            value={<span className="font-bold text-foreground text-base">₹{grandTotal.toLocaleString("en-IN")}</span>}
                        />
                        <DetailRow
                            icon={<svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                            label="Delivering To"
                            value={
                                <div className="text-right">
                                    <p className="font-semibold text-foreground text-sm">{shippingAddress.fullName}</p>
                                    <p className="text-xs text-ecoyaan-gray">{shippingAddress.city}, {shippingAddress.state}</p>
                                </div>
                            }
                        />
                    </div>

                    {/* Eco message */}
                    <div className="mx-8 mb-6">
                        <div className="bg-gradient-to-br from-ecoyaan-green-light to-emerald-50 border border-ecoyaan-green/20 rounded-2xl p-4 flex items-start gap-3">
                            <span className="text-xl mt-0.5 flex-shrink-0">🌱</span>
                            <p className="text-sm text-ecoyaan-green leading-relaxed font-medium">
                                Every sustainable choice you make helps protect our planet. Thank you for being part of the change!
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="px-8 pb-8">
                        <button
                            onClick={handleContinueShopping}
                            className="btn-primary w-full bg-ecoyaan-green hover:bg-ecoyaan-green-dark text-white font-bold py-3.5 rounded-2xl text-sm tracking-wide shadow-md shadow-ecoyaan-green/25 transition-all"
                        >
                            Continue Shopping
                        </button>
                        <p className="text-xs text-ecoyaan-gray mt-4 text-center flex items-center justify-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Confirmation sent to <span className="font-medium text-foreground">{shippingAddress.email}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ icon, label, value }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-ecoyaan-gray text-sm">
                <span className="text-ecoyaan-green/70">{icon}</span>
                {label}
            </div>
            <div>{value}</div>
        </div>
    );
}
