"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-ecoyaan-border sticky top-0 z-50 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
            {/* Thin brand accent line at top */}
            <div className="h-0.5 bg-gradient-to-r from-ecoyaan-green via-ecoyaan-teal to-emerald-400 w-full" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-xl bg-ecoyaan-green flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09ZM21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11ZM18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84 23 4.94 19.07C1.03 15.17 1.03 8.83 4.94 4.93C5.34 4.53 5.76 4.17 6.21 3.85C6.96 3.32 8.14 4.21 8.06 5.04C7.79 7.9 8.75 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95Z" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-lg font-bold text-ecoyaan-green tracking-tight">
                            Ecoyaan
                        </span>
                        <p className="text-[10px] text-ecoyaan-gray -mt-0.5 hidden sm:block font-medium tracking-wide uppercase">
                            Sustainability made easy
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-2 text-xs text-ecoyaan-gray bg-ecoyaan-green-light border border-ecoyaan-green/20 px-3 py-1.5 rounded-full">
                    <span className="text-ecoyaan-green">🌿</span>
                    <span className="hidden sm:inline font-medium text-ecoyaan-green">100% Eco-Certified</span>
                    <span className="sm:hidden font-medium text-ecoyaan-green">Eco</span>
                </div>
            </div>
        </header>
    );
}
