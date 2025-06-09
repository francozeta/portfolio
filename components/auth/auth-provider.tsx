"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"

// Importación condicional para evitar errores en build
let supabase: any = null

try {
  const { supabase: supabaseClient } = require("@/lib/supabase")
  supabase = supabaseClient
} catch (error) {
  console.warn("Supabase not configured properly:", error)
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setError("Supabase no está configurado correctamente. Verifica las variables de entorno.")
      setLoading(false)
      return
    }

    // Obtener sesión inicial
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }: any) => {
        if (error) {
          console.error("Auth error:", error)
          setError(error.message)
        } else {
          setUser(session?.user ?? null)
        }
        setLoading(false)
      })
      .catch((err: any) => {
        console.error("Session error:", err)
        setError("Error al obtener la sesión")
        setLoading(false)
      })

    // Escuchar cambios de autenticación solo si supabase está configurado
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } catch (err) {
      console.error("Auth state change error:", err)
      setError("Error en la configuración de autenticación")
      setLoading(false)
    }
  }, [])

  const signOut = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch (err) {
        console.error("Sign out error:", err)
      }
    }
  }

  return <AuthContext.Provider value={{ user, loading, signOut, error }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
