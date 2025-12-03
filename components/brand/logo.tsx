'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 80, height: 80 },
  xl: { width: 120, height: 120 },
}

// Minimal Monoline Logo - One Line One Hit
export function LogoMinimal({ className, size = 'md', animated = true }: LogoProps) {
  const { width, height } = sizeMap[size]
  
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground"
      >
        {/* Monoline M that forms a joint shape with crown hint */}
        <path
          d="M 20 75 
             L 20 35 
             L 35 55 
             L 50 30 
             L 65 55 
             L 80 35 
             L 80 75
             M 50 30
             L 50 15
             L 52 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            animated && 'animate-[draw_2s_ease-in-out]'
          )}
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 0,
          }}
        />
        {/* Crown hints at the top */}
        <path
          d="M 45 15 L 50 10 L 55 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
      {/* The Ember - El punto rojo icónico */}
      <div 
        className={cn(
          'absolute rounded-full bg-mambo-ember',
          animated && 'animate-ember-glow',
          size === 'sm' && 'w-1.5 h-1.5 top-[15%] left-[54%]',
          size === 'md' && 'w-2 h-2 top-[15%] left-[54%]',
          size === 'lg' && 'w-3 h-3 top-[15%] left-[54%]',
          size === 'xl' && 'w-4 h-4 top-[14%] left-[53%]',
        )}
      />
    </div>
  )
}

// Full logo with text
export function LogoMinimalFull({ className, animated = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMinimal size="md" animated={animated} />
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg leading-tight tracking-tight">
          MAMBO KING
        </span>
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Culture Club
        </span>
      </div>
    </div>
  )
}

// Retro 90s Logo
export function LogoRetro({ className, size = 'md', animated = true }: LogoProps) {
  const { width, height } = sizeMap[size]
  const scale = width / 100
  
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Neon glow background */}
        <defs>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="retroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF00C8" />
            <stop offset="50%" stopColor="#00C4FF" />
            <stop offset="100%" stopColor="#8FFF00" />
          </linearGradient>
        </defs>
        
        {/* Crown shape with retro style */}
        <path
          d="M 15 70 
             L 15 40 
             L 30 55 
             L 50 25 
             L 70 55 
             L 85 40 
             L 85 70
             Z"
          fill="url(#retroGradient)"
          filter="url(#neonGlow)"
          className={animated ? 'animate-pulse' : ''}
        />
        
        {/* Crown points */}
        <circle cx="15" cy="40" r="4" fill="#FF00C8" />
        <circle cx="50" cy="25" r="5" fill="#00C4FF" />
        <circle cx="85" cy="40" r="4" fill="#8FFF00" />
        
        {/* M letter overlay */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fill="#000"
          fontFamily="sans-serif"
          fontWeight="900"
          fontSize="28"
        >
          M
        </text>
      </svg>
    </div>
  )
}

// Retro Full Logo with wild text
export function LogoRetroFull({ className, animated = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoRetro size="lg" animated={animated} />
      <div className="flex flex-col">
        <span 
          className={cn(
            'font-retro text-sm leading-tight bg-gradient-to-r from-retro-magenta via-retro-cyan to-retro-lime bg-clip-text text-transparent',
            animated && 'animate-neon-flicker'
          )}
        >
          MAMBO KING
        </span>
        <span className="font-retro text-[8px] text-retro-lime tracking-wider">
          CULTURE CLUB
        </span>
      </div>
    </div>
  )
}

// Ember dot standalone component
export function EmberDot({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div 
      className={cn(
        'w-2 h-2 rounded-full bg-mambo-ember',
        animated && 'animate-ember-glow',
        className
      )}
    />
  )
}

// Crown icon
export function CrownIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
    >
      <path
        d="M3 18h18v2H3v-2zm0-2l3-9 6 4.5L18 7l3 9H3z"
        fill="currentColor"
      />
    </svg>
  )
}
