import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ClubHeader } from '@/components/layout/club-header'
import { ClubSidebar } from '@/components/layout/club-sidebar'

export default async function ClubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <ClubHeader />
      <div className="flex">
        <ClubSidebar />
        <main className="flex-1 pt-16 pl-0 md:pl-64">
          <div className="container mx-auto p-4 max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
