'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoMinimalFull, EmberDot } from '@/components/brand'
import { useAuth } from '@/components/providers/auth-provider'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password)

    if (error) {
      setError(error.message || 'Error al crear la cuenta')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <Link href="/" className="inline-block mb-6">
          <LogoMinimalFull />
        </Link>
        
        <Card variant="minimal">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-mambo-ember/20 flex items-center justify-center">
                <span className="text-3xl">✉️</span>
              </div>
            </div>
            <CardTitle>Revisa tu email</CardTitle>
            <CardDescription>
              Te hemos enviado un enlace de confirmación a <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Haz clic en el enlace del email para activar tu cuenta y acceder al club.
              El enlace expira en 24 horas.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/auth/login">
              <Button variant="ghost">
                Volver al inicio de sesión
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-block mb-6">
          <LogoMinimalFull />
        </Link>
        <h1 className="text-2xl font-display font-bold">Únete al ritual</h1>
        <p className="text-muted-foreground mt-2">
          El acceso es por invitación. ¿Tienes un código?
        </p>
      </div>

      <Card variant="minimal">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <EmberDot className="w-2 h-2" />
              Crear Cuenta
            </CardTitle>
            <CardDescription>
              Completa el formulario para solicitar acceso
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="invite" className="text-sm font-medium">
                Código de invitación <span className="text-muted-foreground">(opcional)</span>
              </label>
              <Input
                id="invite"
                type="text"
                placeholder="XXXX-XXXX"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                disabled={loading}
                className="font-mono tracking-wider"
              />
              <p className="text-xs text-muted-foreground">
                Si no tienes código, tu solicitud entrará en lista de espera
              </p>
            </div>
            
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
              <p className="text-xs text-muted-foreground">
                Mínimo 8 caracteres
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar contraseña
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              variant="ember" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Solicitar Acceso'}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              ¿Ya tienes cuenta?{' '}
              <Link 
                href="/auth/login" 
                className="text-mambo-ember hover:underline font-medium"
              >
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      <p className="text-xs text-muted-foreground text-center px-4">
        Al crear una cuenta, aceptas los{' '}
        <Link href="/terms" className="underline hover:text-foreground">
          Términos de Servicio
        </Link>{' '}
        y la{' '}
        <Link href="/privacy" className="underline hover:text-foreground">
          Política de Privacidad
        </Link>
      </p>
    </div>
  )
}
