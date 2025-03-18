import Link from 'next/link'

import { PostSummary } from '@/types/global'
// 將 revalidate 設為 false 以啟用 SSG
// 或設置一個數字值(秒)來實現 ISR (增量靜態再生成)
export const revalidate = false

export default async function Home() {
  // 從 API 獲取文章列表
  // 移除 cache: 'no-store' 以允許 Next.js 在構建時緩存結果
  const res = await fetch('http://localhost:10000/v1/content_delivery/posts')

  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }

  const posts: PostSummary[] = (await res.json())['data']

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">我的部落格</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.reference}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/posts/${post.reference}`}>
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                {post.title}
              </h2>
            </Link>
            <Link
              href={`/posts/${post.reference}`}
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              閱讀更多 &rarr;
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
