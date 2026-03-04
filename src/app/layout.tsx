import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecoyaan — Sustainable Shopping Checkout",
  description:
    "Complete your eco-friendly purchase on Ecoyaan. Sustainability made easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-ecoyaan-gray-light min-h-screen`}>
        <CheckoutProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            {children}
          </main>
        </CheckoutProvider>
      </body>
    </html>
  );
}
