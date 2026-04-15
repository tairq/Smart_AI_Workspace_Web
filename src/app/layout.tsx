import type { Metadata } from "next";
import Script from "next/script";
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
  verification: {
    google: "IhVdGjbltOeO7yj3AaEFJR18G0TipXPw6cbxn1BC-Ug",
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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S130YXZFHY"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S130YXZFHY');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased grain">
        {children}
      </body>
    </html>
  );
}
