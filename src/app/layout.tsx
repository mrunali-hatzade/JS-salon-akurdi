import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { preconnect, prefetchDNS } from "react-dom";
import Preloader from "@/components/Preloader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SWATI'S BEAUTY SALON SPA AND ACADEMY — Unisex Hair Salon in Pradhikaran, Akurdi, Pune",
  description: "SWATI'S BEAUTY SALON SPA AND ACADEMY in Akurdi, Pune — premium unisex hair cuts, hair colour, skin & nail services. Located at 20/4, Lig Colony Road, Sindhu Nagar, Sector 25, Pradhikaran, Akurdi. Call +91 72769 59293.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://www.google.com");
  prefetchDNS("https://www.google.com");
  
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
