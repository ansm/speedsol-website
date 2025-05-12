"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState, useRef } from "react"
import { Copy, Check, Loader2, Wallet } from "lucide-react"
import { Connection, LAMPORTS_PER_SOL, type PublicKey } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

interface TokenBalance {
  mint: string
  symbol: string | null
  balance: number
  decimals: number
}

export const CustomWalletButton = () => {
  const { connected, publicKey, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Update the getConnection function to use multiple fallback endpoints
  const getConnection = async () => {
    // Use browser-friendly endpoints that support CORS
    const endpoints = [
      "https://solana-mainnet.rpc.extrnode.com/55889ce5-fd56-4b29-ae54-449e5372f78e", // Try extrnode first
      "https://api.mainnet-beta.solana.com", // Solana's public RPC
      "https://rpc.ankr.com/solana", // Ankr's public RPC
      "https://solana.public-rpc.com", // Another public RPC
    ]

    // Try each endpoint until one works
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying to connect to Solana via ${endpoint}...`)
        const connection = new Connection(endpoint, {
          commitment: "confirmed",
          confirmTransactionInitialTimeout: 10000,
        })

        // Test the connection with a simple request
        await connection.getRecentBlockhash()
        console.log(`Successfully connected to ${endpoint}`)
        return connection
      } catch (error) {
        console.error(`Failed to connect to ${endpoint}:`, error)
        // Continue to the next endpoint
      }
    }

    // If all endpoints fail, return a connection to the default endpoint
    // but the caller should handle potential failures
    console.warn("All RPC endpoints failed, using default as last resort")
    return new Connection("https://api.mainnet-beta.solana.com", {
      commitment: "confirmed",
    })
  }

  useEffect(() => {
    setMounted(true)

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (connected && publicKey && showDropdown) {
      fetchBalances(publicKey)
    }
  }, [connected, publicKey, showDropdown])

  // Improved fetchBalances function with better error handling
  const fetchBalances = async (publicKey: PublicKey) => {
    setIsLoadingBalance(true)
    setErrorMessage(null)

    try {
    //   // For preview/development environments, use mock data instead of real RPC calls
    //   if (
    //     window.location.hostname === "localhost" ||
    //     window.location.hostname.includes("vercel.app") ||
    //     window.location.hostname.includes("preview")
    //   ) {
    //     // Mock data for development/preview
    //     console.log("Using mock data for development/preview environment")
    //     setTimeout(() => {
    //       setSolBalance(2.5) // Mock SOL balance
    //       setTokenBalances([
    //         {
    //           mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    //           symbol: "USDC",
    //           balance: 1250.75,
    //           decimals: 6,
    //         },
    //         {
    //           mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    //           symbol: "BONK",
    //           balance: 1500000,
    //           decimals: 5,
    //         },
    //         {
    //           mint: "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx",
    //           symbol: "GMT",
    //           balance: 42500,
    //           decimals: 6,
    //         },
    //       ])
    //       setIsLoadingBalance(false)
    //     }, 1000)
    //     return
    //   }

      // For production, try to get real data
      let connection
      try {
        connection = await getConnection()
      } catch (error) {
        console.error("Failed to connect to any Solana RPC endpoint:", error)
        setErrorMessage("Failed to connect to any Solana RPC endpoint")
        setIsLoadingBalance(false)
        return
      }

      // Fetch SOL balance
      try {
        const solanaBalance = await connection.getBalance(publicKey)
        setSolBalance(solanaBalance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error("Error fetching SOL balance:", error)
        setSolBalance(0)
        setErrorMessage("Could not fetch SOL balance")
      }

      // Fetch token accounts
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        })

        console.log("Found token accounts:", tokenAccounts.value.length)

        // Process token accounts to get balances
        const balances: TokenBalance[] = tokenAccounts.value
          .map((account) => {
            try {
              const parsedInfo = account.account.data.parsed.info
              if (!parsedInfo || !parsedInfo.tokenAmount) {
                return null
              }

              const mintAddress = parsedInfo.mint
              const amount = parsedInfo.tokenAmount?.uiAmount || 0
              const decimals = parsedInfo.tokenAmount?.decimals || 0

              // Only include tokens with a balance
              if (amount <= 0) {
                return null
              }

              return {
                mint: mintAddress,
                symbol: getTokenSymbol(mintAddress),
                balance: amount,
                decimals: decimals,
              }
            } catch (err) {
              console.error("Error parsing token account:", err)
              return null
            }
          })
          .filter((item): item is TokenBalance => item !== null)

        console.log("Processed token balances:", balances)
        setTokenBalances(balances)
      } catch (error) {
        console.error("Error fetching token accounts:", error)

        // If we can't fetch token accounts, add some common tokens with zero balances
        // This ensures the UI doesn't look empty
        const fallbackTokens: TokenBalance[] = [
          {
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            symbol: "USDC",
            balance: 0,
            decimals: 6,
          },
          {
            mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
            symbol: "USDT",
            balance: 0,
            decimals: 6,
          },
        ]
        setTokenBalances(fallbackTokens)

        if (!errorMessage) {
          setErrorMessage("Could not fetch all token balances")
        }
      }

      setIsLoadingBalance(false)
    } catch (error) {
      console.error("Error with RPC connection:", error)
      setErrorMessage("Could not connect to Solana network")
      setSolBalance(null)
      setTokenBalances([])
      setIsLoadingBalance(false)
    }
  }

  // Helper function to get token symbols
  const getTokenSymbol = (mintAddress: string): string | null => {
    // This is a simplified approach - in production, use a token registry
    const knownTokens: Record<string, string> = {
      EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: "USDC",
      Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: "USDT",
      mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: "mSOL",
      "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj": "stSOL",
      So11111111111111111111111111111111111111112: "SOL",
      DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: "BONK",
      "7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx": "GMT",
      "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": "RAY",
      AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB: "GST",
    }

    return knownTokens[mintAddress] || mintAddress.slice(0, 4) + "..." + mintAddress.slice(-4)
  }

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  // Format wallet address for display in button
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  // Format balance with appropriate decimal places and suffixes (K, M, B)
  const formatBalance = (value: number | null, decimals = 4) => {
    if (value === null || isNaN(Number(value))) return "0"

    const num = Number(value)

    // Format with K, M, B suffixes
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + "B"
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + "M"
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(2) + "K"
    } else {
      return num.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals > 2 ? 2 : decimals,
      })
    }
  }

  if (!mounted) return null

  return (
    <div className="wallet-button-container relative" ref={buttonRef}>
      {!connected ? (
        <WalletMultiButton className="wallet-button" />
      ) : (
        <>
          <button
            onClick={toggleDropdown}
            className="wallet-button bg-gray-800/70 hover:bg-gradient-to-r hover:from-blue-700/50 hover:to-purple-700/50 text-white rounded-full px-4 py-2 text-sm font-medium border border-gray-700 backdrop-filter backdrop-blur-sm transition-all duration-300 h-[38px] flex items-center"
          >
            <span className="wallet-icon mr-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M16 14H16.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {publicKey && formatWalletAddress(publicKey.toString())}
          </button>

          {showDropdown && (
            <div ref={dropdownRef} className="absolute mt-2 right-0 w-96 z-50">
              <div className="p-5 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg">
                {/* Wallet Label */}
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="h-5 w-5 text-blue-400" />
                  <h3 className="text-sm font-medium text-blue-400">Wallet</h3>
                </div>

                {/* Wallet Address */}
                <div className="mb-5 p-3 bg-gray-800/50 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-gray-300 font-mono overflow-hidden text-ellipsis max-w-[calc(100%-30px)]">
                    {publicKey.toString()}
                  </span>
                  <button
                    onClick={copyAddress}
                    className="ml-2 p-1 hover:bg-gray-700 rounded-md transition-colors"
                    aria-label="Copy address"
                  >
                    {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Token Balances */}
                <div className="mb-4 p-4 bg-gray-800/50 rounded-lg max-h-80 overflow-y-auto">
                  <h3 className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Token Balances</h3>

                  {isLoadingBalance ? (
                    <div className="flex justify-center py-4">
                      <Loader2 size={24} className="animate-spin text-gray-400" />
                    </div>
                  ) : errorMessage ? (
                    <div className="text-sm text-amber-400 text-center py-2 mb-2">{errorMessage}</div>
                  ) : null}

                  {/* SOL Balance - Always show this */}
                  <div className="flex items-center justify-between mb-3 last:mb-0 p-2.5 hover:bg-gray-700/30 rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-3 flex items-center justify-center">
                        <span className="text-sm font-bold">◎</span>
                      </div>
                      <span className="text-sm">SOL</span>
                    </div>
                    <div className="text-sm font-medium">{formatBalance(solBalance)}</div>
                  </div>

                  {/* Other Token Balances */}
                  {tokenBalances.length > 0
                    ? tokenBalances.map((token) => (
                        <div
                          key={token.mint}
                          className="flex items-center justify-between mb-3 last:mb-0 p-2.5 hover:bg-gray-700/30 rounded-md"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mr-3 flex items-center justify-center overflow-hidden">
                              <span className="text-sm font-bold">{token.symbol ? token.symbol.charAt(0) : "$"}</span>
                            </div>
                            <span className="text-sm">{token.symbol}</span>
                          </div>
                          <div className="text-sm font-medium">{formatBalance(token.balance, token.decimals)}</div>
                        </div>
                      ))
                    : !isLoadingBalance && (
                        <div className="text-sm text-gray-400 text-center py-2">No other tokens found</div>
                      )}
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={() => {
                    disconnect()
                    setShowDropdown(false)
                  }}
                  className="w-full p-3.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <style jsx global>{`
        .wallet-button-container .wallet-adapter-button {
          background-color: rgba(31, 41, 55, 0.7);
          color: white;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
          border: 1px solid rgba(75, 85, 99, 0.5);
          backdrop-filter: blur(4px);
          height: 38px; /* Match the height of the Join Telegram button */
          display: flex;
          align-items: center;
        }

        .wallet-button-container .wallet-adapter-button:hover {
          background-image: linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(124, 58, 237, 0.5));
          border-color: rgba(59, 130, 246, 0.5);
        }

        .wallet-button-container .wallet-adapter-button-start-icon {
          margin-right: 0.5rem;
        }

        /* Change "Select Wallet" to "Connect Wallet" */
        .wallet-adapter-button-trigger:not(.wallet-adapter-button-end-icon-only) {
          font-size: 0;
        }
        
        .wallet-adapter-button-trigger:not(.wallet-adapter-button-end-icon-only)::after {
          content: "Connect Wallet";
          font-size: 0.875rem;
        }

        /* Hide the default dropdown */
        .wallet-adapter-dropdown-list {
          display: none !important;
        }

        /* Modal styles */
        .wallet-adapter-modal-wrapper {
          backdrop-filter: blur(10px);
          background-color: rgba(17, 24, 39, 0.8);
        }

        .wallet-adapter-modal-button-close {
          background-color: rgba(31, 41, 55, 0.7);
        }

        .wallet-adapter-modal-title {
          color: white;
        }

        .wallet-adapter-modal-content {
          border-radius: 1rem;
          background-color: rgba(31, 41, 55, 0.7);
        }

        .wallet-adapter-modal-list {
          margin: 0;
        }

        .wallet-adapter-modal-list .wallet-adapter-button {
          transition: all 0.2s ease;
        }

        .wallet-adapter-modal-list .wallet-adapter-button:hover {
          background-image: linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2));
        }
      `}</style>
    </div>
  )
}
