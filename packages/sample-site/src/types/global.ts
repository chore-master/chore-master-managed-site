export interface PostSummary {
  reference: string
  title: string
}

export interface PostDetail {
  reference: string
  title: string
  content: string
  template: 'public' | 'gated'
}
