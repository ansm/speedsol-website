import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { WalletContextProvider } from "@/components/wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SpeedSOL ($SPD) - The Fastest Meme Token on Solana",
  description:
    "SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, meme contests, NFT rewards, and future ecosystem expansion.",
    generator: 'v0.dev'
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
