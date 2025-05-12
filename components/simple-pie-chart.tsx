"use client"

import { useEffect, useState } from "react"

const COLORS = ["#3b82f6", "#7c3aed", "#06b6d4"]

export function SimplePieChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">Loading chart...</div>
  }

  // Data for the pie chart
  const data = [
    { name: "Public Fair Launch", value: 75, color: COLORS[0] },
    { name: "Team & Development", value: 15, color: COLORS[1] },
    { name: "Community Rewards", value: 10, color: COLORS[2] },
  ]

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0)

  // Calculate the cumulative angles for each segment
  let cumulativeAngle = 0
  const segments = data.map((item, index) => {
    const startAngle = cumulativeAngle
    const angle = (item.value / total) * 360
    cumulativeAngle += angle
    const endAngle = cumulativeAngle

    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180

    const x1 = 200 + 150 * Math.cos(startRad)
    const y1 = 200 + 150 * Math.sin(startRad)
    const x2 = 200 + 150 * Math.cos(endRad)
    const y2 = 200 + 150 * Math.sin(endRad)

    // Calculate the midpoint for the label
    const midAngle = startAngle + angle / 2
    const midRad = ((midAngle - 90) * Math.PI) / 180
    const labelX = 200 + 100 * Math.cos(midRad)
    const labelY = 200 + 100 * Math.sin(midRad)

    const largeArcFlag = angle > 180 ? 1 : 0

    return {
      ...item,
      path: `M 200 200 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      labelX,
      labelY,
      percent: (item.value / total) * 100,
    }
  })

  return (
    <div className="w-full h-[300px] md:h-[380px] bg-gray-900/30 rounded-xl p-6 pt-3 md:p-8 md:pt-4 border border-gray-800 flex items-center justify-center">
      <div className="relative w-full max-w-[300px] md:max-w-[400px] h-[220px] md:h-[280px] mx-auto -mt-4 md:-mt-6">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            {/* Gradients for 3D effect */}
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Filters for 3D effect */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* 3D effect with shadow */}
          <g transform="translate(0, 10)">
            {segments.map((segment, index) => (
              <path key={`shadow-${index}`} d={segment.path} fill="#1f2937" opacity="0.5" />
            ))}
          </g>

          {/* Main pie segments */}
          {segments.map((segment, index) => (
            <path
              key={`segment-${index}`}
              d={segment.path}
              fill={`url(#${index === 0 ? "blueGradient" : index === 1 ? "purpleGradient" : "cyanGradient"})`}
              stroke="#1f2937"
              strokeWidth="2"
              filter="url(#shadow)"
            />
          ))}

          {/* Labels */}
          {segments.map((segment, index) => (
            <text
              key={`label-${index}`}
              x={segment.labelX}
              y={segment.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontWeight="bold"
              fontSize="16"
            >
              {`${Math.round(segment.percent)}%`}
            </text>
          ))}
        </svg>

        {/* Legend - Fixed to stay within container */}
        <div className="absolute -bottom-8 md:-bottom-12 left-0 right-0">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {data.map((item, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-1 md:gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs md:text-sm text-gray-300 whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
