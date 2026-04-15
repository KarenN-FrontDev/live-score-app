import "./globals.css";

import type { Metadata } from "next";
import { Barlow } from "next/font/google";

import StyledRegistry from "@/components/StyledRegistry";
import { Header } from "@/components/ui/Header";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Live Score App",
  description: "A live score website built with Next.js.",
  icons: {
    icon: "/assets/icons/favicon.svg",
  },
};

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={barlow.className}>
      <body>
        <StyledRegistry>
          <Header />
          <Providers>{children}</Providers>
        </StyledRegistry>
      </body>
    </html>
  );
}
