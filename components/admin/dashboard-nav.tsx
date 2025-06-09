"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { LogOut, FileText, ImageIcon, Settings, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const isActive = (path: string) => pathname === path

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      name: "Proyectos",
      href: "/admin/projects",
      icon: FileText,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: ImageIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      name: "Configuración",
      href: "/admin/settings",
      icon: Settings,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header con info del usuario */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
            <p className="text-sm text-neutral-400">{user.email}</p>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            size="sm"
            className="bg-neutral-900/50 border-neutral-700 text-white hover:bg-neutral-800/70 rounded-full"
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Salir</span>
          </Button>
        </div>
      </div>

      {/* Navegación */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              isActive(item.href)
                ? "bg-neutral-800/70 text-white"
                : "text-neutral-400 hover:bg-neutral-800/50 hover:text-white",
            )}
          >
            <div className={cn("p-1.5 rounded-md", item.bgColor)}>
              <item.icon className={cn("h-4 w-4", item.color)} />
            </div>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-neutral-800">
        <div className="text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Franco Zeta</p>
          <p>Admin Dashboard v1.0</p>
        </div>
      </div>
    </div>
  )
}
