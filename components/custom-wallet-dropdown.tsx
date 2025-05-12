"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CustomWalletDropdown() {
  const { publicKey, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!publicKey) return null

  return (
    <div className="p-3 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg">
      <div className="mb-3 p-2 bg-gray-800/50 rounded-lg flex items-center justify-between">
        <span className="text-sm text-gray-300 font-mono overflow-hidden text-ellipsis">{publicKey.toString()}</span>
        <button
          onClick={copyAddress}
          className="ml-2 p-1 hover:bg-gray-700 rounded-md transition-colors"
          aria-label="Copy address"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
      </div>
      <button
        onClick={() => disconnect()}
        className="w-full p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors text-sm"
      >
        Disconnect
      </button>
    </div>
  )
}
