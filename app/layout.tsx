import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

const SITE_URL = "https://aatech.pk";
const GA_ID = "G-QFZX6LZJ6Z"; // Google Analytics 4 measurement ID

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AATech — Global AI & Software Development Company",
  description:
    "AATech is a global software house building AI-powered software, e-commerce, automation, reporting and big-data solutions. Delivering to clients worldwide.",
  keywords: [
    "AATech",
    "AI software development",
    "e-commerce development",
    "business automation",
    "web development",
    "mobile app development",
    "big data analytics",
    "custom software",
  ],
  authors: [{ name: "AATech" }],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "AATech — IT & Software Development Company",
    description:
      "Custom software, web & mobile apps, cloud and IT consulting. Engineered to help your business grow.",
    siteName: "AATech",
  },
  twitter: {
    card: "summary_large_image",
    title: "AATech — IT & Software Development Company",
    description:
      "Custom software, web & mobile apps, cloud and IT consulting.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>

        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
