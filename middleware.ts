import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request)

    // Get the current session
    const session = await supabase.auth.getSession()

    // If a session exists and the user is trying to access the login page, redirect them to the home page
    if (session.data.session && request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return response
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}