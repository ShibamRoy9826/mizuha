import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { BgProvider } from "@/contexts/background";
import BottomBar from "@/components/bottomBar";
import { SettingsProvider } from "@/contexts/settingsData";
import { ModalProvider } from "@/contexts/modals";
import { PlayerProvider } from "@/contexts/player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mizuha",
  description: "A glass-themed new-tab app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <BgProvider>
          <SettingsProvider>
            <PlayerProvider>
              <ModalProvider>
                <Background></Background>
                {children}

              </ModalProvider>
            </PlayerProvider>
          </SettingsProvider>
        </BgProvider>
      </body>
    </html >
  );
}
