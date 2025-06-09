/*
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Solo aplicar a rutas admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const res = NextResponse.next()
    
    try {
      const supabase = createMiddlewareClient({ req, res })
      const { data: { session } } = await supabase.auth.getSession()
      
      // Si no hay sesión, redirigir al login
      if (!session) {
        const redirectUrl = new URL('/admin', req.url)
        return NextResponse.redirect(redirectUrl)
      }
      
      return res
    } catch (error) {
      // En caso de error, permitir que el provider maneje la autenticación
      console.warn('Middleware auth error:', error)
      return NextResponse.next()
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Excluir archivos estáticos
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}
*/

// Must be edited
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  return NextResponse.next()
}
