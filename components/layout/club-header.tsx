'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoMinimalFull, LogoRetroFull } from '@/components/brand'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/providers/theme-provider'
import { useAuth } from '@/components/providers/auth-provider'
import { cn } from '@/lib/utils'

export function ClubHeader() {
  const { theme } = useTheme()
  const { profile, signOut } = useAuth()
  
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/50 backdrop-blur-md bg-background/80 h-16">
      <div className="h-full px-4 flex items-center justify-between">
        <Link href="/club/feed">
          {theme === 'minimal' ? (
            <LogoMinimalFull />
          ) : (
            <LogoRetroFull />
          )}
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-mambo-ember rounded-full" />
          </Button>
          
          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Link href={`/club/profile/${profile?.username || profile?.id}`}>
              <Avatar 
                src={profile?.avatar_url} 
                alt={profile?.display_name || 'Usuario'}
                fallback={profile?.display_name || profile?.email || 'U'}
                size="sm"
              />
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Salir
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
