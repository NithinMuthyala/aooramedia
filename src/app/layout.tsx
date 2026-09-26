import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  /* ─── Basic ─────────────────────────────────────────── */
  metadataBase: new URL("https://www.varahiadvertising.com"),
  title: {
    default: "Varahi Advertising — Digital Agency | Web Design & Development",
    template: "%s | Varahi Advertising",
  },
  description:
    "Varahi Advertising is a full-service digital agency in India specialising in web development, UI/UX design, mobile apps, digital marketing, AI automation, and cybersecurity. Let's build something remarkable.",
  keywords: [
    "digital agency India",
    "web development company",
    "UI UX design agency",
    "Next.js development",
    "React development",
    "mobile app development",
    "AI automation services",
    "digital marketing agency",
    "SEO services India",
    "cybersecurity services",
    "ERP solutions",
    "Varahi Advertising",
    "web design India",
    "software development company",
  ],
  authors: [{ name: "Varahi Advertising", url: "https://www.varahiadvertising.com" }],
  creator: "Varahi Advertising",
  publisher: "Varahi Advertising",
  category: "technology",

  /* ─── Canonical & alternates ────────────────────────── */
  alternates: {
    canonical: "/",
  },

  /* ─── Open Graph ─────────────────────────────────────── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.varahiadvertising.com",
    siteName: "Varahi Advertising",
    title: "Varahi Advertising — Digital Agency | Web Design & Development",
    description:
      "Full-service digital agency in India — web development, UI/UX, mobile apps, AI automation & digital marketing.",
    images: [
      {
        url: "/assets/varahi_logo.PNG",
        width: 1200,
        height: 630,
        alt: "Varahi Advertising — Digital Agency",
      },
    ],
  },

  /* ─── Twitter / X Card ───────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: "Varahi Advertising — Digital Agency",
    description:
      "Full-service digital agency in India — web development, UI/UX, mobile apps, AI automation & digital marketing.",
    images: ["/assets/varahi_logo.PNG"],
    creator: "@varahiadvertising",
  },

  /* ─── Icons (file-based via app/icon.png is primary) ─── */
  icons: {
    icon: [
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon/web-app-manifest-192x192.png",
  },

  /* ─── Robots ─────────────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full flex flex-col bg-[#FDF8EF]" suppressHydrationWarning>
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#1D1D1F",
              color: "#FDF8EF",
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "14px",
              fontWeight: "500",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            },
            success: {
              iconTheme: { primary: "#F5B800", secondary: "#1D1D1F" },
            },
            error: {
              iconTheme: { primary: "#A90016", secondary: "#FDF8EF" },
            },
          }}
        />

        {/* Custom interactive mouse cursor */}
        <CustomCursor />

        {/* Global scroll-driven ambient background */}
        <ScrollBackground />

        {/* Smooth scroll sync */}
        <SmoothScroll />

        {/* Navbar sits above the background */}
        <div className="relative z-50">
          <Navbar />
        </div>

        {/* Page content above the background */}
        <main className="relative z-10 flex-1">
          {children}
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </body>
    </html>
  );
}
