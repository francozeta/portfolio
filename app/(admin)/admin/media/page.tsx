export default function MediaPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8">
        <p className="mb-3 text-sm text-neutral-400">Media admin paused</p>
        <h1 className="mb-4 text-3xl font-bold">Assets now live in public folders</h1>
        <p className="text-neutral-300">
          Supabase images were copied into <code>public/images</code>, <code>public/music</code>, and{" "}
          <code>public/projects</code>.
        </p>
      </div>
    </main>
  )
}
