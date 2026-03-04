"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { ShippingAddress, FormErrors } from "@/types";
import StepIndicator from "@/components/StepIndicator";
import OrderSummaryCard from "@/components/OrderSummaryCard";

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export default function ShippingPage() {
    const router = useRouter();
    const {
        shippingAddress,
        setShippingAddress,
        setCurrentStep,
        cartItems,
        subtotal,
        shippingFee,
        discountApplied,
        grandTotal,
    } = useCheckout();

    const [form, setForm] = useState<ShippingAddress>({
        fullName: "",
        email: "",
        phone: "",
        pinCode: "",
        city: "",
        state: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Redirect if no cart items
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/");
            return;
        }
        setCurrentStep(2);
        // Restore saved address if available
        if (shippingAddress) {
            setForm(shippingAddress);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const validate = (data: ShippingAddress): FormErrors => {
        const errs: FormErrors = {};

        if (!data.fullName.trim()) {
            errs.fullName = "Full name is required";
        } else if (data.fullName.trim().length < 2) {
            errs.fullName = "Name must be at least 2 characters";
        }

        if (!data.email.trim()) {
            errs.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = "Enter a valid email address";
        }

        if (!data.phone.trim()) {
            errs.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
            errs.phone = "Enter a valid 10-digit Indian phone number";
        }

        if (!data.pinCode.trim()) {
            errs.pinCode = "PIN code is required";
        } else if (!/^\d{6}$/.test(data.pinCode)) {
            errs.pinCode = "Enter a valid 6-digit PIN code";
        }

        if (!data.city.trim()) {
            errs.city = "City is required";
        }

        if (!data.state.trim()) {
            errs.state = "State is required";
        }

        return errs;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };
        setForm(updated);

        // Validate on change if field was already touched
        if (touched[name]) {
            const newErrors = validate(updated);
            setErrors((prev) => ({
                ...prev,
                [name]: newErrors[name as keyof FormErrors],
            }));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const newErrors = validate(form);
        setErrors((prev) => ({
            ...prev,
            [name]: newErrors[name as keyof FormErrors],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate(form);
        setErrors(newErrors);

        // Mark all fields as touched
        const allTouched: Record<string, boolean> = {};
        Object.keys(form).forEach((k) => (allTouched[k] = true));
        setTouched(allTouched);

        if (Object.keys(newErrors).length === 0) {
            setShippingAddress(form);
            setCurrentStep(3);
            router.push("/payment");
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
        router.push("/");
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const inputClasses = (field: keyof FormErrors) =>
        `w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${errors[field] && touched[field]
            ? "border-ecoyaan-error bg-red-50/50"
            : "border-ecoyaan-border bg-white hover:border-gray-400"
        }`;

    return (
        <div className="animate-fadeIn">
            <StepIndicator currentStep={2} />

            <h1 className="text-2xl font-bold text-foreground mb-6">
                Shipping Address
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Address Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="bg-white border border-ecoyaan-border rounded-lg p-5 sm:p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <svg className="w-5 h-5 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h2 className="font-semibold text-foreground">
                                    Delivery Address
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
                                        Full Name <span className="text-ecoyaan-error">*</span>
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your full name"
                                        className={inputClasses("fullName")}
                                    />
                                    {errors.fullName && touched.fullName && (
                                        <p className="text-ecoyaan-error text-xs mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                                        Email <span className="text-ecoyaan-error">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="name@example.com"
                                        className={inputClasses("email")}
                                    />
                                    {errors.email && touched.email && (
                                        <p className="text-ecoyaan-error text-xs mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                                        Phone Number <span className="text-ecoyaan-error">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ecoyaan-gray text-sm">
                                            +91
                                        </span>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="9876543210"
                                            maxLength={10}
                                            className={`${inputClasses("phone")} pl-12`}
                                        />
                                    </div>
                                    {errors.phone && touched.phone && (
                                        <p className="text-ecoyaan-error text-xs mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* PIN Code */}
                                <div>
                                    <label htmlFor="pinCode" className="block text-sm font-medium text-foreground mb-1.5">
                                        PIN Code <span className="text-ecoyaan-error">*</span>
                                    </label>
                                    <input
                                        id="pinCode"
                                        type="text"
                                        name="pinCode"
                                        value={form.pinCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="400001"
                                        maxLength={6}
                                        className={inputClasses("pinCode")}
                                    />
                                    {errors.pinCode && touched.pinCode && (
                                        <p className="text-ecoyaan-error text-xs mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.pinCode}
                                        </p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1.5">
                                        City <span className="text-ecoyaan-error">*</span>
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Mumbai"
                                        className={inputClasses("city")}
                                    />
                                    {errors.city && touched.city && (
                                        <p className="text-ecoyaan-error text-xs mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.city}
                                        </p>
                                    )}
                                </div>

                                {/* State */}
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-foreground mb-1.5">
                                        State <span className="text-ecoyaan-error">*</span>
                                    </label>
                                    <select
                                        id="state"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`${inputClasses("state")} cursor-pointer`}
                                    >
                                        <option value="">Select State</option>
                                        {indianStates.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.state && touched.state && (
                                        <p className="text-ecoyaan-error text-xs mt-1 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            {errors.state}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="sm:w-auto px-6 py-3 rounded-lg border border-ecoyaan-border text-foreground text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Cart
                            </button>
                            <button
                                type="submit"
                                className="btn-primary sm:flex-1 bg-ecoyaan-green hover:bg-ecoyaan-green-dark text-white font-semibold py-3 px-6 rounded-lg text-sm flex items-center justify-center gap-2"
                            >
                                Continue to Payment
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-20">
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
        </div>
    );
}
