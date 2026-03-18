import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aurelius Media | AI-Powered Performance Marketing Agency",
    template: "%s | Aurelius Media",
  },
  description:
    "AI-powered performance marketing agency with 20+ years of experience. Google & Meta Ads, AI Creative, Video Production, Book Marketing and more. $15M+ in ad spend managed across 25+ countries.",
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
    url: "https://aureliusmedia.co",
    siteName: "Aurelius Media",
    title: "Aurelius Media | AI-Powered Performance Marketing Agency",
    description:
      "20+ years of digital marketing expertise. $15M+ in ad spend managed. 200+ businesses scaled across 25+ countries.",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aurelius Media",
              url: "https://aureliusmedia.co",
              logo: "https://aureliusmedia.co/logo.png",
              description:
                "AI-powered performance marketing agency with 20+ years of digital marketing experience.",
              founder: {
                "@type": "Person",
                name: "Ayush Pant",
                jobTitle: "Founder & CMO",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gurgaon",
                addressCountry: "IN",
              },
              sameAs: [
                "https://linkedin.com/company/aurelius-media",
                "https://x.com/aureliusmedia",
                "https://instagram.com/aureliusmedia",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
