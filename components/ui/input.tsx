import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'minimal' | 'retro'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'minimal', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          variant === 'minimal' && 'border-input',
          variant === 'retro' && 'border-retro-magenta rounded-none focus-visible:ring-retro-cyan',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
