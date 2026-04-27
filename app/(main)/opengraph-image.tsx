import { ImageResponse } from "next/og"

export const alt = "Franco Zeta Portfolio"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: 64,
          fontFamily: "Geist, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            color: "#a3a3a3",
            fontSize: 28,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#d4d4d4",
            }}
          />
          Design Engineer at Kocteau
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 78, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Franco Zeta
          </div>
          <div style={{ maxWidth: 760, color: "#a3a3a3", fontSize: 34, lineHeight: 1.28 }}>
            Product-shaped web interfaces, full-stack flows, and quiet details.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
