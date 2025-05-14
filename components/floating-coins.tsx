"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type Coin = {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  delay: number
}

export function FloatingCoins() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Generate coins
    const newCoins: Coin[] = []
    const coinCount = Math.min(Math.floor(window.innerWidth / 100), 15)

    for (let i = 0; i < coinCount; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
        speed: 10 + Math.random() * 20,
        delay: Math.random() * 5,
      })
    }

    setCoins(newCoins)

    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute"
          style={{
            left: coin.x,
            top: coin.y,
            width: coin.size,
            height: coin.size,
          }}
          animate={{
            y: [coin.y, windowSize.height + 100],
            rotate: [coin.rotation, coin.rotation + 360],
            x: [coin.x, coin.x + Math.sin(coin.id) * 100, coin.x, coin.x - Math.sin(coin.id) * 100, coin.x],
          }}
          transition={{
            duration: coin.speed,
            repeat: Number.POSITIVE_INFINITY,
            delay: coin.delay,
            ease: "linear",
            times: [0, 1],
            x: {
              duration: coin.speed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            },
          }}
        >
          <Image
            src="https://speedsoltoken.com/images/logo.png"
            alt="SpeedSOL Coin"
            width={coin.size}
            height={coin.size}
            className="w-full h-full object-contain"
            style={{
              filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}
