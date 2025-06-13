"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from "lucide-react"
import { useAuth } from "./auth-provider"
import type { SupabaseClient } from "@supabase/supabase-js"

// Importación condicional
let supabase: SupabaseClient | null = null
try {
  const { supabase: supabaseClient } = require("@/lib/supabase")
  supabase = supabaseClient
} catch (error) {
  console.warn("Supabase not configured")
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { error: authError } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabase) {
      setError("Supabase not configured. Please check your environment variables.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes("credentials")) {
          setError("Invalid email or password. Please try again.")
        } else if (error.message.includes("rate")) {
          setError("Too many login attempts. Please try again later.")
        } else {
          setError(error.message)
        }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Mostrar error de configuración si existe
  if (authError || !supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertCircle size={20} />
              <h3 className="font-semibold">Error de Configuración</h3>
            </div>
            <p className="text-neutral-300 text-sm mb-4">{authError || "Supabase no está configurado correctamente"}</p>
            <div className="bg-neutral-800/50 p-4 rounded-lg">
              <p className="text-xs text-neutral-400">Para configurar Supabase:</p>
              <ol className="text-xs text-neutral-400 mt-2 space-y-1 list-decimal list-inside">
                <li>
                  Crea un proyecto en{" "}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    supabase.com
                  </a>
                </li>
                <li>Ve a Settings → API</li>
                <li>Copia la URL y la clave anónima</li>
                <li>Crea un archivo .env.local con:</li>
              </ol>
              <div className="bg-neutral-900/50 p-2 rounded mt-2 text-xs font-mono">
                <div>NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui</div>
                <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_aqui</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-neutral-900/50 border-neutral-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <p className="text-sm text-neutral-400">Accede al panel de administración</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="bg-neutral-800/50 border-neutral-600 text-white placeholder:text-neutral-400"
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="bg-neutral-800/50 border-neutral-600 text-white placeholder:text-neutral-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-neutral-200 rounded-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
