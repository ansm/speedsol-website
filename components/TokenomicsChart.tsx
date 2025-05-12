"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { name: "Public Fair Launch", value: 75, color: "#3b82f6" }, // Changed from 85% to 75%
  { name: "Team & Development", value: 15, color: "#7c3aed" }, // Changed from 10% to 15%
  { name: "Community Rewards", value: 10, color: "#f59e0b" }, // Changed from 5% to 10%
]

const COLORS = ["#3b82f6", "#7c3aed", "#f59e0b"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
}) => {
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
      fontSize="14"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 shadow-lg">
        <p className="font-bold">{payload[0].name}</p>
        <p className="text-sm text-gray-300">{`${payload[0].value}%`}</p>
      </div>
    )
  }

  return null
}

export default function TokenomicsChart() {
  return (
    <div className="w-full h-[400px]">
      <ChartContainer className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="#1f2937"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
