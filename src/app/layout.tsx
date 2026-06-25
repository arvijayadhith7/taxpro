import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tax e-Filing Portal | Government of India",
  description: "Official Tax e-Filing Portal for Income Tax, GST, and TDS compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text">
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
