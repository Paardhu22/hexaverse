import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GradientBlinds from "@/components/GradientBlinds";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HEXAVERSE 2.0 | College Sports Tournament",
  description: "Modern esports-style tournament management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col pt-16 relative bg-black text-white`}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
          <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
        </div>
        <Navbar />
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
