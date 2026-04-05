import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

// Reuse same font for both display and body (Century Gothic brand spec)
const josefinSansBody = Josefin_Sans({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/logo-new.png",
    shortcut: "/logo-new.png",
    apple: "/logo-new.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${josefinSansBody.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased grain">
        {children}
      </body>
    </html>
  );
}
