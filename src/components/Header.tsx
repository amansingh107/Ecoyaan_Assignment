"use client";

import React from "react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white border-b border-ecoyaan-border sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <svg
                        className="w-7 h-7 text-ecoyaan-green transition-transform group-hover:scale-110"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09ZM21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11ZM18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84 23 4.94 19.07C1.03 15.17 1.03 8.83 4.94 4.93C5.34 4.53 5.76 4.17 6.21 3.85C6.96 3.32 8.14 4.21 8.06 5.04C7.79 7.9 8.75 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95Z" />
                    </svg>
                    <div>
                        <span className="text-xl font-bold text-ecoyaan-green">
                            Ecoyaan
                        </span>
                        <p className="text-[10px] text-ecoyaan-teal -mt-1 hidden sm:block">
                            Sustainability made easy
                        </p>
                    </div>
                </Link>
                <div className="flex items-center gap-4 text-sm text-ecoyaan-gray">
                    <span className="hidden md:inline">🌱 Shop sustainably</span>
                </div>
            </div>
        </header>
    );
}
