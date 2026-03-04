"use client";

import React from "react";

interface StepIndicatorProps {
    currentStep: number;
}

const steps = [
    { number: 1, label: "Cart" },
    { number: 2, label: "Shipping" },
    { number: 3, label: "Payment" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center py-6 px-4">
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex items-center">
                        <div
                            className={`
                flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold
                transition-all duration-300
                ${step.number < currentStep
                                    ? "bg-ecoyaan-green text-white"
                                    : step.number === currentStep
                                        ? "bg-ecoyaan-green text-white shadow-md shadow-ecoyaan-green/30"
                                        : "bg-gray-200 text-gray-500"
                                }
              `}
                        >
                            {step.number < currentStep ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step.number
                            )}
                        </div>
                        <span
                            className={`
                ml-2 text-sm font-medium hidden sm:inline
                ${step.number <= currentStep
                                    ? "text-ecoyaan-green"
                                    : "text-gray-400"
                                }
              `}
                        >
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`
                w-12 sm:w-20 h-0.5 mx-2 sm:mx-4 transition-all duration-300
                ${step.number < currentStep ? "bg-ecoyaan-green" : "bg-gray-200"}
              `}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
