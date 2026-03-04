"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { useCheckout } from "@/context/CheckoutContext";
import StepIndicator from "@/components/StepIndicator";

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
        // Simulate payment processing
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
        <div className="animate-fadeIn">
            <StepIndicator currentStep={3} />

            <h1 className="text-2xl font-bold text-foreground mb-6">
                Review & Pay
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {/* Shipping Address Summary */}
                    <div className="bg-white border border-ecoyaan-border rounded-lg p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h2 className="font-semibold text-foreground">Delivery Address</h2>
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentStep(2);
                                    router.push("/shipping");
                                }}
                                className="text-ecoyaan-green text-sm font-medium hover:underline"
                            >
                                Change
                            </button>
                        </div>
                        <div className="text-sm text-ecoyaan-gray space-y-1">
                            <p className="font-semibold text-foreground">{shippingAddress.fullName}</p>
                            <p>{shippingAddress.email}</p>
                            <p>+91 {shippingAddress.phone}</p>
                            <p>
                                {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                            </p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white border border-ecoyaan-border rounded-lg overflow-hidden">
                        <div className="bg-ecoyaan-gray-light px-5 py-3 border-b border-ecoyaan-border">
                            <span className="font-semibold text-sm text-foreground">
                                Order Items ({itemCount})
                            </span>
                        </div>
                        <div className="divide-y divide-ecoyaan-border">
                            {cartItems.map((item) => (
                                <div key={item.product_id} className="p-4 flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-ecoyaan-border">
                                        <ProductImage
                                            src={item.image}
                                            alt={item.product_name}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-foreground truncate">
                                            {item.product_name}
                                        </h3>
                                        <p className="text-xs text-ecoyaan-gray mt-0.5">
                                            Qty: {item.quantity} × ₹{item.product_price.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-sm">
                                        ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white border border-ecoyaan-border rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <h2 className="font-semibold text-foreground">Payment Method</h2>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-ecoyaan-green-light rounded-lg border border-ecoyaan-green/20">
                            <div className="w-5 h-5 rounded-full border-2 border-ecoyaan-green flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-ecoyaan-green"></div>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                                Simulated Secure Payment
                            </span>
                        </div>
                        <p className="text-xs text-ecoyaan-gray mt-3 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Your payment information is secured with 256-bit encryption.
                        </p>
                    </div>
                </div>

                {/* Payment Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20 space-y-4">
                        <div className="bg-white border border-ecoyaan-border rounded-lg p-5">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Payment Summary
                            </h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-ecoyaan-gray">Subtotal</span>
                                    <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-ecoyaan-gray">Delivery Fee</span>
                                    {shippingFee === 0 ? (
                                        <span className="text-ecoyaan-green font-medium">Free</span>
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
                                <div className="border-t border-ecoyaan-border pt-3">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-lg">Total</span>
                                        <span className="font-bold text-lg">
                                            ₹{grandTotal.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`btn-primary w-full font-semibold py-3.5 rounded-lg text-sm flex items-center justify-center gap-2 ${isProcessing
                                ? "bg-ecoyaan-green/70 cursor-not-allowed text-white/80"
                                : "bg-ecoyaan-green hover:bg-ecoyaan-green-dark text-white"
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Pay ₹{grandTotal.toLocaleString("en-IN")} Securely
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={isProcessing}
                            className="w-full px-6 py-3 rounded-lg border border-ecoyaan-border text-foreground text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Shipping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
