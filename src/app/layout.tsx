import type { Metadata } from "next";
import { Archivo, Archivo_Black, Space_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./aurelius.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostHogProvider from "@/components/PostHogProvider";
import PostHogPageView from "@/components/PostHogPageView";
import LeadPopup from "@/components/LeadPopup";
import RevealArm from "@/components/RevealArm";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/schema";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-archivo-black",
  weight: "400",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

// Runs before first paint: picks the saved theme, else the OS preference,
// so the page never flashes the wrong palette.
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t}catch(e){d.dataset.theme='dark'}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aureliusmedia.co"),
  alternates: {
    canonical: "https://www.aureliusmedia.co",
    languages: {
      "en-IN": "https://www.aureliusmedia.co",
      "x-default": "https://www.aureliusmedia.co",
    },
  },
  title: {
    default: "Aurelius Media | AI-Powered Performance Marketing Agency",
    template: "%s | Aurelius Media",
  },
  description:
    "AI-powered performance marketing agency. Google & Meta Ads, AI Creative, Video Production and more. $15M+ in ad spend managed across 25+ countries.",
  keywords: [
    "performance marketing agency",
    "AI marketing agency",
    "Google Ads agency India",
    "Meta Ads management",
    "digital marketing agency",
    "AI creative design",
    "book marketing agency",
    "education marketing",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aureliusmedia.co",
    siteName: "Aurelius Media",
    title: "Aurelius Media | AI-Powered Performance Marketing Agency",
    description:
      "20+ years of digital marketing expertise. $15M+ in ad spend managed. 84+ businesses scaled across 25+ countries.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Aurelius Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurelius Media | AI-Powered Performance Marketing Agency",
    description:
      "AI-powered performance marketing agency with 20+ years of experience.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${archivo.variable} ${archivoBlack.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* GA loads only on the production domain, so local and preview builds don't send hits */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!/(^|\\.)aureliusmedia\\.co$/.test(location.hostname))return;var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=G-Y2CTMVVP1H';document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','G-Y2CTMVVP1H');})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <PostHogProvider>
          <PostHogPageView />
          <LeadPopup />
          <Header />
          <main>{children}</main>
          <Footer />
          <RevealArm />
        </PostHogProvider>
      </body>
    </html>
  );
}
