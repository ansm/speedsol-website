"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion, AnimatePresence } from "framer-motion"

export const WalletNotification = () => {
  const { connected, disconnecting } = useWallet()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    if (disconnecting) {
      setNotificationMessage("Wallet Disconnected")
      setShowNotification(true)
    }

    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [disconnecting, showNotification])

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                notificationMessage.includes("Connected") ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <p className="text-sm font-medium">{notificationMessage}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
