"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

export function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    if (!scriptsLoaded || !vantaRef.current) return

    if (!vantaEffect) {
      // @ts-ignore - Vanta se carga globalmente mediante los scripts
      const effect = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x050505,
        shininess: 30.0,
        waveHeight: 15.0,
        waveSpeed: 0.75,
        zoom: 0.65,
      })

      setVantaEffect(effect)
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect, scriptsLoaded])

  const handleScriptsLoad = () => {
    setScriptsLoaded(true)
  }

  return (
    <>
      {/* Cargar scripts necesarios */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" onLoad={handleScriptsLoad} />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js" />

      {/* Contenedor para el efecto Vanta */}
      <div ref={vantaRef} className="fixed inset-0 -z-10 bg-neutral-950" aria-hidden="true" />
    </>
  )
}
