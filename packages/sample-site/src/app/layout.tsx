import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '我的部落格',
  description: '一個使用 Next.js 建立的部落格',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto">
            <a href="/" className="text-xl font-bold">
              我的部落格
            </a>
          </div>
        </header>
        {children}
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-gray-600">
            &copy; {new Date().getFullYear()} 我的部落格 - 版權所有
          </div>
        </footer>
      </body>
    </html>
  )
}
