"use client";

import React from "react";

interface StickyActionBarProps {
    onBack?: () => void;
    backLabel?: string;
    onNext?: () => void;
    nextLabel: string;
    nextDisabled?: boolean;
    isLoading?: boolean;
    loadingLabel?: string;
    nextType?: "button" | "submit";
    formId?: string;
}

export default function StickyActionBar({
    onBack,
    backLabel = "Back",
    onNext,
    nextLabel,
    nextDisabled = false,
    isLoading = false,
    loadingLabel = "Please wait...",
    nextType = "button",
    formId,
}: StickyActionBarProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            {/* Blur backdrop */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-ecoyaan-border/60" />
            {/* Shadow overlay */}
            <div className="absolute inset-0 shadow-[0_-8px_40px_rgba(0,0,0,0.08)]" style={{ pointerEvents: "none" }} />

            <div className="relative max-w-5xl mx-auto px-4 py-3 flex gap-3 items-center">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isLoading}
                        className="group flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-xl border border-ecoyaan-border bg-white text-foreground text-sm font-medium hover:border-ecoyaan-green/40 hover:bg-ecoyaan-green-light/50 active:scale-[0.98] transition-all duration-150 disabled:opacity-40 whitespace-nowrap shadow-sm"
                    >
                        <svg className="w-4 h-4 flex-shrink-0 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="hidden sm:inline">{backLabel}</span>
                    </button>
                )}

                <button
                    type={nextType}
                    form={formId}
                    onClick={nextType !== "submit" ? onNext : undefined}
                    disabled={nextDisabled || isLoading}
                    className={`btn-primary flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        nextDisabled || isLoading
                            ? "bg-ecoyaan-green/50 text-white/80 cursor-not-allowed shadow-none"
                            : "bg-ecoyaan-green hover:bg-ecoyaan-green-dark text-white shadow-md shadow-ecoyaan-green/25"
                    }`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                            {loadingLabel}
                        </>
                    ) : (
                        <>
                            <span>{nextLabel}</span>
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
