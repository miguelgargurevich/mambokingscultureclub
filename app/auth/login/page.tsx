'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoMinimalFull, EmberDot } from '@/components/brand'
import { useAuth } from '@/components/providers/auth-provider'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message || 'Error al iniciar sesión')
      setLoading(false)
      return
    }

    router.push('/club/feed')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block mb-6">
          <LogoMinimalFull />
        </Link>
        <h1 className="text-2xl font-display font-bold">Bienvenido de vuelta</h1>
        <p className="text-muted-foreground mt-2">
          El ritual continúa donde lo dejaste
        </p>
      </div>

      <Card variant="minimal">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <EmberDot className="w-2 h-2" />
              Iniciar Sesión
            </CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al club
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="text-right">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              variant="ember" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar al Club'}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              ¿No tienes cuenta?{' '}
              <Link 
                href="/auth/signup" 
                className="text-mambo-ember hover:underline font-medium"
              >
                Solicita una invitación
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
