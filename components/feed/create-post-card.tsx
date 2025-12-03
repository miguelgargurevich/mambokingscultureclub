'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/components/providers/auth-provider'
import { useTheme } from '@/components/providers/theme-provider'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const TAGS = ['Gaming', 'Música', 'Smoke', 'Retro', 'Arte']

export function CreatePostCard() {
  const { profile } = useAuth()
  const { theme } = useTheme()
  const [content, setContent] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const supabase = createClient()
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const handleSubmit = async () => {
    if (!content.trim() || !profile) return
    
    setIsSubmitting(true)
    
    const { error } = await supabase
      .from('posts')
      .insert({
        author_id: profile.id,
        content: content.trim(),
        tags: selectedTags.length > 0 ? selectedTags : null,
        type: 'text' as const,
        visibility: 'club-only' as const,
      })
    
    if (!error) {
      setContent('')
      setSelectedTags([])
      setIsExpanded(false)
      // Ideally trigger a refresh here
      window.location.reload()
    }
    
    setIsSubmitting(false)
  }
  
  return (
    <Card variant={theme === 'retro' ? 'retro' : 'minimal'} className="p-4">
      <div className="flex gap-3">
        <Avatar 
          src={profile?.avatar_url}
          alt={profile?.display_name || 'Tu'}
          fallback={profile?.display_name || 'U'}
          size="md"
        />
        
        <div className="flex-1">
          <Textarea
            placeholder="¿Qué está pasando en tu sesión?"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              if (e.target.value) setIsExpanded(true)
            }}
            onFocus={() => setIsExpanded(true)}
            className={cn(
              'min-h-[60px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0',
              isExpanded && 'min-h-[100px]'
            )}
            variant={theme === 'retro' ? 'retro' : 'minimal'}
          />
          
          {isExpanded && (
            <div className="mt-4 space-y-4">
              {/* Tags */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Etiquetas</p>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'ember' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" disabled>
                    📷 Imagen
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    🎵 Audio
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setContent('')
                      setSelectedTags([])
                      setIsExpanded(false)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    variant="ember" 
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!content.trim() || isSubmitting}
                  >
                    {isSubmitting ? 'Publicando...' : 'Publicar'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
