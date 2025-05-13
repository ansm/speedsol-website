import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata, Viewport } from "next"
import { WalletContextProvider } from "@/components/wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SpeedSOL - The Fastest Meme Token on Solana",
  description:
    "SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, meme contests, NFT rewards, and future ecosystem expansion.",
  keywords: ["SpeedSOL", "SPD", "Solana", "meme token", "cryptocurrency", "fast transactions", "NFT", "crypto"],
  authors: [{ name: "SpeedSOL Team" }],
  creator: "SpeedSOL Team",
  publisher: "SpeedSOL",
  metadataBase: new URL("https://speedsol.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://speedsol.vercel.app",
    title: "SpeedSOL - The Fastest Meme Token on Solana",
    description:
      "SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, and NFT rewards.",
    siteName: "SpeedSOL",
    images: [
      {
        url: "/images/speedsol-og.png",
        width: 1200,
        height: 630,
        alt: "SpeedSOL - The Fastest Meme Token on Solana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeedSOL - The Fastest Meme Token on Solana",
    description:
      "SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, and NFT rewards.",
    creator: "@_Speed_SOL",
    images: ["/images/logo.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.png",
        color: "#3b82f6",
      },
    ],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  )
}
