import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'minimal' | 'retro'
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'minimal', ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea'

export { Textarea }
