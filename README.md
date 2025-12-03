# Mambo King Culture Club 👑🔥

El refugio donde el humo, el pixel y el groove se encuentran. Una comunidad cultural para mentes creativas que celebran lo retro, lo alternativo y lo auténticamente chill.

![Mambo King Culture Club](public/og-image.png)

## 🎯 Características

- **Feed Social** - Comparte contenido con la comunidad
- **Eventos** - Listening parties, torneos retro, sesiones creativas
- **Theming Dual** - Modo Minimal elegante + Modo Retro 90s
- **Sistema de Invitaciones** - Acceso exclusivo por invitación
- **Badges y Rangos** - Gamificación para miembros activos

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS + CSS Variables
- **State**: Zustand + React Context
- **Deployment**: Vercel

## 🚀 Quick Start

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/mambo-king-culture-club.git
cd mambo-king-culture-club
```

### 2. Instala dependencias

```bash
npm install
# o
pnpm install
# o
yarn install
```

### 3. Configura las variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

### 4. Configura Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta las migraciones:

```bash
# Opción 1: Desde Supabase Dashboard > SQL Editor
# Ejecuta los archivos en orden:
# - supabase/migrations/001_initial_schema.sql
# - supabase/migrations/002_rls_policies.sql
# - supabase/migrations/003_storage_buckets.sql

# Opción 2: Con Supabase CLI
supabase db push
```

### 5. Inicia el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Estructura del Proyecto

```
/app                    # Next.js App Router
  /(public)            # Rutas públicas (landing)
  /auth                # Autenticación
  /club                # Área privada del club
    /feed              # Feed principal
    /events            # Eventos
    /profile           # Perfiles
/components
  /ui                  # Componentes UI reutilizables
  /feed                # Componentes del feed
  /layout              # Header, Sidebar, etc.
  /brand               # Logos y elementos de marca
  /providers           # Context providers
/lib
  /supabase            # Cliente y tipos de Supabase
  utils.ts             # Utilidades
/supabase
  /migrations          # SQL migrations
/public
  /assets              # Imágenes, logos
```

## 🎨 Sistema de Theming

El proyecto soporta dos modos visuales:

### Modo Minimal (Default)
- Paleta oscura elegante
- Acento rojo "brasa" (#FF1A1A)
- Tipografía limpia (Inter + Poppins)
- Animaciones sutiles

### Modo Retro 90s
- Colores neón (Magenta, Cyan, Lime)
- Estética MTV/Nickelodeon
- Efectos VHS y glitch
- Tipografía pixel (Press Start 2P)

Cambiar entre modos con el toggle en el header.

## 📊 Base de Datos

### Tablas Principales

- `users` - Perfiles de miembros
- `posts` - Publicaciones del feed
- `comments` - Comentarios
- `likes` - Likes en posts
- `events` - Eventos del club
- `rsvps` - Confirmaciones de asistencia
- `invites` - Códigos de invitación

### Row Level Security

Todas las tablas tienen políticas RLS configuradas:
- Los usuarios solo pueden editar su propio contenido
- Moderadores y admins tienen permisos extendidos
- Los posts `club-only` requieren autenticación

## 🔐 Autenticación

Usando Supabase Auth con:
- Email + Password
- Confirmación por email
- Recuperación de contraseña
- Sistema de invitaciones

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Iniciar producción
npm run lint         # Linting
npm run db:generate-types  # Generar tipos de Supabase
```

## 🚢 Deployment

### Vercel (Recomendado)

1. Conecta tu repo a [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Deploy automático en cada push a `main`

### Variables de Entorno en Producción

```env
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-produccion
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key-de-produccion
SUPABASE_SERVICE_ROLE_KEY=tu-service-key
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

## 🎯 Roadmap

- [x] Scaffold inicial
- [x] Sistema de autenticación
- [x] Feed básico
- [x] Theming dual
- [ ] Sistema de eventos con RSVP
- [ ] Perfiles de usuario completos
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Tienda de merch
- [ ] App móvil (React Native)

## 🤝 Contribuir

1. Fork el repo
2. Crea una rama (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'Add nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT © Mambo King Culture Club

---

<p align="center">
  <strong>🔥 El humo, el pixel y el groove se encuentran aquí 🔥</strong>
</p>
