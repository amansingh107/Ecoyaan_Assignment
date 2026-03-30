"use client";

import React from "react";

interface OrderSummaryCardProps {
    subtotal: number;
    shippingFee: number;
    discountApplied: number;
    grandTotal: number;
    itemCount: number;
}

export default function OrderSummaryCard({
    subtotal,
    shippingFee,
    discountApplied,
    grandTotal,
    itemCount,
}: OrderSummaryCardProps) {
    return (
        <div className="card overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-ecoyaan-border bg-ecoyaan-green-light/60">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="font-semibold text-sm text-foreground">Order Summary</h3>
                </div>
            </div>

            {/* Line items */}
            <div className="px-5 py-4 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-ecoyaan-gray">
                        Items ({itemCount})
                    </span>
                    <span className="font-medium text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-ecoyaan-gray">Delivery</span>
                    {shippingFee === 0 ? (
                        <span className="font-semibold text-ecoyaan-green text-xs bg-ecoyaan-green/10 px-2 py-0.5 rounded-full">
                            FREE
                        </span>
                    ) : (
                        <span className="font-medium text-foreground">+₹{shippingFee.toLocaleString("en-IN")}</span>
                    )}
                </div>

                {discountApplied > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-ecoyaan-green font-medium flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Discount
                        </span>
                        <span className="font-semibold text-ecoyaan-green">
                            −₹{discountApplied.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}

                <div className="border-t border-dashed border-ecoyaan-border pt-3 mt-1">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-base text-foreground">Total</span>
                        <span className="font-bold text-xl text-ecoyaan-green">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                    {discountApplied > 0 && (
                        <p className="text-xs text-ecoyaan-green mt-1.5 text-right font-medium">
                            You save ₹{discountApplied.toLocaleString("en-IN")} 🎉
                        </p>
                    )}
                </div>
            </div>

            {/* Trust badge */}
            <div className="px-5 pb-4">
                <div className="flex items-center justify-center gap-1.5 text-xs text-ecoyaan-gray bg-ecoyaan-gray-light rounded-xl py-2.5">
                    <svg className="w-3.5 h-3.5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure & encrypted checkout</span>
                </div>
            </div>
        </div>
    );
}
