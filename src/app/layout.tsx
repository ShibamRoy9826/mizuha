import type { Metadata } from "next";
import {Exo_2} from "next/font/google";
import "@/styles/globals.css";

// Fonts -----------------------------------------------------
const exo2= Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
});


// Metadata -------------------------------------------------------
export const metadata: Metadata = {
  title: "New Tab",
  description: "New tab by Shibam Roy",
};


// Root layout -------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo2.variable} ${exo2.className} antialiased w-[100vw] h-[100vh] overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
