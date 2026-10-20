import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import AmbientParticles from "@/components/AmbientParticles";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "NOCTIS RAVEN — Artist, Designer & Web Developer",
    template: "%s | NOCTIS RAVEN",
  },
  description:
    "Portfolio of Noctis Raven — digital artist, designer and web developer creating visual experiences and modern web projects.",
  keywords: [
    "Noctis",
    "Noctis Raven",
    "artist",
    "designer",
    "web developer",
    "digital art",
    "portfolio",
  ],
  openGraph: {
    title: "NOCTIS RAVEN — Artist, Designer & Web Developer",
    description:
      "Digital art, interface design and expressive web experiences by NOCTIS RAVEN.",
    url: siteUrl,
    siteName: "NOCTIS RAVEN",
    type: "website",
    images: [{ url: "/noctis-portrait.png", width: 1024, height: 1024, alt: "Portrait of NOCTIS RAVEN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTIS RAVEN — Artist, Designer & Web Developer",
    description:
      "Digital art, interface design and expressive web experiences by NOCTIS RAVEN.",
    images: ["/noctis-portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050505] text-[#f5f5f5]">
        <MotionConfig reducedMotion="user">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#c8102e] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white">
            Перейти к содержимому / Skip to content
          </a>
          <AmbientParticles />
          <div className="relative z-10">{children}</div>
        </MotionConfig>
      </body>
    </html>
  );
}
