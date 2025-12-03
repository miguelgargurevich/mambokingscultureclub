import * as React from 'react'
import { cn, getInitials } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    const initials = fallback ? getInitials(fallback) : alt ? getInitials(alt) : '?'

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-muted',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mambo-ember/20 to-mambo-ember/40 font-medium text-mambo-ember">
            {initials}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

// Retro variant with neon border
const AvatarRetro = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-retro-magenta via-retro-cyan to-retro-lime animate-pulse blur-sm" />
        <Avatar
          ref={ref}
          className={cn('ring-2 ring-retro-magenta relative', className)}
          {...props}
        />
      </div>
    )
  }
)
AvatarRetro.displayName = 'AvatarRetro'

export { Avatar, AvatarRetro }
