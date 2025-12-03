import { Suspense } from 'react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { FeedClient } from '@/components/feed/feed-client'
import { CreatePostCard } from '@/components/feed/create-post-card'

async function getPosts() {
  const supabase = createServerSupabaseClient()
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:users(id, username, display_name, avatar_url)
    `)
    .order('created_at', { ascending: false })
    .limit(20)
  
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  
  return posts
}

export default async function FeedPage() {
  const posts = await getPosts()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">El Feed</h1>
        <p className="text-muted-foreground">Lo que está pasando en el club</p>
      </div>
      
      <CreatePostCard />
      
      <Suspense fallback={<FeedSkeleton />}>
        <FeedClient initialPosts={posts} />
      </Suspense>
    </div>
  )
}

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-3 bg-muted rounded w-1/6" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
