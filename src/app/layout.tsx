import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
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
  title: "JS Salon — Unisex Hair Salon in Pradhikaran, Akurdi, Pune",
  description: "JS Salon in Akurdi, Pune — premium unisex hair cuts, hair colour, skin & nail services. Located at Tilak Rd, Sector 27, Pradhikaran, Nigdi. Call +91 74995 39835.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
