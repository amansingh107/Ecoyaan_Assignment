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
        <div className="bg-white border border-ecoyaan-border rounded-lg p-5">
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Price Details
            </h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-ecoyaan-gray">
                        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                    <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-ecoyaan-gray">Delivery Fee</span>
                    {shippingFee === 0 ? (
                        <span className="text-ecoyaan-green font-medium">Free Delivery</span>
                    ) : (
                        <span className="font-medium">₹{shippingFee}</span>
                    )}
                </div>
                {discountApplied > 0 && (
                    <div className="flex justify-between">
                        <span className="text-ecoyaan-green">Discount</span>
                        <span className="text-ecoyaan-green font-medium">
                            -₹{discountApplied.toLocaleString("en-IN")}
                        </span>
                    </div>
                )}
                <div className="border-t border-ecoyaan-border pt-3 mt-3">
                    <div className="flex justify-between">
                        <span className="font-bold text-base">Grand Total</span>
                        <span className="font-bold text-base">
                            ₹{grandTotal.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
