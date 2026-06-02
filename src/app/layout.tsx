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
  title: "RAJUL STUDIO MakeUp Hair & Beauty Salon — Unisex Hair Salon in Pradhikaran, Akurdi, Pune",
  description: "RAJUL STUDIO MakeUp Hair & Beauty Salon in Akurdi, Pune — premium unisex hair cuts, hair colour, skin & nail services. Located at Shubhashree Residency, Shop No. A3/A4, near Angan Hotel, Akurdi, Pune - 411035.",
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
