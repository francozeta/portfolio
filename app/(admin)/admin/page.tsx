import type React from "react"
export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Dashboard</h1>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-blue-400">5</div>
          <div className="text-sm text-neutral-400">Proyectos</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-400">12</div>
          <div className="text-sm text-neutral-400">Imágenes</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-purple-400">3</div>
          <div className="text-sm text-neutral-400">Tecnologías</div>
        </div>
        <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 backdrop-blur-sm">
          <div className="text-3xl font-bold text-orange-400">1</div>
          <div className="text-sm text-neutral-400">Admin</div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-neutral-900/50 border border-neutral-700 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-neutral-800">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileIcon className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-white">
                Proyecto actualizado: <span className="font-medium">E-commerce Dashboard</span>
              </p>
              <p className="text-xs text-neutral-400">Hace 2 horas</p>
            </div>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-neutral-800">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <ImageIcon className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-white">
                Nueva imagen subida: <span className="font-medium">hero-background.jpg</span>
              </p>
              <p className="text-xs text-neutral-400">Hace 1 día</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <SettingsIcon className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-white">
                Configuración actualizada: <span className="font-medium">Información de contacto</span>
              </p>
              <p className="text-xs text-neutral-400">Hace 3 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Iconos para la página
function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
