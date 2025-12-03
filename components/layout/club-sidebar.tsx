'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/providers/theme-provider'
import { EmberDot } from '@/components/brand'

const navItems = [
  { href: '/club/feed', label: 'Feed', icon: '📡', description: 'Lo último del club' },
  { href: '/club/events', label: 'Eventos', icon: '🎪', description: 'Próximas sesiones' },
  { href: '/club/rooms', label: 'Salas', icon: '💬', description: 'Charlas temáticas' },
  { href: '/club/store', label: 'Tienda', icon: '🛒', description: 'Merch exclusivo' },
]

const tagCategories = [
  { label: 'Gaming', color: 'text-retro-lime' },
  { label: 'Música', color: 'text-retro-cyan' },
  { label: 'Smoke', color: 'text-mambo-ember' },
  { label: 'Retro', color: 'text-retro-magenta' },
  { label: 'Arte', color: 'text-retro-orange' },
]

export function ClubSidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()
  
  return (
    <aside className={cn(
      'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border/50 bg-background/50 backdrop-blur-sm',
      'hidden md:block overflow-y-auto scrollbar-minimal'
    )}>
      <div className="p-4 space-y-6">
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                  'hover:bg-accent/50',
                  isActive && 'bg-accent text-accent-foreground',
                  isActive && theme === 'retro' && 'retro-border'
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
                {isActive && (
                  <EmberDot className="ml-auto w-1.5 h-1.5" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Categories/Tags */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Explorar
          </h3>
          <div className="flex flex-wrap gap-2 px-3">
            {tagCategories.map((tag) => (
              <Link
                key={tag.label}
                href={`/club/feed?tag=${tag.label.toLowerCase()}`}
                className={cn(
                  'px-2 py-1 text-xs rounded-full border border-current/20',
                  'hover:bg-current/10 transition-colors',
                  tag.color
                )}
              >
                #{tag.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-border/50 pt-4">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Actividad
          </h3>
          <div className="px-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">En línea</span>
              <span className="text-mambo-ember font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Posts hoy</span>
              <span className="font-medium">127</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/50 pt-4">
          <p className="px-3 text-xs text-muted-foreground">
            © 2024 Mambo King Culture Club
          </p>
        </div>
      </div>
    </aside>
  )
}
