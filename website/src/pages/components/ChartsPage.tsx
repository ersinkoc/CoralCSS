import { ComponentPageLayout } from './ComponentPageLayout'

// Sample data for charts
const barData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 78 },
  { label: 'Apr', value: 52 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 67 },
]

const lineData = [30, 45, 35, 60, 55, 75, 65, 80, 70, 90]

const pieData = [
  { label: 'Desktop', value: 45, color: 'bg-primary' },
  { label: 'Mobile', value: 35, color: 'bg-blue-500' },
  { label: 'Tablet', value: 20, color: 'bg-emerald-500' },
]

const heatmapData = [
  [1, 3, 5, 2, 4],
  [2, 5, 3, 4, 1],
  [4, 2, 4, 5, 3],
  [3, 4, 2, 1, 5],
  [5, 1, 3, 3, 2],
]

// Preview Components
function BarChartPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-end h-48 gap-4">
        {barData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
              style={{ height: `${item.value}%` }}
            />
            <span className="text-xs text-muted-foreground mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineChartPreview() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 200" className="w-full h-48">
        {[0, 50, 100, 150, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.1" />
        ))}
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          points={lineData.map((v, i) => `${i * 44 + 20},${200 - v * 2}`).join(' ')}
        />
        {lineData.map((v, i) => (
          <circle
            key={i}
            cx={i * 44 + 20}
            cy={200 - v * 2}
            r="4"
            fill="hsl(var(--primary))"
          />
        ))}
      </svg>
    </div>
  )
}

function PieChartPreview() {
  return (
    <div className="flex items-center justify-center gap-8">
      <svg viewBox="0 0 100 100" className="w-48 h-48">
        {(() => {
          let cumulativePercent = 0
          const colors = ['hsl(var(--primary))', '#3b82f6', '#10b981']
          return pieData.map((slice, index) => {
            const percent = slice.value
            const startX = Math.cos(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            const startY = Math.sin(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            cumulativePercent += percent
            const endX = Math.cos(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            const endY = Math.sin(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            const largeArcFlag = percent > 50 ? 1 : 0
            return (
              <path
                key={index}
                d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={colors[index]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            )
          })
        })()}
      </svg>
      <div className="space-y-2">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChartPreview() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          {(() => {
            let cumulativePercent = 0
            const colors = ['hsl(var(--primary))', '#3b82f6', '#10b981']
            return pieData.map((slice, index) => {
              const percent = slice.value
              const startAngle = (cumulativePercent / 100) * 360
              cumulativePercent += percent
              const endAngle = (cumulativePercent / 100) * 360
              const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180)
              const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180)
              const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180)
              const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180)
              const largeArc = percent > 50 ? 1 : 0
              return (
                <path
                  key={index}
                  d={`M ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="15"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              )
            })
          })()}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AreaChartPreview() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 200" className="w-full h-48">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[0, 50, 100, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.1" />
        ))}
        <path
          d={`M20,200 L20,${200 - lineData[0] * 2} ${lineData.map((v, i) => `L${i * 44 + 20},${200 - v * 2}`).join(' ')} L${(lineData.length - 1) * 44 + 20},200 Z`}
          fill="url(#areaGradient)"
        />
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          points={lineData.map((v, i) => `${i * 44 + 20},${200 - v * 2}`).join(' ')}
        />
      </svg>
    </div>
  )
}

function SparklinePreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Revenue</span>
        <svg viewBox="0 0 100 30" className="w-24 h-6">
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points="0,20 15,15 30,18 45,10 60,12 75,5 100,8"
          />
        </svg>
        <span data-coral-badge data-variant="success">+12%</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Users</span>
        <svg viewBox="0 0 100 30" className="w-24 h-6">
          {[20, 15, 25, 18, 22, 28, 24].map((h, i) => (
            <rect key={i} x={i * 14 + 1} y={30 - h} width="10" height={h} fill="hsl(var(--primary))" rx="1" />
          ))}
        </svg>
        <span data-coral-badge data-variant="info">+8%</span>
      </div>
    </div>
  )
}

function GaugePreview() {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251"
            strokeDashoffset="75"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">70%</span>
        </div>
      </div>
    </div>
  )
}

function MeterPreview() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Storage Used</span>
          <span className="text-foreground font-medium">75%</span>
        </div>
        <div data-coral-progress data-value="75">
          <div data-coral-progress-bar />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Performance Score</span>
          <span className="text-foreground font-medium">85/100</span>
        </div>
        <div data-coral-progress data-value="85" data-variant="success">
          <div data-coral-progress-bar />
        </div>
      </div>
    </div>
  )
}

function HeatmapPreview() {
  return (
    <div className="flex gap-4">
      <div className="grid gap-1">
        {heatmapData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((value, colIndex) => {
              const intensity = value / 5
              return (
                <div
                  key={colIndex}
                  className="w-10 h-10 rounded flex items-center justify-center text-xs font-medium transition-transform hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${intensity})`,
                    color: intensity > 0.5 ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                  }}
                >
                  {value}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between text-xs text-muted-foreground">
        <span>High</span>
        <div className="w-4 h-24 bg-gradient-to-b from-primary to-primary/10 rounded" />
        <span>Low</span>
      </div>
    </div>
  )
}

const chartComponents = [
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    description: 'Vertical and horizontal bar charts for comparing values.',
    usage: `<div data-coral-chart data-type="bar">
  <div data-coral-chart-bar data-value="65" data-label="Jan" />
  <div data-coral-chart-bar data-value="45" data-label="Feb" />
  <div data-coral-chart-bar data-value="78" data-label="Mar" />
</div>`,
    props: [
      { name: 'data', type: 'DataPoint[]', default: 'required', description: 'Array of data points with label and value' },
      { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Bar orientation direction' },
      { name: 'color', type: 'string', default: '"primary"', description: 'Bar color theme' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show axis labels' },
    ],
    preview: BarChartPreview,
  },
  {
    id: 'line-chart',
    name: 'Line Chart',
    description: 'Line and area visualizations for showing trends.',
    usage: `<div data-coral-chart data-type="line">
  <svg viewBox="0 0 400 200">
    <polyline points="..." fill="none" stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'number[]', default: 'required', description: 'Array of numeric values' },
      { name: 'smooth', type: 'boolean', default: 'false', description: 'Use smooth curves' },
      { name: 'showDots', type: 'boolean', default: 'true', description: 'Show data points' },
    ],
    preview: LineChartPreview,
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    description: 'Circular proportion charts for showing composition.',
    usage: `<div data-coral-chart data-type="pie">
  <svg viewBox="0 0 100 100">
    <path d="..." fill="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'PieSlice[]', default: 'required', description: 'Array of slices with value and color' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show slice labels' },
    ],
    preview: PieChartPreview,
  },
  {
    id: 'donut-chart',
    name: 'Donut Chart',
    description: 'Ring-style proportion charts with center space.',
    usage: `<div data-coral-chart data-type="donut">
  <svg viewBox="0 0 100 100">
    <path d="..." fill="none" stroke="..." strokeWidth="15" />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'PieSlice[]', default: 'required', description: 'Array of slices with value and color' },
      { name: 'thickness', type: 'number', default: '15', description: 'Ring thickness' },
      { name: 'centerContent', type: 'ReactNode', default: 'undefined', description: 'Center content' },
    ],
    preview: DonutChartPreview,
  },
  {
    id: 'area-chart',
    name: 'Area Chart',
    description: 'Filled area visualizations for showing volume.',
    usage: `<div data-coral-chart data-type="area">
  <svg viewBox="0 0 400 200">
    <path d="..." fill="url(#gradient)" />
    <polyline points="..." fill="none" stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'number[]', default: 'required', description: 'Array of numeric values' },
      { name: 'gradient', type: 'boolean', default: 'true', description: 'Use gradient fill' },
    ],
    preview: AreaChartPreview,
  },
  {
    id: 'sparkline',
    name: 'Sparkline',
    description: 'Compact inline charts for displaying trends.',
    usage: `<div data-coral-sparkline>
  <svg viewBox="0 0 100 30">
    <polyline points="..." fill="none" stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'number[]', default: 'required', description: 'Array of values' },
      { name: 'type', type: '"line" | "bar"', default: '"line"', description: 'Sparkline type' },
      { name: 'color', type: 'string', default: '"primary"', description: 'Sparkline color' },
    ],
    preview: SparklinePreview,
  },
  {
    id: 'gauge',
    name: 'Gauge',
    description: 'Radial progress indicators for showing completion.',
    usage: `<div data-coral-gauge data-value="70">
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
  </svg>
</div>`,
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Current value (0-100)' },
      { name: 'size', type: 'number', default: '120', description: 'Gauge size in pixels' },
      { name: 'thickness', type: 'number', default: '8', description: 'Arc thickness' },
    ],
    preview: GaugePreview,
  },
  {
    id: 'meter',
    name: 'Meter',
    description: 'Linear measurement displays for progress.',
    usage: `<div data-coral-progress data-value="75">
  <div data-coral-progress-bar />
</div>`,
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Current value (0-100)' },
      { name: 'variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Color variant' },
      { name: 'showLabel', type: 'boolean', default: 'false', description: 'Show percentage label' },
    ],
    preview: MeterPreview,
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    description: 'Color-coded data grids for showing patterns.',
    usage: `<div data-coral-heatmap>
  <div data-coral-heatmap-cell data-value="5" />
  <div data-coral-heatmap-cell data-value="3" />
</div>`,
    props: [
      { name: 'data', type: 'number[][]', default: 'required', description: '2D array of values' },
      { name: 'colorScale', type: 'string[]', default: '["low", "high"]', description: 'Color scale' },
      { name: 'showValues', type: 'boolean', default: 'true', description: 'Show cell values' },
    ],
    preview: HeatmapPreview,
  },
]

function ChartsPage() {
  return (
    <ComponentPageLayout
      categoryName="Charts"
      categoryId="charts"
      components={chartComponents}
      accessibilityFeatures={[
        'ARIA labels for data',
        'Pattern support',
        'Keyboard navigation',
        'Screen reader descriptions',
      ]}
    />
  )
}

export default ChartsPage
