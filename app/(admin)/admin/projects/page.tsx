export default function ProjectsAdminPage() {
  return (
    <main className="min-h-dvh bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-3 text-sm text-neutral-400">Projects admin paused</p>
        <h1 className="mb-4 text-3xl font-bold">Edit projects locally for now</h1>
        <p className="text-neutral-300">
          Project content was migrated from Supabase into <code>lib/projects.ts</code>. The previous CMS code can be
          rebuilt later if you decide you still want browser-based editing.
        </p>
      </div>
    </main>
  )
}
