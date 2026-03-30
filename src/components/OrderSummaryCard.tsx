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
        <div className="bg-white border border-ecoyaan-border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-ecoyaan-gray-light to-white px-5 py-3.5 border-b border-ecoyaan-border flex items-center gap-2">
                <svg className="w-4 h-4 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="font-semibold text-sm text-foreground">Price Details</h3>
            </div>

            <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-ecoyaan-gray">
                        Subtotal
                        <span className="ml-1 text-xs bg-ecoyaan-gray-light text-ecoyaan-gray font-medium px-1.5 py-0.5 rounded-md">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                    </span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-ecoyaan-gray">Delivery Fee</span>
                    {shippingFee === 0 ? (
                        <span className="text-ecoyaan-green font-semibold text-xs bg-ecoyaan-green-light px-2 py-0.5 rounded-full">
                            FREE
                        </span>
                    ) : (
                        <span className="font-semibold">₹{shippingFee.toLocaleString("en-IN")}</span>
                    )}
                </div>

                {discountApplied > 0 && (
                    <div className="flex justify-between items-center">
                        <span className="text-ecoyaan-green flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Discount
                        </span>
                        <span className="text-ecoyaan-green font-semibold">
                            −₹{discountApplied.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}

                <div className="border-t border-dashed border-ecoyaan-border pt-3">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-base text-foreground">Grand Total</span>
                        <span className="font-bold text-lg text-foreground">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                    {discountApplied > 0 && (
                        <p className="text-xs text-ecoyaan-green mt-1 text-right">
                            You save ₹{discountApplied.toLocaleString("en-IN")} 🎉
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
