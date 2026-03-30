"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

    // Saved addresses
    savedAddresses: ShippingAddress[];
    addSavedAddress: (address: ShippingAddress) => ShippingAddress;
    removeSavedAddress: (id: string) => void;

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

    // Whether localStorage has been read (prevents hydration flash)
    isHydrated: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(0);
    const [shippingAddress, setShippingAddressState] = useState<ShippingAddress | null>(null);
    const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [hydrated, setHydrated] = useState(false);

    // Restore persisted state on mount (client-side only)
    useEffect(() => {
        try {
            const storedAddresses = localStorage.getItem("ecoyaan_saved_addresses");
            if (storedAddresses) setSavedAddresses(JSON.parse(storedAddresses));

            const storedSelected = localStorage.getItem("ecoyaan_shipping_address");
            if (storedSelected) setShippingAddressState(JSON.parse(storedSelected));

            const storedOrder = localStorage.getItem("ecoyaan_order_state");
            if (storedOrder) {
                const { orderPlaced: op, orderId: oid } = JSON.parse(storedOrder);
                if (op) setOrderPlaced(op);
                if (oid) setOrderId(oid);
            }
        } catch {
            // Silently fail on corrupt localStorage data
        }
        setHydrated(true);
    }, []);

    // Persist saved addresses
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem("ecoyaan_saved_addresses", JSON.stringify(savedAddresses));
    }, [savedAddresses, hydrated]);

    // Persist selected address
    useEffect(() => {
        if (!hydrated) return;
        if (shippingAddress) {
            localStorage.setItem("ecoyaan_shipping_address", JSON.stringify(shippingAddress));
        } else {
            localStorage.removeItem("ecoyaan_shipping_address");
        }
    }, [shippingAddress, hydrated]);

    // Persist order state
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem("ecoyaan_order_state", JSON.stringify({ orderPlaced, orderId }));
    }, [orderPlaced, orderId, hydrated]);

    const setCartData = (items: CartItem[], fee: number, discount: number) => {
        setCartItems(items);
        setShippingFee(fee);
        setDiscountApplied(discount);
    };

    const setShippingAddress = (address: ShippingAddress) => {
        setShippingAddressState(address);
    };

    const addSavedAddress = (address: ShippingAddress): ShippingAddress => {
        const withId: ShippingAddress = { ...address, id: `addr_${Date.now()}` };
        setSavedAddresses((prev) => [...prev, withId]);
        return withId;
    };

    const removeSavedAddress = (id: string) => {
        setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
        // If the removed address was the selected one, clear the selection
        setShippingAddressState((prev) => (prev?.id === id ? null : prev));
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
        setShippingAddressState(null);
        setCurrentStep(1);
        setOrderPlaced(false);
        setOrderId(null);
        // Clear order-related storage but keep saved addresses for next time
        localStorage.removeItem("ecoyaan_shipping_address");
        localStorage.removeItem("ecoyaan_order_state");
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
                savedAddresses,
                addSavedAddress,
                removeSavedAddress,
                currentStep,
                setCurrentStep,
                orderPlaced,
                orderId,
                placeOrder,
                resetCheckout,
                subtotal,
                grandTotal,
                isHydrated: hydrated,
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
