import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AmbientParticles from "@/components/AmbientParticles";
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
  metadataBase: new URL("https://noctis-raven.studio"),
  title: "NOCTIS — Artist, Designer & Web Developer",
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
    title: "NOCTIS — Artist, Designer & Web Developer",
    description:
      "Dark minimal portfolio for digital art, interface design and premium web experiences.",
    url: "https://noctis-raven.studio",
    siteName: "NOCTIS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTIS — Artist, Designer & Web Developer",
    description:
      "Dark minimal portfolio for digital art, interface design and premium web experiences.",
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
        <AmbientParticles />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
