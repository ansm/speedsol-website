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
  // You could fetch the logo from your domain after deployment
  const logoUrl = "https://speedsoltoken.com/images/logo.png"

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
      {/* Twitter-specific design with more emphasis on the logo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, rgba(29,161,242,0.15), transparent 70%)",
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
        {/* Logo - larger for Twitter */}
        <img
          src={logoUrl || "images/logo.png"}
          alt="SpeedSOL Logo"
          width={240}
          height={240}
          style={{ marginBottom: 30 }}
        />

        {/* Title - Twitter style */}
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            background: "linear-gradient(to right, #1DA1F2, #38bdf8, #818cf8)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          SpeedSOL
        </div>

        {/* Subtitle with Twitter mention */}
        <div
          style={{
            fontSize: 32,
            color: "white",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
        Built for ultra-fast microtransactions & community rewards
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
