"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { CustomWalletButton } from "./wallet-button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50"
          >
            <div className="flex flex-col gap-4">
              <a
                href="https://t.me/SpeedSOLToken"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-3 bg-gradient-to-r from-blue-700/50 to-purple-700/50 rounded-full transition-all duration-300 border border-blue-600/50 text-center z-10 hover:from-blue-600 hover:to-purple-600 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20"
                onClick={toggleMenu}
              >
                Join Telegram
              </a>
              <div className="flex justify-center">
                <CustomWalletButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
