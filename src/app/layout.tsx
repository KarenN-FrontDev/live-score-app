import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Providers } from "./providers";
import StyledRegistry from "@/components/StyledRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live Score App",
  description: "A live score website built with Next.js.",
  icons: {
    icon: "/assets/icons/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledRegistry>
          <Header />
          <Providers>{children}</Providers>
        </StyledRegistry>
      </body>
    </html>
  );
}
