"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { CheckCircle2, Clock, Hourglass, Rocket } from "lucide-react"

export function SnakeRoadmap() {
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
  const isDesktop = windowWidth >= 1024

  // Define the SVG path and milestone positions based on screen size
  let svgPath = ""
  let milestones = []

  if (isMobile) {
    // Mobile layout - 4 rows, 1 milestone per row
    svgPath = `
      M 150,50 C 200,50 250,50 300,50
      C 350,50 400,75 400,125
      C 400,175 350,200 300,200
      C 250,200 200,200 150,200
      C 100,200 50,225 50,275
      C 50,325 100,350 150,350
      C 200,350 250,350 300,350
      C 350,350 400,375 400,425
      C 400,475 350,500 300,500
      C 250,500 200,500 150,500
    `
    milestones = [
      { x: 150, y: 50, labelPosition: "top" },
      { x: 150, y: 200, labelPosition: "bottom" },
      { x: 150, y: 350, labelPosition: "top" },
      { x: 150, y: 500, labelPosition: "bottom" },
    ]
  } else if (isTablet) {
    // Tablet layout - 2 rows, 2 milestones per row
    svgPath = `
      M 150,100 C 250,50 350,150 450,100
      C 500,75 550,125 550,175
      C 550,225 500,275 450,300
      C 350,350 250,250 150,300
      C 100,325 50,275 50,225
      C 50,175 100,125 150,100
    `
    milestones = [
      { x: 150, y: 100, labelPosition: "top" },
      { x: 450, y: 100, labelPosition: "bottom" },
      { x: 450, y: 300, labelPosition: "top" },
      { x: 150, y: 300, labelPosition: "bottom" },
    ]
  } else {
    // Desktop layout - 2 rows, 2 milestones per row, wider spacing
    svgPath = `
      M 200,100 C 350,50 500,150 650,100
      C 700,75 750,125 750,175
      C 750,225 700,275 650,300
      C 500,350 350,250 200,300
      C 150,325 100,275 100,225
      C 100,175 150,125 200,100
    `
    milestones = [
      { x: 200, y: 100, labelPosition: "top" },
      { x: 650, y: 100, labelPosition: "bottom" },
      { x: 650, y: 300, labelPosition: "top" },
      { x: 200, y: 300, labelPosition: "bottom" },
    ]
  }

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 3, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  }

  const milestoneVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + custom * 0.5,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    }),
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7 + custom * 0.5,
        duration: 0.5,
      },
    }),
  }

  const floatAnimation = {
    initial: { y: 0 },
    animate: (custom: number) => ({
      y: [0, -10, 0],
      transition: {
        delay: custom * 0.2,
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    }),
  }

  // Set the SVG viewBox based on screen size
  const viewBox = isMobile ? "0 0 450 550" : isTablet ? "0 0 600 400" : "0 0 850 400"

  // Set the container height based on screen size
  const containerHeight = isMobile ? "h-[550px]" : isTablet ? "h-[400px]" : "h-[400px]"

  return (
    <div ref={ref} className={`w-full max-w-5xl mx-auto mb-16 md:mb-24 relative ${containerHeight}`}>
      {/* SVG Container */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Animated Snake Path */}
          <motion.path
            d={svgPath}
            stroke="url(#roadmapGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            variants={pathVariants}
            initial="hidden"
            animate={controls}
            className="drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y1="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="33%" stopColor="#7c3aed" />
              <stop offset="66%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Milestone Points */}
      <div className="absolute inset-0 w-full h-full">
        {/* Q2 2025 - Launch */}
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: milestones[0].x, top: milestones[0].y }}
          variants={milestoneVariants}
          custom={0}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center z-10 shadow-lg shadow-cyan-500/20"
            variants={floatAnimation}
            custom={0}
            initial="initial"
            animate="animate"
          >
            <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
          </motion.div>
          <motion.div
            className={`absolute ${
              milestones[0].labelPosition === "top" ? "top-[-60px] sm:top-[-70px]" : "bottom-[-60px] sm:bottom-[-70px]"
            } left-1/2 transform -translate-x-1/2 text-center w-[100px] sm:w-[120px]`}
            variants={textVariants}
            custom={0}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-base sm:text-lg font-bold mb-0 sm:mb-1">Q2 2025</h3>
            <p className="text-xs sm:text-sm text-cyan-400 font-medium">Launch Phase</p>
          </motion.div>
        </motion.div>

        {/* Q3 2025 - Growth */}
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: milestones[1].x, top: milestones[1].y }}
          variants={milestoneVariants}
          custom={1}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center z-10 shadow-lg shadow-blue-500/20"
            variants={floatAnimation}
            custom={1}
            initial="initial"
            animate="animate"
          >
            <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
          </motion.div>
          <motion.div
            className={`absolute ${
              milestones[1].labelPosition === "top" ? "top-[-60px] sm:top-[-70px]" : "bottom-[-60px] sm:bottom-[-70px]"
            } left-1/2 transform -translate-x-1/2 text-center w-[100px] sm:w-[120px]`}
            variants={textVariants}
            custom={1}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-base sm:text-lg font-bold mb-0 sm:mb-1">Q3 2025</h3>
            <p className="text-xs sm:text-sm text-blue-400 font-medium">Growth Phase</p>
          </motion.div>
        </motion.div>

        {/* Q4 2025 - Ecosystem */}
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: milestones[2].x, top: milestones[2].y }}
          variants={milestoneVariants}
          custom={2}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center z-10 shadow-lg shadow-purple-500/20"
            variants={floatAnimation}
            custom={2}
            initial="initial"
            animate="animate"
          >
            <Hourglass className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
          </motion.div>
          <motion.div
            className={`absolute ${
              milestones[2].labelPosition === "top" ? "top-[-60px] sm:top-[-70px]" : "bottom-[-60px] sm:bottom-[-70px]"
            } left-1/2 transform -translate-x-1/2 text-center w-[100px] sm:w-[120px]`}
            variants={textVariants}
            custom={2}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-base sm:text-lg font-bold mb-0 sm:mb-1">Q4 2025</h3>
            <p className="text-xs sm:text-sm text-purple-400 font-medium">Ecosystem Phase</p>
          </motion.div>
        </motion.div>

        {/* Q1 2026 - Expansion */}
        <motion.div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: milestones[3].x, top: milestones[3].y }}
          variants={milestoneVariants}
          custom={3}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-pink-500 to-cyan-600 flex items-center justify-center z-10 shadow-lg shadow-pink-500/20 opacity-70"
            variants={floatAnimation}
            custom={3}
            initial="initial"
            animate="animate"
          >
            <Rocket className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
          </motion.div>
          <motion.div
            className={`absolute ${
              milestones[3].labelPosition === "top" ? "top-[-60px] sm:top-[-70px]" : "bottom-[-60px] sm:bottom-[-70px]"
            } left-1/2 transform -translate-x-1/2 text-center w-[100px] sm:w-[120px]`}
            variants={textVariants}
            custom={3}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-base sm:text-lg font-bold mb-0 sm:mb-1">Q1 2026</h3>
            <p className="text-xs sm:text-sm text-pink-400 font-medium">Expansion Phase</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Particles */}
      <motion.div
        className="absolute left-0 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"
        animate={{
          offsetDistance: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        style={{
          offsetPath: `path('${svgPath}')`,
          offsetRotate: "0deg",
        }}
        transition={{
          duration: 15,
          ease: "linear",
          times: [0, 0.1, 0.9, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 1,
        }}
      />

      <motion.div
        className="absolute left-0 top-0 w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"
        animate={{
          offsetDistance: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        style={{
          offsetPath: `path('${svgPath}')`,
          offsetRotate: "0deg",
        }}
        transition={{
          duration: 18,
          ease: "linear",
          times: [0, 0.1, 0.9, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.5,
          delay: 2,
        }}
      />
    </div>
  )
}
