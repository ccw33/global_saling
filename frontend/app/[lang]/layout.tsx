import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: '石湾陶瓷公仔 - 千年陶艺，匠心传承',
  description: '探索石湾陶艺的千年历史，收藏精美的陶瓷公仔作品。传统工艺与现代美学的完美结合。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Navbar locale="zh" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
