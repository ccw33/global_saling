'use client'

import Link from 'next/link'

interface NavLink {
  href: string
  label: string
  labelEn: string
}

const navLinks: NavLink[] = [
  { href: '/', label: '首页', labelEn: 'Home' },
  { href: '/products', label: '产品', labelEn: 'Products' },
  { href: '/blog', label: '博客', labelEn: 'Blog' },
  { href: '/about', label: '关于', labelEn: 'About' },
]

interface NavbarProps {
  locale: 'zh' | 'en'
}

export default function Navbar({ locale }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="text-2xl font-bold text-gray-900">
              石湾陶瓷
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {locale === 'zh' ? link.label : link.labelEn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
