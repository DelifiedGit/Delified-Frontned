import React from 'react'

interface ChartProps {
  data: { label: string; value: number }[]
  type: 'bar' | 'line' | 'pie'
}

export const Chart: React.FC<ChartProps> = ({ data, type }) => {
  // This is a placeholder implementation. In a real-world scenario, you'd use a charting library.
  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">{type.charAt(0).toUpperCase() + type.slice(1)} Chart</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.label}:</span>
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const BarChart: React.FC<Omit<ChartProps, 'type'>> = (props) => <Chart {...props} type="bar" />
export const LineChart: React.FC<Omit<ChartProps, 'type'>> = (props) => <Chart {...props} type="line" />
export const PieChart: React.FC<Omit<ChartProps, 'type'>> = (props) => <Chart {...props} type="pie" />

