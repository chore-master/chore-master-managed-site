import { PostDetail } from '@/types/global'
import SampleComponent from '@module/utils/src/SampleComponent'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface PostParams {
  params: {
    post_reference: string
  }
}

// 创建自定义组件映射
const components = {
  SampleComponent,
}

export default async function PostPage({ params }: PostParams) {
  const { post_reference } = params

  // 從 API 獲取文章內容
  const res = await fetch(
    `${process.env.CHORE_MASTER_API_HOST}/v1/content_delivery/posts/${post_reference}`,
    {
      headers: {
        'X-PROJECT-API-KEY': process.env.CHORE_MASTER_PROJECT_API_KEY || '',
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch post')
  }

  const post: PostDetail = (await res.json())['data']

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
        <div className="prose max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
    </main>
  )
}
