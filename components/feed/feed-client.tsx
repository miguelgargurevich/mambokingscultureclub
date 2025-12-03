'use client'

import { useState } from 'react'
import { PostCard } from './post-card'
import type { PostWithAuthor } from '@/lib/supabase/database.types'

interface FeedClientProps {
  initialPosts: PostWithAuthor[]
}

export function FeedClient({ initialPosts }: FeedClientProps) {
  const [posts, setPosts] = useState<PostWithAuthor[]>(initialPosts)
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🌫️</div>
        <h3 className="text-lg font-medium mb-2">El feed está vacío</h3>
        <p className="text-muted-foreground">
          Sé el primero en compartir algo con el club
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      
      {/* Load more placeholder */}
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          Has llegado al final... por ahora 🌀
        </p>
      </div>
    </div>
  )
}
