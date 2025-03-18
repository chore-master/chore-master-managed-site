import { PostDetail } from '@/types/global'

export default function GatedTemplate({
  post,
  children,
}: {
  post: PostDetail
  children: React.ReactNode
}) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl bg-gray-50 border border-gray-200 rounded-lg">
      <div className="mb-8">
        <a href="/" className="text-blue-600 hover:underline">
          &larr; 返回首頁
        </a>
      </div>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md inline-block">
            會員專屬內容
          </div>
        </header>
        <div className="prose max-w-none">{children}</div>
      </article>
    </main>
  )
}
