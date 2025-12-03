import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogoMinimalFull, EmberDot } from '@/components/brand'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <LogoMinimalFull />
          </Link>
          <Link href="/auth/signup">
            <Button variant="ember" size="sm">
              Unirse al Club
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-center mb-8">
            <EmberDot className="w-4 h-4" />
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-8">
            El Manifiesto
          </h1>
          
          <div className="prose prose-invert prose-lg mx-auto">
            <blockquote className="text-xl italic border-l-4 border-mambo-ember pl-6 my-8">
              "No somos una comunidad. Somos un estado de ánimo."
            </blockquote>
            
            <h2 className="font-display">Lo que somos</h2>
            <p>
              El Mambo King Culture Club nació de una premisa simple: crear un espacio donde 
              el tiempo se estire como el humo y las partidas nunca terminen realmente.
            </p>
            <p>
              Somos el refugio de quienes crecieron con un control en la mano, 
              un casete en el bolsillo y una curiosidad infinita por lo que está 
              más allá de lo establecido.
            </p>

            <h2 className="font-display">Los Tres Pilares</h2>
            
            <h3 className="text-mambo-ember">🌿 Humo</h3>
            <p>
              El primer pilar es el ritual. La pausa sagrada. Ese momento donde 
              el mundo exterior deja de existir y solo queda el presente. 
              No glorificamos sustancias; celebramos la contemplación, 
              el desacelerar, el estar presente.
            </p>

            <h3 className="text-retro-lime">🎮 Pixel</h3>
            <p>
              El segundo pilar es la nostalgia activa. Los 16 bits que formaron 
              nuestra estética, los cartuchos que soplamos con fe, las tardes 
              interminables descubriendo mundos digitales. El gaming no como 
              escape, sino como lenguaje universal.
            </p>

            <h3 className="text-retro-cyan">🎵 Groove</h3>
            <p>
              El tercer pilar es el soundtrack de nuestras vidas. Desde el lo-fi 
              que acompaña nuestras sesiones nocturnas hasta el funk que nos hace 
              mover. La música como hilo conductor de toda experiencia.
            </p>

            <h2 className="font-display">Nuestra Estética</h2>
            <p>
              Vivimos en la dualidad. Por un lado, el minimalismo elegante: 
              líneas puras, negro profundo, un punto rojo que arde como brasa. 
              Por otro, la explosión noventera: neones, slime, VHS, Memphis, 
              todo el caos visual que nos formó.
            </p>
            <p>
              Ambas estéticas conviven en nosotros. Somos el traje negro con 
              calcetines de colores. La playlist de jazz seguida de Nintendo 64.
            </p>

            <h2 className="font-display">Quién pertenece aquí</h2>
            <p>
              Este club es para los que entienden que la cultura es más que 
              contenido para consumir. Para los que prefieren una buena 
              conversación que un scroll infinito. Para los que valoran 
              la calidad sobre la cantidad.
            </p>
            <p>
              No importa tu edad, tu ubicación o tu background. Si resuenas 
              con esta frecuencia, ya eres parte del club.
            </p>

            <h2 className="font-display">El Acceso</h2>
            <p>
              El acceso es por invitación. No por elitismo, sino por cuidado. 
              Queremos que cada nuevo miembro sea presentado por alguien que 
              ya entiende el vibe. Así mantenemos la esencia.
            </p>

            <div className="text-center my-12">
              <EmberDot className="w-3 h-3 mx-auto mb-6" />
              <p className="text-xl font-display italic text-muted-foreground">
                "El humo, el pixel y el groove se encuentran aquí."
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/auth/signup">
              <Button variant="ember" size="xl">
                Solicitar Invitación
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <EmberDot className="w-2 h-2" animated={false} />
              <span className="text-sm text-muted-foreground">
                Mambo King Culture Club © 2024
              </span>
            </div>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Volver al inicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
