export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">关于我们</h3>
            <ul className="space-y-3">
              <li>
                <a href="/zh/about" className="text-gray-600 hover:text-gray-900">
                  品牌故事
                </a>
              </li>
              <li>
                <a href="/zh/about" className="text-gray-600 hover:text-gray-900">
                  大师团队
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">产品</h3>
            <ul className="space-y-3">
              <li>
                <a href="/zh/products" className="text-gray-600 hover:text-gray-900">
                  所有产品
                </a>
              </li>
              <li>
                <a href="/zh/products?category=classic" className="text-gray-600 hover:text-gray-900">
                  传统经典系列
                </a>
              </li>
              <li>
                <a href="/zh/products?category=modern" className="text-gray-600 hover:text-gray-900">
                  现代创新系列
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">联系</h3>
            <ul className="space-y-3">
              <li>
                <a href="/zh/about" className="text-gray-600 hover:text-gray-900">
                  联系我们
                </a>
              </li>
              <li>
                <a href="mailto:info@shiwanceramics.com" className="text-gray-600 hover:text-gray-900">
                  info@shiwanceramics.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; 2026 石湾陶瓷公仔. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
