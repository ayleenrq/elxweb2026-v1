import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "elux — AI-Native Digital Products",
  description:
    "We design and build AI-native digital products. From product strategy to launch — refined, fast, and intelligent.",
  keywords: [
    "AI design",
    "product design",
    "web development",
    "brand identity",
    "UX design",
    "digital studio",
  ],
  openGraph: {
    title: "eluxspace — AI-Native Digital Products",
    description:
      "We design and build AI-native digital products. Refined, fast, and intelligent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        {/* Satoshi from Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
