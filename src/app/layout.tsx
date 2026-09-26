import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollBackground from "@/components/ScrollBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Varahi Advertising — Digital Agency | Web Development & Design",
  description:
    "We design and develop modern digital experiences that help businesses grow, connect with their customers, and move faster. Explore our web development, UI/UX, and AI services.",
  keywords: [
    "digital agency",
    "web development",
    "UI UX design",
    "Next.js",
    "React",
    "mobile apps",
    "AI automation",
  ],
  openGraph: {
    title: "Varahi Advertising — Digital Agency",
    description: "Modern digital experiences for modern businesses.",
    type: "website",
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
