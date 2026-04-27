import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Franco Zeta Portfolio",
    short_name: "Franco Zeta",
    description: "Portfolio of Franco Zeta, a web developer building Kocteau and product-shaped interfaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/images/fz-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
