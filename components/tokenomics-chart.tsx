"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Public Fair Launch", value: 75 },
  { name: "Team & Development", value: 15 },
  { name: "Community Rewards", value: 10 },
]

const COLORS = ["#3b82f6", "#7c3aed", "#06b6d4"]

export function TokenomicsChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="w-full h-[400px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <div className="w-full h-[400px] bg-gray-900/30 rounded-xl p-4 border border-gray-800">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  fontSize={14}
                  fontWeight="bold"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              )
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#1f2937" strokeWidth={2} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value, entry, index) => <span style={{ color: "white" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
