import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogoMinimalFull, LogoRetroFull, EmberDot } from '@/components/brand'
import { ThemeToggle } from '@/components/layout/theme-toggle'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <LogoMinimalFull />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="ember" size="sm">
                Unirse al Club
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-mambo-ember/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mambo-ember/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-mambo-ember/5 rounded-full blur-2xl" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="flex justify-center mb-8">
            <EmberDot className="w-4 h-4" />
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="gradient-text-minimal">Mambo King</span>
            <br />
            <span className="text-mambo-ember">Culture Club</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            El refugio donde el <span className="text-foreground font-medium">humo</span>, 
            el <span className="text-foreground font-medium">pixel</span> y 
            el <span className="text-foreground font-medium">groove</span> se encuentran.
            Un espacio para mentes creativas que celebran lo retro, lo alternativo y lo auténticamente chill.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/auth/signup">
              <Button variant="ember" size="xl" className="w-full sm:w-auto">
                Solicitar Invitación
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Conocer el Manifiesto
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-mambo-ember">420+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Miembros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mambo-ember">∞</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Vibes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-mambo-ember">90s</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Energía</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
            Los Tres Pilares
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Smoke Pillar */}
            <div className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:border-mambo-ember/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-mambo-neutral-700/50 flex items-center justify-center mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Humo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La ritualidad del encendido. El momento de pausa sagrada. 
                La contemplación que viene con cada inhalación de creatividad.
              </p>
            </div>

            {/* Pixel Pillar */}
            <div className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:border-mambo-ember/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-mambo-neutral-700/50 flex items-center justify-center mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Pixel</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                La nostalgia del gaming clásico. Los 16 bits que formaron nuestra estética.
                La cultura gamer como lenguaje universal.
              </p>
            </div>

            {/* Groove Pillar */}
            <div className="group p-6 rounded-lg border border-border/50 bg-card/50 hover:border-mambo-ember/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-mambo-neutral-700/50 flex items-center justify-center mb-4">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Groove</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                El soundtrack de nuestras sesiones. Desde el lo-fi hasta el funk.
                El ritmo que conecta toda experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-mambo-ember/5 to-transparent">
        <div className="container mx-auto max-w-3xl text-center">
          <EmberDot className="w-3 h-3 mx-auto mb-6" />
          <blockquote className="font-display text-xl md:text-2xl italic text-muted-foreground leading-relaxed mb-6">
            "No somos una comunidad. Somos un estado de ánimo. 
            Un lugar donde el tiempo se estira como el humo 
            y las partidas nunca terminan realmente."
          </blockquote>
          <p className="text-sm text-mambo-ember font-medium">— El Manifiesto del Mambo King</p>
        </div>
      </section>

      {/* What You'll Find */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-4">
            Lo que encontrarás dentro
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Un espacio diseñado para quienes entienden que la cultura es más que contenido
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '📡', title: 'El Feed', description: 'Donde compartimos lo que nos inspira, sin algoritmos, sin ruido.' },
              { icon: '🎪', title: 'Eventos', description: 'Listening parties, torneos retro, sesiones creativas y más.' },
              { icon: '🛒', title: 'La Tienda', description: 'Merch exclusivo. Minimal para el día. Retro para la noche.' },
              { icon: '🏆', title: 'Rangos & Badges', description: 'Reconocimiento para los verdaderos devotos de la cultura.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para el ritual?
          </h2>
          <p className="text-muted-foreground mb-8">
            El acceso es por invitación. Solicita la tuya y espera el llamado.
          </p>
          <Link href="/auth/signup">
            <Button variant="ember" size="xl">
              Solicitar Invitación
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <EmberDot className="w-2 h-2" animated={false} />
              <span className="text-sm text-muted-foreground">
                Mambo King Culture Club © 2024
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">
                Manifiesto
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Términos
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
