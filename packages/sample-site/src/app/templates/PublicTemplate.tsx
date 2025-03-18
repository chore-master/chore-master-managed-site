import { PostDetail } from '@/types/global'

export default function PublicTemplate({
  post,
  children,
}: {
  post: PostDetail
  children: React.ReactNode
}) {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <a href="/" className="text-blue-600 hover:underline">
          &larr; 返回首頁
        </a>
      </div>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        </header>
        <div className="prose max-w-none">{children}</div>
      </article>
    </main>
  )
}
