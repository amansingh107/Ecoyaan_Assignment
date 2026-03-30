"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/context/CheckoutContext";
import { ShippingAddress, FormErrors } from "@/types";
import StepIndicator from "@/components/StepIndicator";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import StickyActionBar from "@/components/StickyActionBar";

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

const EMPTY_FORM: ShippingAddress = {
    fullName: "", email: "", phone: "", pinCode: "", city: "", state: "",
};

export default function ShippingPage() {
    const router = useRouter();
    const {
        shippingAddress,
        setShippingAddress,
        savedAddresses,
        addSavedAddress,
        removeSavedAddress,
        setCurrentStep,
        cartItems,
        subtotal,
        shippingFee,
        discountApplied,
        grandTotal,
        isHydrated,
    } = useCheckout();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showNewForm, setShowNewForm] = useState(false);

    const [form, setForm] = useState<ShippingAddress>(EMPTY_FORM);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Effect 1 (size: 0) — cart guard + step
    useEffect(() => {
        if (cartItems.length === 0) router.push("/");
        else setCurrentStep(2);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Effect 2 (size: 1) — address selection once localStorage is ready
    useEffect(() => {
        if (!isHydrated) return;
        if (savedAddresses.length === 0) {
            setShowNewForm(true);
            if (shippingAddress) setForm(shippingAddress);
        } else {
            const match = shippingAddress?.id
                ? savedAddresses.find((a) => a.id === shippingAddress.id)
                : null;
            setSelectedId((match ?? savedAddresses[savedAddresses.length - 1]).id ?? null);
            setShowNewForm(false);
        }
    }, [isHydrated]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Validation ─────────────────────────────────────────────────────────
    const validate = (data: ShippingAddress): FormErrors => {
        const errs: FormErrors = {};
        if (!data.fullName.trim()) errs.fullName = "Full name is required";
        else if (data.fullName.trim().length < 2) errs.fullName = "Name must be at least 2 characters";

        if (!data.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Enter a valid email address";

        if (!data.phone.trim()) errs.phone = "Phone number is required";
        else if (!/^[6-9]\d{9}$/.test(data.phone)) errs.phone = "Enter a valid 10-digit Indian phone number";

        if (!data.pinCode.trim()) errs.pinCode = "PIN code is required";
        else if (!/^\d{6}$/.test(data.pinCode)) errs.pinCode = "Enter a valid 6-digit PIN code";

        if (!data.city.trim()) errs.city = "City is required";
        if (!data.state.trim()) errs.state = "State is required";
        return errs;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updated = { ...form, [name]: value };
        setForm(updated);
        if (touched[name]) {
            const newErrors = validate(updated);
            setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const newErrors = validate(form);
        setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    };

    const handleNewAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate(form);
        setErrors(newErrors);
        const allTouched: Record<string, boolean> = {};
        Object.keys(form).forEach((k) => (allTouched[k] = true));
        setTouched(allTouched);
        if (Object.keys(newErrors).length > 0) return;

        const saved = addSavedAddress(form);
        setShippingAddress(saved);
        setCurrentStep(3);
        router.push("/payment");
    };

    const handleContinueWithSaved = () => {
        const selected = savedAddresses.find((a) => a.id === selectedId);
        if (!selected) return;
        setShippingAddress(selected);
        setCurrentStep(3);
        router.push("/payment");
    };

    const handleContinue = () => {
        if (!showNewForm && selectedId) handleContinueWithSaved();
    };

    const handleBack = () => {
        setCurrentStep(1);
        router.push("/");
    };

    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const inputBase = "w-full px-4 py-3 rounded-xl border text-sm bg-white transition-all duration-150 outline-none placeholder:text-gray-300";
    const inputClasses = (field: keyof FormErrors) =>
        `${inputBase} ${
            errors[field] && touched[field]
                ? "border-ecoyaan-error bg-red-50/40"
                : "border-ecoyaan-border hover:border-ecoyaan-green/40"
        }`;

    const hasSaved = savedAddresses.length > 0;

    // Loading skeleton while localStorage hydrates
    if (!isHydrated) {
        return (
            <div className="animate-fadeIn pb-28">
                <StepIndicator currentStep={2} />
                <div className="mb-8">
                    <div className="h-8 w-52 bg-ecoyaan-gray-light rounded-xl animate-pulse mb-2" />
                    <div className="h-4 w-72 bg-ecoyaan-gray-light rounded-lg animate-pulse" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="card h-52 animate-pulse" />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="card h-44 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn pb-28">
            <StepIndicator currentStep={2} />

            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Delivery Address
                </h1>
                <p className="text-sm text-ecoyaan-gray mt-1">
                    Where should we deliver your order?
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">

                    {/* ── Saved addresses ─────────────────────────────── */}
                    {hasSaved && (
                        <div className="card overflow-hidden">
                            <div className="px-5 py-3.5 border-b border-ecoyaan-border bg-ecoyaan-gray-light/80 flex items-center gap-2">
                                <svg className="w-4 h-4 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span className="font-semibold text-sm text-foreground">Saved Addresses</span>
                                <span className="ml-auto text-xs text-ecoyaan-gray bg-ecoyaan-border px-2 py-0.5 rounded-full">
                                    {savedAddresses.length} saved
                                </span>
                            </div>

                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {savedAddresses.map((addr) => {
                                    const isSelected = selectedId === addr.id && !showNewForm;
                                    return (
                                        <div
                                            key={addr.id}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => { setSelectedId(addr.id ?? null); setShowNewForm(false); }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    setSelectedId(addr.id ?? null);
                                                    setShowNewForm(false);
                                                }
                                            }}
                                            className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 outline-none group card-hover ${
                                                isSelected
                                                    ? "border-ecoyaan-green bg-ecoyaan-green-light shadow-md shadow-ecoyaan-green/15"
                                                    : "border-ecoyaan-border bg-white hover:border-ecoyaan-green/40 focus-visible:border-ecoyaan-green"
                                            }`}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                {/* Radio */}
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                    isSelected ? "border-ecoyaan-green bg-ecoyaan-green" : "border-gray-300"
                                                }`}>
                                                    {isSelected && (
                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                    )}
                                                </div>
                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSavedAddress(addr.id!);
                                                        if (selectedId === addr.id) setSelectedId(null);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-ecoyaan-error transition-all"
                                                    aria-label="Remove address"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <p className="font-bold text-sm text-foreground leading-snug">{addr.fullName}</p>
                                            <p className="text-xs text-ecoyaan-gray mt-1">+91 {addr.phone}</p>
                                            <p className="text-xs text-ecoyaan-gray truncate">{addr.city}, {addr.state}</p>
                                            <p className="text-xs text-ecoyaan-gray font-mono mt-0.5">{addr.pinCode}</p>
                                        </div>
                                    );
                                })}

                                {/* Add new card */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowNewForm(!showNewForm);
                                        setSelectedId(null);
                                        setForm(EMPTY_FORM);
                                        setErrors({});
                                        setTouched({});
                                    }}
                                    className={`flex flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed p-4 min-h-[120px] transition-all duration-200 focus:outline-none ${
                                        showNewForm
                                            ? "border-ecoyaan-green bg-ecoyaan-green-light/60"
                                            : "border-ecoyaan-border bg-white hover:border-ecoyaan-green/50 hover:bg-ecoyaan-gray-light/50"
                                    }`}
                                >
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                        showNewForm ? "bg-ecoyaan-green shadow-md shadow-ecoyaan-green/30" : "bg-ecoyaan-gray-light"
                                    }`}>
                                        <svg className={`w-4 h-4 transition-all ${showNewForm ? "text-white rotate-45" : "text-ecoyaan-gray"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className={`text-xs font-semibold ${showNewForm ? "text-ecoyaan-green" : "text-ecoyaan-gray"}`}>
                                        {showNewForm ? "Cancel" : "Add New Address"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── New address form ─────────────────────────────── */}
                    {showNewForm && (
                        <form id="shipping-form" onSubmit={handleNewAddressSubmit} noValidate className="animate-slideUp">
                            <div className="card p-5 sm:p-6">
                                <div className="flex items-center gap-2.5 mb-6">
                                    <div className="w-8 h-8 rounded-xl bg-ecoyaan-green/10 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-ecoyaan-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-sm text-foreground">
                                            {hasSaved ? "Add a New Address" : "Enter Delivery Address"}
                                        </h2>
                                        <p className="text-xs text-ecoyaan-gray">This will be saved for future orders</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Full Name */}
                                    <div className="sm:col-span-2">
                                        <Label text="Full Name" required />
                                        <input
                                            id="fullName" type="text" name="fullName"
                                            value={form.fullName} onChange={handleChange} onBlur={handleBlur}
                                            placeholder="Enter your full name"
                                            className={inputClasses("fullName")}
                                        />
                                        {errors.fullName && touched.fullName && <FieldError msg={errors.fullName} />}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label text="Email Address" required />
                                        <input
                                            id="email" type="email" name="email"
                                            value={form.email} onChange={handleChange} onBlur={handleBlur}
                                            placeholder="you@example.com"
                                            className={inputClasses("email")}
                                        />
                                        {errors.email && touched.email && <FieldError msg={errors.email} />}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <Label text="Phone Number" required />
                                        <div className="relative">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ecoyaan-gray text-sm font-semibold pointer-events-none select-none">
                                                +91
                                            </span>
                                            <input
                                                id="phone" type="tel" name="phone"
                                                value={form.phone} onChange={handleChange} onBlur={handleBlur}
                                                placeholder="9876543210" maxLength={10}
                                                className={`${inputClasses("phone")} pl-12`}
                                            />
                                        </div>
                                        {errors.phone && touched.phone && <FieldError msg={errors.phone} />}
                                    </div>

                                    {/* PIN Code */}
                                    <div>
                                        <Label text="PIN Code" required />
                                        <input
                                            id="pinCode" type="text" name="pinCode"
                                            value={form.pinCode} onChange={handleChange} onBlur={handleBlur}
                                            placeholder="400001" maxLength={6}
                                            className={inputClasses("pinCode")}
                                        />
                                        {errors.pinCode && touched.pinCode && <FieldError msg={errors.pinCode} />}
                                    </div>

                                    {/* City */}
                                    <div>
                                        <Label text="City" required />
                                        <input
                                            id="city" type="text" name="city"
                                            value={form.city} onChange={handleChange} onBlur={handleBlur}
                                            placeholder="Mumbai"
                                            className={inputClasses("city")}
                                        />
                                        {errors.city && touched.city && <FieldError msg={errors.city} />}
                                    </div>

                                    {/* State */}
                                    <div className="sm:col-span-2">
                                        <Label text="State / UT" required />
                                        <select
                                            id="state" name="state"
                                            value={form.state} onChange={handleChange} onBlur={handleBlur}
                                            className={`${inputClasses("state")} cursor-pointer`}
                                        >
                                            <option value="">Select your state</option>
                                            {indianStates.map((s) => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        {errors.state && touched.state && <FieldError msg={errors.state} />}
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
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

            <StickyActionBar
                onBack={handleBack}
                backLabel="Back to Cart"
                onNext={!showNewForm ? handleContinue : undefined}
                nextLabel="Continue to Payment"
                nextDisabled={!showNewForm && !selectedId}
                nextType={showNewForm ? "submit" : "button"}
                formId={showNewForm ? "shipping-form" : undefined}
            />
        </div>
    );
}

function Label({ text, required }: { text: string; required?: boolean }) {
    return (
        <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wider">
            {text}{required && <span className="text-ecoyaan-error ml-1 normal-case tracking-normal">*</span>}
        </label>
    );
}

function FieldError({ msg }: { msg: string }) {
    return (
        <p className="text-ecoyaan-error text-xs mt-1.5 flex items-center gap-1 font-medium">
            <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {msg}
        </p>
    );
}
