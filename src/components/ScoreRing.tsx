import React from 'react';
interface ScoreRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  subLabel?: string;
}
export function ScoreRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#F5A623',
  label,
  subLabel
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percentage / 100 * circumference;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size
      }}>

      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
          fill="transparent" />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out" />

      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-3xl font-bold">{percentage}%</span>
        {subLabel &&
        <span className="text-[10px] uppercase tracking-wider opacity-80">
            {subLabel}
          </span>
        }
      </div>
    </div>);

}