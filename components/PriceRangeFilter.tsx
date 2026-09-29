"use client";

import { useState, useEffect, useRef } from "react";

interface PriceRangeFilterProps {
    min: number;
    max: number;
    onChange: (values: { min: number; max: number }) => void;
}

export default function PriceRangeFilter({
    min,
    max,
    onChange,
}: PriceRangeFilterProps) {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

    // Constants
    const MIN_GAP = 500; // Minimum gap between thumbs
    const MAX_LIMIT = 100000; // Absolute max value

    // Convert to percentage
    const getPercent = (value: number) =>
        Math.round(((value - 0) / (MAX_LIMIT - 0)) * 100);

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Sync with parent props
    useEffect(() => {
        if (min !== minValRef.current) {
            setMinVal(min);
            minValRef.current = min;
        }
        if (max !== maxValRef.current) {
            setMaxVal(max);
            maxValRef.current = max;
        }
    }, [min, max]);

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxVal - MIN_GAP);
        setMinVal(value);
        minValRef.current = value;
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minVal + MIN_GAP);
        setMaxVal(value);
        maxValRef.current = value;
    };

    const handleDragEnd = () => {
        onChange({ min: minVal, max: maxVal });
    };

    return (
        <div className="w-full space-y-6">
            {/* Slider Container */}
            <div className="relative h-2 w-full mt-4 mb-8"> {/* Added margins for clearance */}
                {/* Track Background */}
                <div className="absolute h-full w-full rounded z-0 bg-gray-200 dark:bg-gray-700"></div>

                {/* Active Range Track */}
                <div
                    ref={range}
                    className="absolute h-full rounded z-10 bg-blue-500"
                ></div>

                {/* Left Thumb Input */}
                <input
                    type="range"
                    min={0}
                    max={MAX_LIMIT}
                    value={minVal}
                    onChange={handleMinChange}
                    onMouseUp={handleDragEnd}
                    onTouchEnd={handleDragEnd}
                    className="range-slider-thumb pointer-events-none absolute h-full w-full z-20 opacity-0 cursor-pointer appearance-none inset-0"
                    style={{
                        pointerEvents: 'none', // Allow clicks to pass through to bottom slider where not overlapping
                        WebkitAppearance: 'none',
                        zIndex: minVal > MAX_LIMIT - 100 ? 5 : 3 // dynamic z-index to handle overlap
                    }}
                />

                {/* Actual visible thumbs created via pure CSS on the inputs doesn't work well for overlapping.
           We need strictly positioned inputs or a custom heuristic.
           For simpler Cross-browser compatibility without external libs, 
           we style the inputs themselves as the thumbs and make the track transparent.
        */}

                {/* Re-implementation standard approach for multi-range:
           Two absolute positioned inputs with transparent backgrounds.
        */}
                <input
                    type="range"
                    min={0}
                    max={MAX_LIMIT}
                    value={minVal}
                    onChange={handleMinChange}
                    onMouseUp={handleDragEnd}
                    onTouchEnd={handleDragEnd}
                    className="absolute z-20 h-0 w-full outline-none pointer-events-none range-slider-thumb"
                    style={{
                        top: '50%',
                        transform: 'translateY(-50%)',
                        appearance: 'none',
                        background: 'transparent',
                    }}
                />
                <input
                    type="range"
                    min={0}
                    max={MAX_LIMIT}
                    value={maxVal}
                    onChange={handleMaxChange}
                    onMouseUp={handleDragEnd}
                    onTouchEnd={handleDragEnd}
                    className="absolute z-20 h-0 w-full outline-none pointer-events-none range-slider-thumb"
                    style={{
                        top: '50%',
                        transform: 'translateY(-50%)',
                        appearance: 'none',
                        background: 'transparent',
                    }}
                />
            </div>

            {/* Numeric Inputs */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative w-full">
                    <label className="text-xs text-gray-500 mb-1 block font-medium uppercase">Min Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">Rs</span>
                        <input
                            type="number"
                            value={minVal}
                            onChange={(e) => {
                                const val = Math.min(Number(e.target.value), maxVal - MIN_GAP);
                                setMinVal(val);
                                minValRef.current = val;
                            }}
                            onBlur={handleDragEnd} // Commit on blur
                            className="w-full rounded-lg border border-gray-200 bg-white pl-8 pr-2 py-2 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                </div>

                <div className="relative w-full">
                    <label className="text-xs text-gray-500 mb-1 block font-medium uppercase">Max Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">Rs</span>
                        <input
                            type="number"
                            value={maxVal}
                            onChange={(e) => {
                                const val = Math.max(Number(e.target.value), minVal + MIN_GAP);
                                setMaxVal(val);
                                maxValRef.current = val;
                            }}
                            onBlur={handleDragEnd} // Commit on blur
                            className="w-full rounded-lg border border-gray-200 bg-white pl-8 pr-2 py-2 text-sm font-medium shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
