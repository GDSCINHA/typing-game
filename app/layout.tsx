import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontNeo, fontConsolas } from "@/config/fonts";

export const metadata: Metadata = {
  title: 'GDGoC Game',
  description: '개발자와 비개발자가 같이 성장하는 즐거움 with Google',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontNeo.variable,
          fontSans.variable,
          fontConsolas.variable,
        )}
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <main>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
