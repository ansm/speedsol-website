import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Add this line for static export
export const dynamic = "force-static"

// Image metadata
export const alt = "SpeedSOL - The Fastest Meme Token on Solana"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #000000, #0a0a12)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        position: "relative",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, rgba(6,182,212,0.15), transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Logo and title container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-K7LkoCAqqbvhrw5WRPhqhexeKwje3s.png"
          alt="SpeedSOL Logo"
          width={200}
          height={200}
          style={{ marginBottom: 40 }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            background: "linear-gradient(to right, #38bdf8, #818cf8, #c084fc)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          SpeedSOL
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: "white",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          The Fastest Meme Token on Solana
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#9ca3af",
          }}
        >
          speedsoltoken.com
        </div>
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
