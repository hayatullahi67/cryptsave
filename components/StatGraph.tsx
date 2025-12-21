
import React, { useState, useRef, useMemo } from 'react';

const StatGraph: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // High-fidelity mock data points (0-100 scale for Y, 0-100 for X)
  const data = useMemo(() => [
    { day: 'Mon', value: 60, label: '$120' },
    { day: 'Tue', value: 35, label: '$85' },
    { day: 'Wed', value: 70, label: '$210' },
    { day: 'Thur', value: 45, label: '$140' },
    { day: 'Fri', value: 85, label: '$320' },
    { day: 'Sat', value: 55, label: '$234' },
    { day: 'Sun', value: 95, label: '$450' },
  ], []);

  // Calculate SVG path points
  const points = useMemo(() => {
    const xStep = 100 / (data.length - 1);
    return data.map((d, i) => ({
      x: i * xStep,
      y: 100 - d.value // SVG y is top-down
    }));
  }, [data]);

  // Generate smooth cubic bezier path
  const strokePath = useMemo(() => {
    return points.reduce((acc, point, i, arr) => {
      if (i === 0) return `M${point.x},${point.y}`;
      const prev = arr[i - 1];
      // Control points for smooth curve
      const cp1x = prev.x + (point.x - prev.x) / 2;
      return `${acc} C${cp1x},${prev.y} ${cp1x},${point.y} ${point.x},${point.y}`;
    }, "");
  }, [points]);

  const fillPath = `${strokePath} V100 H0 Z`;

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = ('touches' in e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = ((xPos - rect.left) / rect.width) * 100;
    
    // Find closest index
    const index = Math.round((relativeX / 100) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    setHoverIndex(clampedIndex);
  };

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[5]; // Default to Sat
  const activeData = hoverIndex !== null ? data[hoverIndex] : data[5];

  return (
    <div 
      ref={containerRef}
      className="w-full relative cursor-crosshair touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div className="relative w-full h-[180px] mb-6">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#D4A017" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Main Area Fill */}
          <path d={fillPath} fill="url(#chartGradient)" className="transition-all duration-500 ease-in-out" />
          
          {/* Main Stroke Line */}
          <path 
            d={strokePath} 
            fill="none" 
            stroke="#D4A017" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-all duration-500 ease-in-out"
          />

          {/* Vertical Indicator Line */}
          {hoverIndex !== null && (
            <line 
              x1={activePoint.x} y1="0" x2={activePoint.x} y2="100" 
              stroke="white" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.3" 
            />
          )}
          
          {/* Active Point Dot */}
          <g style={{ transform: `translate(${activePoint.x}px, ${activePoint.y}px)`, transition: 'all 0.15s ease-out' }}>
             <circle r="4.5" fill="white" stroke="#D4A017" strokeWidth="2.5" />
             <circle r="12" fill="#D4A017" opacity="0.15" />
          </g>
        </svg>

        {/* Tooltip Label Overlay */}
        <div 
          className="absolute pointer-events-none transition-all duration-150 ease-out"
          style={{ 
            left: `${activePoint.x}%`, 
            top: `${activePoint.y - 10}px`,
            transform: 'translate(-50%, -100%)' 
          }}
        >
          <div className="bg-white text-black px-4 py-1.5 rounded-full text-[13px] font-bold shadow-2xl border border-white/20 whitespace-nowrap">
            {activeData.label}
          </div>
          {/* Tooltip Arrow Stem */}
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-white/40 to-transparent mx-auto mt-[-2px]" />
        </div>
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between px-1 border-t border-white/5 pt-4">
        {data.map((d, i) => (
          <span 
            key={i} 
            className={`text-[11px] font-bold uppercase tracking-tight transition-colors duration-200 ${
              (hoverIndex === i || (hoverIndex === null && i === 5)) ? 'text-[#D4A017]' : 'text-gray-500'
            }`}
          >
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default StatGraph;
