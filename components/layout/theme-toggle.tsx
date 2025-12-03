'use client'

import { useTheme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn('relative overflow-hidden', className)}
    >
      <span className={cn(
        'transition-all duration-300',
        theme === 'minimal' ? 'opacity-100' : 'opacity-0 absolute'
      )}>
        🌀 Modo Retro
      </span>
      <span className={cn(
        'transition-all duration-300',
        theme === 'retro' ? 'opacity-100' : 'opacity-0 absolute'
      )}>
        ⚫ Modo Minimal
      </span>
    </Button>
  )
}
