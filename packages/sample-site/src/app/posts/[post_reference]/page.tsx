import GatedTemplate from '@/app/templates/GatedTemplate'
import PublicTemplate from '@/app/templates/PublicTemplate'
import { PostDetail, PostSummary } from '@/types/global'
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

export async function generateStaticParams() {
  // 使用環境變數獲取 API 主機地址
  const apiHost = process.env.CHORE_MASTER_API_HOST

  // 從 API 獲取所有文章列表
  const res = await fetch(`${apiHost}/v1/content_delivery/posts`, {
    headers: {
      'X-PROJECT-API-KEY': process.env.CHORE_MASTER_PROJECT_API_KEY || '',
    },
  })

  if (!res.ok) {
    return []
  }

  const posts: PostSummary[] = (await res.json())['data']

  // 返回每篇文章的 reference 參數
  return posts.map((post) => ({
    post_reference: post.reference,
  }))
}

// 動態配置函數，決定頁面是 SSR 還是 SSG
export async function generateDynamicParams({ params }: PostParams) {
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
    return { dynamic: 'force-dynamic' }
  }

  const post: PostDetail = (await res.json())['data']

  // gated 內容使用 SSR，public 內容使用 SSG
  return {
    dynamic: post.template === 'gated' ? 'force-dynamic' : false,
  }
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

  // 根據 post.template 決定使用哪個模板
  const Template = post.template === 'gated' ? GatedTemplate : PublicTemplate

  return (
    <Template post={post}>
      <MDXRemote source={post.content} components={components} />
    </Template>
  )
}
