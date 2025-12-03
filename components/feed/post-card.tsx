'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn, formatRelativeTime } from '@/lib/utils'
import { useTheme } from '@/components/providers/theme-provider'
import { useAuth } from '@/components/providers/auth-provider'
import { createBrowserClient } from '@supabase/ssr'
import type { PostWithAuthor } from '@/lib/supabase/database.types'

interface PostCardProps {
  post: PostWithAuthor
  onLike?: () => void
}

export function PostCard({ post, onLike }: PostCardProps) {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const [isLiking, setIsLiking] = useState(false)
  
  // Create untyped client until DB schema is set up
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const handleLike = async () => {
    if (!user || isLiking) return
    
    setIsLiking(true)
    
    if (isLiked) {
      // Unlike
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.id)
      
      if (!error) {
        setIsLiked(false)
        setLikesCount(prev => Math.max(0, prev - 1))
      }
    } else {
      // Like
      const { error } = await supabase
        .from('likes')
        .insert({ post_id: post.id, user_id: user.id })
      
      if (!error) {
        setIsLiked(true)
        setLikesCount(prev => prev + 1)
      }
    }
    
    setIsLiking(false)
    onLike?.()
  }
  
  // Check if user has liked this post
  useState(() => {
    if (!user) return
    
    supabase
      .from('likes')
      .select('id')
      .eq('post_id', post.id)
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setIsLiked(true)
      })
  })
  
  const tagBadgeMap: Record<string, 'ember' | 'gaming' | 'smoke' | 'retro' | 'music'> = {
    gaming: 'gaming',
    música: 'music',
    musica: 'music',
    smoke: 'smoke',
    humo: 'smoke',
    retro: 'retro',
    arte: 'ember',
  }
  
  return (
    <Card variant={theme === 'retro' ? 'retro' : 'minimal'} className="p-4">
      {/* Author Header */}
      <div className="flex items-start gap-3">
        <Link href={`/club/profile/${post.author.username || post.author.id}`}>
          <Avatar 
            src={post.author.avatar_url}
            alt={post.author.display_name || 'Usuario'}
            fallback={post.author.display_name || post.author.username || 'U'}
            size="md"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Link 
              href={`/club/profile/${post.author.username || post.author.id}`}
              className="font-medium hover:text-mambo-ember transition-colors truncate"
            >
              {post.author.display_name || post.author.username || 'Usuario'}
            </Link>
            {post.author.username && (
              <span className="text-sm text-muted-foreground truncate">
                @{post.author.username}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatRelativeTime(post.created_at)}
          </div>
        </div>
        
        {/* More options */}
        <Button variant="ghost" size="icon" className="opacity-50 hover:opacity-100">
          <span>⋮</span>
        </Button>
      </div>
      
      {/* Content */}
      <div className="mt-3">
        <p className="whitespace-pre-wrap">{post.content}</p>
        
        {/* Media */}
        {post.media_urls && post.media_urls.length > 0 && (
          <div className={cn(
            'mt-3 rounded-lg overflow-hidden',
            post.media_urls.length === 1 && 'aspect-video',
            post.media_urls.length > 1 && 'grid grid-cols-2 gap-1'
          )}>
            {post.media_urls.slice(0, 4).map((url, i) => (
              <img 
                key={i}
                src={url} 
                alt={`Media ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        )}
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/club/feed?tag=${tag.toLowerCase()}`}>
                <Badge 
                  variant={tagBadgeMap[tag.toLowerCase()] || 'secondary'}
                  className="cursor-pointer"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            'gap-2',
            isLiked && 'text-mambo-ember'
          )}
          onClick={handleLike}
          disabled={isLiking}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likesCount}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <span>💬</span>
          <span>{post.replies_count}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <span>🔗</span>
          <span>Compartir</span>
        </Button>
      </div>
    </Card>
  )
}
