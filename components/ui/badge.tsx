import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow',
        outline: 'text-foreground',
        ember:
          'border-mambo-ember/50 bg-mambo-ember/10 text-mambo-ember',
        gaming:
          'border-retro-lime/50 bg-retro-lime/10 text-retro-lime',
        smoke:
          'border-mambo-neutral-500/50 bg-mambo-neutral-700/10 text-mambo-neutral-300',
        retro:
          'border-retro-magenta bg-retro-magenta/20 text-retro-magenta rounded-none',
        music:
          'border-retro-cyan/50 bg-retro-cyan/10 text-retro-cyan',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
