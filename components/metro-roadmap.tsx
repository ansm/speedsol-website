"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { CheckCircle2, Clock, Hourglass, Rocket } from "lucide-react"

export function MetroRoadmap() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)

    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Determine the layout based on window width
  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  // Define the roadmap data
  const roadmapData = [
    {
      id: 1,
      title: "Q2 2025",
      subtitle: "Launch Phase",
      icon: <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400",
      shadowColor: "shadow-cyan-500/20",
    },
    {
      id: 2,
      title: "Q3 2025",
      subtitle: "Growth Phase",
      icon: <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      color: "from-blue-500 to-purple-600",
      textColor: "text-blue-400",
      shadowColor: "shadow-blue-500/20",
    },
    {
      id: 3,
      title: "Q4 2025",
      subtitle: "Ecosystem Phase",
      icon: <Hourglass className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      color: "from-purple-500 to-pink-600",
      textColor: "text-purple-400",
      shadowColor: "shadow-purple-500/20",
    },
    {
      id: 4,
      title: "Q1 2026",
      subtitle: "Expansion Phase",
      icon: <Rocket className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      color: "from-pink-500 to-cyan-600",
      textColor: "text-pink-400",
      shadowColor: "shadow-pink-500/20",
    },
  ]

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1, delay: custom * 0.2 },
        opacity: { duration: 0.3, delay: custom * 0.2 },
      },
    }),
  }

  const stationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2 + custom * 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + custom * 0.3,
        duration: 0.5,
      },
    }),
  }

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: (custom: number) => ({
      scale: [1, 1.05, 1],
      transition: {
        delay: custom * 0.2,
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto mb-16 md:mb-24 relative -mt-8 md:-mt-12">
      {isMobile ? (
        // Mobile vertical layout
        <div className="relative py-8 px-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2"></div>

          {roadmapData.map((item, index) => (
            <div key={item.id} className="relative mb-20 last:mb-0">
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2"
                variants={stationVariants}
                custom={index}
                initial="hidden"
                animate={controls}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center z-10 shadow-lg ${item.shadowColor}`}
                  variants={pulseAnimation}
                  custom={index}
                  initial="initial"
                  animate="animate"
                >
                  {item.icon}
                </motion.div>
              </motion.div>

              <motion.div
                className="ml-16 pt-1 flex flex-col"
                variants={textVariants}
                custom={index}
                initial="hidden"
                animate={controls}
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className={`text-sm ${item.textColor} font-medium mb-2`}>{item.subtitle}</p>
                <div className="bg-gray-900/30 backdrop-blur-sm p-4 rounded-lg border border-gray-800 mt-2">
                  <ul className="space-y-2 text-sm">
                    {index === 0 && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-500 font-bold">✅</span>
                          <span>Launch on Raydium (Coming Soon)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-cyan-500 font-bold">✅</span>
                          <span>Grow Telegram and Twitter communities</span>
                        </li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">🚀</span>
                          <span>SpeedSOL Tipping Bots</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">🚀</span>
                          <span>Meme contests and giveaways</span>
                        </li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 font-bold">🔥</span>
                          <span>Launch SpeedSOL NFT Marketplace</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 font-bold">🔥</span>
                          <span>Governance proposals by community</span>
                        </li>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 font-bold">🌕</span>
                          <span>Staking pools for SpeedSOL holders</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 font-bold">🌕</span>
                          <span>Cross-chain compatibility</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        // Desktop/Tablet metro map layout with upward trajectory
        <div className="relative h-[600px] sm:h-[650px] md:h-[700px]">
          <svg
            viewBox="0 0 1000 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Metro lines - now going upward */}
            <motion.path
              d="M200,550 L400,550 L400,400 L600,400 L600,250 L800,250"
              stroke="url(#metroGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              variants={lineVariants}
              custom={0}
              initial="hidden"
              animate={controls}
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="metroGradient" x1="0%" y1="0%" x2="100%" y1="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="33%" stopColor="#7c3aed" />
                <stop offset="66%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Station 1 - Bottom left */}
          <motion.div
            className="absolute left-[20%] top-[550px] transform -translate-x-1/2 -translate-y-1/2"
            variants={stationVariants}
            custom={0}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center z-10 shadow-lg shadow-cyan-500/20"
              variants={pulseAnimation}
              custom={0}
              initial="initial"
              animate="animate"
            >
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>
            <motion.div
              className="absolute top-[30px] left-1/2 transform -translate-x-1/2 text-center w-[180px] flex flex-col items-center"
              variants={textVariants}
              custom={0}
              initial="hidden"
              animate={controls}
            >
              <h3 className="text-lg font-bold mb-1">Q2 2025</h3>
              <p className="text-sm text-cyan-400 font-medium mb-2">Launch Phase</p>
              <div className="bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg border border-gray-800 mt-1">
                <ul className="space-y-1 text-xs text-left">
                  <li className="flex items-start gap-1">
                    <span className="text-cyan-500 font-bold">✅</span>
                    <span>Launch on Raydium</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-cyan-500 font-bold">✅</span>
                    <span>Community growth</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Station 2 */}
          <motion.div
            className="absolute left-[40%] top-[550px] transform -translate-x-1/2 -translate-y-1/2"
            variants={stationVariants}
            custom={1}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center z-10 shadow-lg shadow-blue-500/20"
              variants={pulseAnimation}
              custom={1}
              initial="initial"
              animate="animate"
            >
              <Clock className="h-8 w-8" />
            </motion.div>
            <motion.div
              className="absolute top-[30px] left-1/2 transform -translate-x-1/2 text-center w-[180px] flex flex-col items-center"
              variants={textVariants}
              custom={1}
              initial="hidden"
              animate={controls}
            >
              <h3 className="text-lg font-bold mb-1">Q3 2025</h3>
              <p className="text-sm text-blue-400 font-medium mb-2">Growth Phase</p>
              <div className="bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg border border-gray-800 mt-1">
                <ul className="space-y-1 text-xs text-left">
                  <li className="flex items-start gap-1">
                    <span className="text-blue-500 font-bold">🚀</span>
                    <span>Tipping Bots</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-blue-500 font-bold">🚀</span>
                    <span>Meme contests</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Station 3 */}
          <motion.div
            className="absolute left-[60%] top-[400px] transform -translate-x-1/2 -translate-y-1/2"
            variants={stationVariants}
            custom={2}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20"
              variants={pulseAnimation}
              custom={2}
              initial="initial"
              animate="animate"
            >
              <Hourglass className="h-8 w-8" />
            </motion.div>
            <motion.div
              className="absolute top-[30px] left-1/2 transform -translate-x-1/2 text-center w-[180px] flex flex-col items-center"
              variants={textVariants}
              custom={2}
              initial="hidden"
              animate={controls}
            >
              <h3 className="text-lg font-bold mb-1">Q4 2025</h3>
              <p className="text-sm text-purple-400 font-medium mb-2">Ecosystem Phase</p>
              <div className="bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg border border-gray-800 mt-1">
                <ul className="space-y-1 text-xs text-left">
                  <li className="flex items-start gap-1">
                    <span className="text-purple-500 font-bold">🔥</span>
                    <span>NFT Marketplace</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-purple-500 font-bold">🔥</span>
                    <span>Governance</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Station 4 - Top right */}
          <motion.div
            className="absolute left-[80%] top-[250px] transform -translate-x-1/2 -translate-y-1/2"
            variants={stationVariants}
            custom={3}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-cyan-600 flex items-center justify-center z-10 shadow-lg shadow-pink-500/20"
              variants={pulseAnimation}
              custom={3}
              initial="initial"
              animate="animate"
            >
              <Rocket className="h-8 w-8" />
            </motion.div>
            <motion.div
              className="absolute top-[30px] left-1/2 transform -translate-x-1/2 text-center w-[180px] flex flex-col items-center"
              variants={textVariants}
              custom={3}
              initial="hidden"
              animate={controls}
            >
              <h3 className="text-lg font-bold mb-1">Q1 2026</h3>
              <p className="text-sm text-pink-400 font-medium mb-2">Expansion Phase</p>
              <div className="bg-gray-900/30 backdrop-blur-sm p-3 rounded-lg border border-gray-800 mt-1">
                <ul className="space-y-1 text-xs text-left">
                  <li className="flex items-start gap-1">
                    <span className="text-pink-500 font-bold">🌕</span>
                    <span>Staking pools</span>
                  </li>
                  <li className="flex items-start gap-1">
                    <span className="text-pink-500 font-bold">🌕</span>
                    <span>Cross-chain</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Moving train/pulse along the line - updated for upward path */}
          <motion.div
            className="absolute left-[20%] top-[550px] w-4 h-4 rounded-full bg-white shadow-lg shadow-white/50"
            animate={{
              left: ["20%", "40%", "40%", "60%", "60%", "80%"],
              top: ["550px", "550px", "550px", "400px", "400px", "250px"],
              scale: [1, 1.2, 1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              times: [0, 0.2, 0.2, 0.5, 0.5, 1],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          />
        </div>
      )}

      {/* Detailed Roadmap Tiles */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600"></div>
          <div className="absolute top-0 left-0 h-0 w-full bg-gradient-to-r from-cyan-500/10 to-transparent group-hover:h-full transition-all duration-700"></div>

          {/* Updated title section */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Q2 2025
            </h3>
            <p className="text-lg text-gray-300 mt-1">Launch Phase</p>
          </div>

          <ul className="space-y-3 md:space-y-4 relative z-10">
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-cyan-500 font-bold">✅</span>
              <span className="text-sm md:text-base">Launch on Raydium (Coming Soon)</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-cyan-500 font-bold">✅</span>
              <span className="text-sm md:text-base">Grow Telegram and Twitter communities</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-cyan-500 font-bold">✅</span>
              <span className="text-sm md:text-base">Meme contests and reward programs</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-cyan-500 font-bold">✅</span>
              <span className="text-sm md:text-base">Early marketing and partnerships</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
          <div className="absolute top-0 left-0 h-0 w-full bg-gradient-to-r from-blue-500/10 to-transparent group-hover:h-full transition-all duration-700"></div>

          {/* Updated title section */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Q3 2025
            </h3>
            <p className="text-lg text-gray-300 mt-1">Growth Phase</p>
          </div>

          <ul className="space-y-3 md:space-y-4 relative z-10">
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-blue-500 font-bold">🚀</span>
              <span className="text-sm md:text-base">SpeedSOL Tipping Bots (Telegram, Discord)</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-blue-500 font-bold">🚀</span>
              <span className="text-sm md:text-base">Meme contests and giveaways</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-blue-500 font-bold">🚀</span>
              <span className="text-sm md:text-base">Exclusive Meme NFT drops for holders</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-600"></div>
          <div className="absolute top-0 left-0 h-0 w-full bg-gradient-to-r from-purple-500/10 to-transparent group-hover:h-full transition-all duration-700"></div>

          {/* Updated title section */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Q4 2025
            </h3>
            <p className="text-lg text-gray-300 mt-1">Ecosystem Phase</p>
          </div>

          <ul className="space-y-3 md:space-y-4 relative z-10">
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-purple-500 font-bold">🔥</span>
              <span className="text-sm md:text-base">Launch SpeedSOL NFT Marketplace</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-purple-500 font-bold">🔥</span>
              <span className="text-sm md:text-base">Governance proposals by community</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-purple-500 font-bold">🔥</span>
              <span className="text-sm md:text-base">Integrations with Solana-based dApps</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-pink-500 to-cyan-600"></div>
          <div className="absolute top-0 left-0 h-0 w-full bg-gradient-to-r from-pink-500/10 to-transparent group-hover:h-full transition-all duration-700"></div>

          {/* Updated title section */}
          <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-500">
              Q1 2026
            </h3>
            <p className="text-lg text-gray-300 mt-1">Utility Scaling & Cross-Chain</p>
          </div>

          <ul className="space-y-3 md:space-y-4 relative z-10">
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-pink-500 font-bold">🌕</span>
              <span className="text-sm md:text-base">Staking pools for SpeedSOL holders</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-pink-500 font-bold">🌕</span>
              <span className="text-sm md:text-base">Microtransaction tipping integrations</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-pink-500 font-bold">🌕</span>
              <span className="text-sm md:text-base">Explore cross-chain compatibility</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
