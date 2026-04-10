import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live Score App",
  description: "A live score website built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
