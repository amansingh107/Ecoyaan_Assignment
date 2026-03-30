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
    /** Use "submit" + formId to submit a form from outside the form element */
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-md border-t border-ecoyaan-border shadow-[0_-4px_32px_rgba(0,0,0,0.10)]">
            <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3 items-center">
                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 px-4 sm:px-5 py-3 rounded-xl border border-ecoyaan-border text-foreground text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-40 whitespace-nowrap"
                    >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        nextDisabled || isLoading
                            ? "bg-ecoyaan-green/60 text-white cursor-not-allowed"
                            : "bg-ecoyaan-green hover:bg-ecoyaan-green-dark active:scale-[0.98] text-white shadow-sm hover:shadow-md shadow-ecoyaan-green/20"
                    }`}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
                            {loadingLabel}
                        </>
                    ) : (
                        <>
                            {nextLabel}
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
