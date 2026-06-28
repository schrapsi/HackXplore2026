import { useState } from 'react';
import type { ProjectMetric } from '../types';

interface MetricChartProps {
  metric: ProjectMetric;
}

export function MetricChart({ metric }: MetricChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const data = metric.dataPoints;

  if (data.length === 0) return null;

  // Chart dimensions
  const width = 500;
  const height = 180;
  const paddingX = 40;
  const paddingY = 20;

  const values = data.map(d => d.value);
  const minVal = Math.min(...values) * 0.9; // add some padding at bottom
  const maxVal = Math.max(...values) * 1.1; // add some padding at top
  const valRange = maxVal - minVal || 1;

  // Helper to map data point to SVG coordinates
  const getCoords = (index: number, val: number) => {
    const x = paddingX + (index / (data.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((val - minVal) / valRange) * (height - 2 * paddingY);
    return { x, y };
  };

  // Generate SVG path string for the line
  const points = data.map((d, i) => getCoords(i, d.value));
  
  // Smooth curve using bezier control points
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3;
      const cpY2 = p1.y;
      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
  }

  // Generate path for the gradient area under the line
  const areaD = pathD
    ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  // Format date helper (e.g. "2026-01-01" -> "Jan")
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const formatYValue = (value: number) => {
    if (value >= 1e6) return `${(value / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1).replace(/\.0$/, '')}k`;
    return Math.round(value).toString();
  };

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-3xl flex flex-col gap-4 relative overflow-hidden">
      <div>
        <span className="text-xs font-bold tracking-wider text-base-content/40 uppercase">Impact Metric Over Time</span>
        <h3 className="text-xl font-extrabold text-base-content mt-1 flex items-baseline gap-1.5">
          {metric.name}
          <span className="text-xs font-semibold text-base-content/50 uppercase">({metric.unit})</span>
        </h3>
      </div>

      <div className="relative w-full h-[180px]">
        {/* Responsive SVG */}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <defs>
            {/* Area Fill Gradient */}
            <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
            </linearGradient>
            {/* Line Glow Filter */}
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="currentColor" className="text-base-content/10 stroke-1 stroke-dashed" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="currentColor" className="text-base-content/10 stroke-1 stroke-dashed" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="currentColor" className="text-base-content/15 stroke-1" />

          {/* Y-axis Text Labels */}
          <text x={paddingX - 8} y={paddingY + 3} textAnchor="end" className="text-[10px] font-bold fill-base-content/40">
            {formatYValue(maxVal)}
          </text>
          <text x={paddingX - 8} y={height / 2 + 3} textAnchor="end" className="text-[10px] font-bold fill-base-content/40">
            {formatYValue((minVal + maxVal) / 2)}
          </text>
          <text x={paddingX - 8} y={height - paddingY + 3} textAnchor="end" className="text-[10px] font-bold fill-base-content/40">
            {formatYValue(minVal)}
          </text>

          {/* Gradient Area under the line */}
          {areaD && (
            <path d={areaD} fill="url(#chartAreaGradient)" />
          )}

          {/* The line itself */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary transition-all duration-300"
              filter="url(#lineGlow)"
            />
          )}

          {/* Interactive Hover Areas & Labels */}
          {points.map((p, i) => (
            <g key={i}>
              {/* x-axis text labels */}
              <text
                x={p.x}
                y={height - 4}
                textAnchor="middle"
                className="text-[10px] font-bold fill-base-content/40"
              >
                {formatDate(data[i].date)}
              </text>

              {/* Data points (dots) */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint === i ? "6" : "4"}
                fill={hoveredPoint === i ? "var(--color-accent)" : "var(--color-primary)"}
                stroke="var(--color-base-100)"
                strokeWidth={hoveredPoint === i ? "3" : "2"}
                className="transition-all duration-150 cursor-pointer shadow-md"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />

              {/* Invisible larger hover target circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r="18"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute bg-base-300/90 text-base-content text-xs font-bold py-1.5 px-3 rounded-xl border border-base-300 shadow-md pointer-events-none transition-all duration-100 flex flex-col gap-0.5"
            style={{
              left: `${(hoveredPoint / (data.length - 1)) * 80 + 10}%`,
              top: `${Math.max(10, (1 - (data[hoveredPoint].value - minVal) / valRange) * 100 - 30)}%`,
              transform: 'translateX(-50%)',
            }}
          >
            <span className="text-[9px] text-base-content/50 uppercase font-semibold">
              {formatDate(data[hoveredPoint].date)} Progress
            </span>
            <span className="text-sm font-extrabold flex items-baseline gap-1">
              {data[hoveredPoint].value.toLocaleString()}
              <span className="text-[10px] font-normal text-base-content/60">{metric.unit}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
