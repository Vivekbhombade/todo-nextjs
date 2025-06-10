import { redirect } from 'next/navigation'
import { createClient } from 'utils/supabase/server'

export default async function Logout() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  async function handleLogout() {
    'use server' // important for server actions!
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/') // after logout, send user back to homepage
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <p className="text-3xl mb-6">Hello {data.user.email}</p>

      <form action={handleLogout}>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </form>
    </div>
  )
}

