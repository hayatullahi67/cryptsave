import React, { useState, useRef, useMemo } from 'react';

const StatGraph: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => [
    { day: 'MON', value: 60, label: '$120' },
    { day: 'TUE', value: 35, label: '$85' },
    { day: 'WED', value: 70, label: '$210' },
    { day: 'THUR', value: 45, label: '$140' },
    { day: 'FRI', value: 85, label: '$320' },
    { day: 'SAT', value: 55, label: '$234' },
    { day: 'SUN', value: 95, label: '$450' },
  ], []);

  const points = useMemo(() => {
    const xStep = 100 / (data.length - 1);
    return data.map((d, i) => ({
      x: i * xStep,
      y: 100 - d.value
    }));
  }, [data]);

  const strokePath = useMemo(() => {
    return points.reduce((acc, point, i, arr) => {
      if (i === 0) return `M${point.x},${point.y}`;
      const prev = arr[i - 1];
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
    const index = Math.round((relativeX / 100) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
    setHoverIndex(clampedIndex);
  };

  const activeIdx = hoverIndex !== null ? hoverIndex : 5; // Default to Sat
  const activePoint = points[activeIdx];
  const activeData = data[activeIdx];

  return (
    <div 
      ref={containerRef}
      className="w-full relative cursor-crosshair touch-none select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <div className="relative w-full h-[220px] mb-6">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path d={fillPath} fill="url(#chartGradient)" className="transition-all duration-300" />
          <path d={strokePath} fill="none" stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />

          {/* Active Point Circle */}
          <g style={{ transform: `translate(${activePoint.x}%, ${activePoint.y}%)`, transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)' }}>
             <circle r="4" fill="white" stroke="#D4A017" strokeWidth="2" />
             <circle r="10" fill="#D4A017" opacity="0.15" />
          </g>
        </svg>

        {/* Tooltip Pill */}
        <div 
          className="absolute pointer-events-none transition-all duration-200 ease-out z-10"
          style={{ 
            left: `${activePoint.x}%`, 
            top: `${activePoint.y}%`,
            transform: 'translate(-50%, -150%)' 
          }}
        >
          <div className="bg-white text-black px-4 py-2 rounded-full text-[13px] font-bold shadow-2xl flex flex-col items-center">
            {activeData.label}
          </div>
          <div className="w-[1.5px] h-4 bg-white mx-auto mt-0" />
        </div>
      </div>
      
      {/* X-Axis Labels */}
      <div className="flex justify-between px-1 pt-2">
        {data.map((d, i) => (
          <span 
            key={i} 
            className={`text-[10px] font-bold tracking-tight transition-colors duration-200 ${
              activeIdx === i ? 'text-[#D4A017]' : 'text-gray-500'
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