import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Background from "@/components/background";
import { BgProvider } from "@/contexts/background";
import { SettingsProvider } from "@/contexts/settingsData";
import { ModalProvider } from "@/contexts/modals";
import { PlayerProvider } from "@/contexts/player";
import { TimeProvider } from "@/contexts/timers";

const geistSans = JetBrains_Mono({
  variable: "--font-geist-sans",
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
        className={`${geistSans.className} antialiased`}
      >
        <BgProvider>
          <SettingsProvider>
            <PlayerProvider>
              <TimeProvider>
                <ModalProvider>
                  <Background></Background>
                  {children}

                </ModalProvider>
              </TimeProvider>
            </PlayerProvider>
          </SettingsProvider>
        </BgProvider>
      </body>
    </html >
  );
}
