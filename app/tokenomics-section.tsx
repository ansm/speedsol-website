"use client"

import { motion } from "framer-motion"
import { SimplePieChart } from "@/components/simple-pie-chart"

export function TokenomicsSection() {
  return (
    <section className="py-12 md:py-16 px-4 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.15),transparent_70%)]"></div>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-8">Tokenomics</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            SpeedSOL is designed for a fair, transparent, and community-driven launch. Our token distribution ensures
            that the project remains decentralized, rewards the community, and supports future development and growth.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto mt-3 md:mt-4">
            Below is the breakdown of the total token supply:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-md mx-auto"
          >
            <SimplePieChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="space-y-4 md:space-y-6 max-w-md">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#3b82f6]"></div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">75% — Public Fair Launch</h3>
                  <p className="text-sm md:text-base text-gray-400">Available on Raydium Pool at launch</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#7c3aed]"></div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">15% — Team & Development</h3>
                  <p className="text-sm md:text-base text-gray-400">6-month lock, linear vesting afterward</p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#06b6d4]"></div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold">10% — Community Rewards</h3>
                  <p className="text-sm md:text-base text-gray-400">Airdrops, contests, and incentives</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
