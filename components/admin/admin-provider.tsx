"use client"

import type React from "react"
import { VantaBackground } from "@/components/ui/vanta-background"
import { DashboardNav } from "@/components/admin/dashboard-nav"
import { useAuth } from "@/components/auth/auth-provider"
import { LoginForm } from "@/components/auth/login-form"
import { Skeleton } from "@/components/ui/skeleton"

interface AdminProviderProps {
  children: React.ReactNode
}

function AdminLoadingSkeleton() {
  return (
    <>
      <VantaBackground />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar skeleton */}
        <div className="w-full md:w-64 bg-neutral-900/70 border-r border-neutral-800 backdrop-blur-md md:h-screen p-4">
          {/* Header skeleton */}
          <div className="border-b border-neutral-800 pb-4 mb-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          
          {/* Navigation skeleton */}
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
          
          {/* Footer skeleton */}
          <div className="mt-auto pt-4 border-t border-neutral-800">
            <Skeleton className="h-3 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 p-4 md:p-8">
          <Skeleton className="h-8 w-48 mb-6" />
          
          {/* Stats grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6">
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
          
          {/* Content skeleton */}
          <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 pb-4">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function AdminProvider({ children }: AdminProviderProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return <AdminLoadingSkeleton />
  }

  if (!user) {
    return (
      <>
        <VantaBackground />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <VantaBackground />
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-neutral-900/70 border-r border-neutral-800 backdrop-blur-md md:h-screen">
          <DashboardNav />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-4 md:p-8 overflow-auto">{children}</div>
      </div>
    </>
  )
}
