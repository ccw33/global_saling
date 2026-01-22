import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "石湾公仔海外独立站 | Shiwan Ceramics",
  description: "石湾陶瓷公仔 - 传承千年的非遗艺术品，精选大师作品，为您带来东方美学的极致体验",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
