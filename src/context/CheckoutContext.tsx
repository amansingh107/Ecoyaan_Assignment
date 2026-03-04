"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, ShippingAddress } from "@/types";

interface CheckoutContextType {
    // Cart state
    cartItems: CartItem[];
    shippingFee: number;
    discountApplied: number;
    setCartData: (items: CartItem[], fee: number, discount: number) => void;

    // Address state
    shippingAddress: ShippingAddress | null;
    setShippingAddress: (address: ShippingAddress) => void;

    // Step management
    currentStep: number;
    setCurrentStep: (step: number) => void;

    // Order state
    orderPlaced: boolean;
    orderId: string | null;
    placeOrder: () => void;
    resetCheckout: () => void;

    // Computed values
    subtotal: number;
    grandTotal: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(0);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const setCartData = (items: CartItem[], fee: number, discount: number) => {
        setCartItems(items);
        setShippingFee(fee);
        setDiscountApplied(discount);
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );

    const grandTotal = subtotal + shippingFee - discountApplied;

    const placeOrder = () => {
        const id = "ECO-" + Date.now().toString().slice(-8);
        setOrderId(id);
        setOrderPlaced(true);
    };

    const resetCheckout = () => {
        setCartItems([]);
        setShippingAddress(null);
        setCurrentStep(1);
        setOrderPlaced(false);
        setOrderId(null);
    };

    return (
        <CheckoutContext.Provider
            value={{
                cartItems,
                shippingFee,
                discountApplied,
                setCartData,
                shippingAddress,
                setShippingAddress,
                currentStep,
                setCurrentStep,
                orderPlaced,
                orderId,
                placeOrder,
                resetCheckout,
                subtotal,
                grandTotal,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    const context = useContext(CheckoutContext);
    if (context === undefined) {
        throw new Error("useCheckout must be used within a CheckoutProvider");
    }
    return context;
}
