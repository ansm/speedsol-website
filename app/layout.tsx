import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata, Viewport } from "next"
import { WalletContextProvider } from "@/components/wallet-provider"
import Script from "next/script"  // Added this import
import { FloatingCoins } from "@/components/floating-coins"

const inter = Inter({ subsets: ["latin"] })

// Define the base URL for absolute URLs
const baseUrl = "https://speedsoltoken.com"

export const metadata: Metadata = {
  title: "SpeedSOL - The Fastest Meme Token on Solana",
  description:
    "SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, and NFT rewards.",
  keywords: ["SpeedSOL", "Solana", "meme token", "cryptocurrency", "fast transactions", "NFT", "crypto"],
  authors: [{ name: "SpeedSOL Team" }],
  creator: "SpeedSOL Team",
  publisher: "SpeedSOL",
  metadataBase: new URL(baseUrl),
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
    url: baseUrl,
    title: "SpeedSOL - The Fastest Meme Token on Solana",
    description:
      "SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, and NFT rewards.",
    siteName: "SpeedSOL",
    images: [
      {
        url: `${baseUrl}/social-share.png`, // Using absolute URL
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
    site: "@_Speed_SOL", // Added site parameter
    images: [
      {
        url: `${baseUrl}/social-share.png`, // Using absolute URL
        width: 1200,
        height: 630,
        alt: "SpeedSOL - The Fastest Meme Token on Solana",
      },
    ],
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
      <head>
       {/* Google Analytics Tag */}
       <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-HQBSQQLJ5D" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HQBSQQLJ5D');
            `,
          }}
        />

        {/* Additional Twitter card meta tags for better compatibility */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_Speed_SOL" />
        <meta name="twitter:creator" content="@_Speed_SOL" />
        <meta name="twitter:title" content="SpeedSOL - The Fastest Meme Token on Solana" />
        <meta
          name="twitter:description"
          content="SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, and NFT rewards."
        />
        <meta name="twitter:image" content={`${baseUrl}/social-share.png`} />
        <meta name="twitter:image:alt" content="SpeedSOL - The Fastest Meme Token on Solana" />
      </head>
      <body className={inter.className}>
        <FloatingCoins />
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  )
}
