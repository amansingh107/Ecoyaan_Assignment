import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
      <body className={`${inter.variable} antialiased min-h-screen`} style={{ background: "var(--color-background)" }}>
        <CheckoutProvider>
          <Header />
          <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            {children}
          </main>
        </CheckoutProvider>
      </body>
    </html>
  );
}
