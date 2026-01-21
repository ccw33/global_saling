import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  const { lang } = params

  return (
    <html lang={lang === 'zh' ? 'zh-CN' : 'en'}>
      <body className="antialiased">
        <Navbar locale={lang} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
