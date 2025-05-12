"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronRight, Rocket, Zap, Users, Flame, PartyPopper, ExternalLink } from "lucide-react"
import { CustomWalletButton } from "@/components/wallet-button"
import { WalletNotification } from "@/components/wallet-notification"
import { TokenomicsSection } from "./tokenomics-section"
import { MetroRoadmap } from "@/components/metro-roadmap"
import { MobileMenu } from "@/components/mobile-menu"

export default function SpeedSolLanding() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white overflow-hidden">
      {/* Fixed Header - Now with conditional background */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/80 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto max-w-6xl py-3 md:py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-K7LkoCAqqbvhrw5WRPhqhexeKwje3s.png"
              alt="SpeedSol Logo"
              width={32}
              height={32}
              className="md:w-10 md:h-10"
            />
            <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              SpeedSOL
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://t.me/SpeedSOLToken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 bg-gradient-to-r from-blue-700/50 to-purple-700/50 rounded-full transition-all duration-300 border border-blue-600/50 h-[38px] flex items-center z-10 hover:from-blue-600 hover:to-purple-600 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20"
            >
              Join Telegram
            </a>
            <CustomWalletButton />
          </div>
          <MobileMenu />
        </div>
      </header>

      <WalletNotification />

      {/* Hero Section */}
      <section
        ref={ref}
        className="relative min-h-screen pt-20 md:pt-28 flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        {/* New Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/speedsol-banner.png"
            alt="SpeedSol Banner"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Keep the animated gradients for additional effect */}
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <div className="absolute h-40 w-[200%] left-[-50%] top-[calc(50%-20rem)] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent blur-3xl transform rotate-[-12deg]"></div>
          <div className="absolute h-40 w-[200%] left-[-50%] top-[calc(50%+5rem)] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent blur-3xl transform rotate-[8deg]"></div>
        </motion.div>

        <div className="container mx-auto max-w-6xl z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-2"
          >
            The Fastest Meme Token on Solana 🚀
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-8 md:mb-12"
          >
            <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                <span className="text-cyan-300">Fair Launch</span> <span className="text-gray-400">|</span>{" "}
                <span className="text-blue-300">No Presale</span> <span className="text-gray-400">|</span>{" "}
                <span className="text-purple-300">100% Community Powered</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 md:mb-16 px-2"
          >
            <a
              href="https://t.me/SpeedSOLToken"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 z-10"
            >
              Join the Race <ArrowRight className="h-5 w-5" />
            </a>
            <button
              disabled
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600/60 to-cyan-500/60 text-white rounded-full font-bold text-base sm:text-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Raydium Launch Coming Soon <Rocket className="h-5 w-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-cyan-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-gray-400 transform rotate-90" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.15),transparent_70%)]"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-8">
              About{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                SpeedSOL
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              SpeedSOL is a Solana-powered meme token built for ultra-fast microtransactions, tipping, meme contests,
              NFT rewards, and future ecosystem expansion. Fair launch. No presale. 100% driven by the community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Zap className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Lightning Fast ⚡</h3>
              <p className="text-sm md:text-base text-gray-400">
                Instant Solana transactions with minimal fees and maximum speed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Users className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Community First 🤝</h3>
              <p className="text-sm md:text-base text-gray-400">
                No presale, no VCs, fair launch with community at the center of everything
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Flame className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Fair Launch 🔥</h3>
              <p className="text-sm md:text-base text-gray-400">
                Only 1 SOL liquidity at launch, ensuring equal opportunity for everyone
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-pink-500 to-cyan-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <PartyPopper className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Meme Economy 🎉</h3>
              <p className="text-sm md:text-base text-gray-400">
                Contests, NFTs, rewards, and future integrations for the community
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Utilities Section */}
      <section className="py-12 md:py-16 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-8">
              Core{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                Utilities
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              SpeedSOL is more than just a meme token. It's built with real utility to power the next generation of
              Solana applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Ultra-Fast Microtransactions</h3>
              <p className="text-sm md:text-base text-gray-400">
                SpeedSOL leverages Solana's lightning-fast blockchain to enable near-instant transactions with minimal
                fees. Perfect for tipping, small payments, and high-frequency trading.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trophy"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Meme Contests & Rewards</h3>
              <p className="text-sm md:text-base text-gray-400">
                Participate in regular meme contests with $SPD token rewards. The best meme creators earn tokens and
                exclusive NFTs, building a vibrant creative community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all duration-300 h-full"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bot"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Tipping Bots Integration</h3>
              <p className="text-sm md:text-base text-gray-400">
                SpeedSOL will power tipping bots across Telegram, Discord, and other platforms, making it easy to reward
                great content and support creators with instant micropayments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full md:col-span-2 lg:col-span-1"
            >
              <div className="bg-gradient-to-br from-pink-500 to-cyan-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">NFT Marketplace</h3>
              <p className="text-sm md:text-base text-gray-400">
                The upcoming SpeedSOL NFT marketplace will allow creators to mint and trade meme-based NFTs using $SPD
                tokens, creating a unique digital art ecosystem within the community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 h-full md:col-span-2 lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-cyan-500 to-purple-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-vote"
                >
                  <path d="m9 12 2 2 4-4" />
                  <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
                  <path d="M22 19H2" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Community Governance</h3>
              <p className="text-sm md:text-base text-gray-400">
                SpeedSOL token holders will have voting rights on key project decisions, treasury allocations, and
                future development. True decentralization means the community decides the future direction of the
                project.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <TokenomicsSection />

      {/* Roadmap Section */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1),transparent_70%)]"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 md:mb-2">Roadmap</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-0">
              Our journey to build the fastest meme token ecosystem on Solana
            </p>

            {/* Metro-style Roadmap */}
            <MetroRoadmap />
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]"></div>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-8">Join the SpeedSOL Community</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12">
              Be part of the fastest growing community on Solana. Join us for memes, rewards, and the future of fast
              transactions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 md:mb-12">
              <a
                href="https://t.me/SpeedSOLToken"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 z-10"
              >
                Join us on Telegram <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/_Speed_SOL"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2 z-10"
              >
                Follow us on Twitter <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6 md:mt-8">
              <p className="text-gray-400 text-sm md:text-base">
                Join now and be among the first to experience the fastest meme token on Solana!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="images/logo.png"
              alt="SpeedSol Logo"
              width={80}
              height={80}
              className="mb-6 w-16 h-16 md:w-20 md:h-20"
            />

            <div className="flex gap-4 md:gap-6 mb-6 md:mb-8">
              <a
                href="https://t.me/SpeedSOLToken"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-send md:h-6 md:w-6"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </a>
              <a
                href="https://x.com/_Speed_SOL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter md:h-6 md:w-6"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-900 flex items-center justify-center opacity-50 cursor-not-allowed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rocket md:h-6 md:w-6"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
            </div>

            <p className="text-gray-500 text-xs md:text-sm text-center">
              © 2025 SpeedSOL. Built for Speed. Powered by Community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
