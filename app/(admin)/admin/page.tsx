export default function AdminPage() {
  return (
    <main className="min-h-dvh bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-3 text-sm text-neutral-400">Admin paused</p>
        <h1 className="mb-4 text-3xl font-bold">Supabase CMS is currently disabled</h1>
        <p className="text-neutral-300">
          The public portfolio now reads projects from local files. Use <code>lib/projects.ts</code> to edit project
          content until a new CMS is intentionally rebuilt.
        </p>
      </div>
    </main>
  )
}
