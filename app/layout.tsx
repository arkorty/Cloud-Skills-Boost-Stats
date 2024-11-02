import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BoostStats",
  description:
    "An interactive platform for managing student progress, showcasing assignments, badges, and course completion in a user-friendly interface.",
  openGraph: {
    title: "BoostStats",
    description:
      "An interactive platform for managing student progress, showcasing assignments, badges, and course completion in a user-friendly interface.",
    url: "https://booststats.vercel.app",
    siteName: "BoostStats",
    images: "https://booststats.vercel.app/og-image.png",
    locale: "en_US",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
