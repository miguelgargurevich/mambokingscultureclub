'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
}

interface ToastContextType {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

function Toast({ id, title, description, variant = 'default' }: ToastProps) {
  const { removeToast } = useToast()

  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-green-900/20 border-green-500',
    error: 'bg-red-900/20 border-mambo-ember',
    warning: 'bg-yellow-900/20 border-yellow-500',
  }

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-lg border p-4 shadow-lg animate-slide-up',
        variantStyles[variant]
      )}
    >
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(id)}
        className="text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const duration = toast.duration || 5000

    setToasts((prev) => [...prev, { ...toast, id }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

// Re-export for convenience
export { Toast }
