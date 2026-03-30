"use client";

import React from "react";

interface StepIndicatorProps {
    currentStep: number;
}

const steps = [
    { number: 1, label: "Cart", icon: "🛒" },
    { number: 2, label: "Shipping", icon: "📦" },
    { number: 3, label: "Payment", icon: "💳" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center py-4 mb-2">
            {steps.map((step, index) => {
                const isDone = step.number < currentStep;
                const isActive = step.number === currentStep;

                return (
                    <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`
                                    relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold
                                    transition-all duration-300
                                    ${isDone
                                        ? "bg-ecoyaan-green text-white shadow-md shadow-ecoyaan-green/30"
                                        : isActive
                                            ? "bg-ecoyaan-green text-white shadow-lg shadow-ecoyaan-green/40 ring-4 ring-ecoyaan-green/15"
                                            : "bg-white text-ecoyaan-gray border-2 border-ecoyaan-border"
                                    }
                                `}
                            >
                                {isDone ? (
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className={isActive ? "text-white" : ""}>{step.number}</span>
                                )}
                            </div>
                            <span
                                className={`text-xs font-semibold tracking-wide transition-colors duration-300 hidden sm:block ${
                                    isDone || isActive ? "text-ecoyaan-green" : "text-ecoyaan-gray"
                                }`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-3 sm:mx-4 h-0.5 max-w-[80px] rounded-full overflow-hidden bg-ecoyaan-border">
                                <div
                                    className="h-full bg-ecoyaan-green rounded-full transition-all duration-500"
                                    style={{ width: step.number < currentStep ? "100%" : "0%" }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
