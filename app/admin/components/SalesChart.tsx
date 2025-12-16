"use client";

import { useMemo } from "react";

export default function SalesChart() {
    // Mock data for visual demonstration - in a real app this would come from the API
    const data = [
        { day: 'Mon', value: 4000 },
        { day: 'Tue', value: 3000 },
        { day: 'Wed', value: 5500 },
        { day: 'Thu', value: 4500 },
        { day: 'Fri', value: 7000 },
        { day: 'Sat', value: 8500 },
        { day: 'Sun', value: 6000 },
    ];

    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Weekly Revenue</h2>
                    <p className="text-xs text-gray-500">Last 7 days performance</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">Rs 38.5k</p>
                    <p className="text-xs text-emerald-500 font-medium">+12.5% vs last week</p>
                </div>
            </div>

            <div className="flex items-end justify-between h-48 gap-2 pt-4 border-t border-gray-50">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                        <div className="w-full relative h-full flex items-end">
                            <div
                                className="w-full bg-blue-100 rounded-t-md group-hover:bg-blue-200 transition-all duration-300 relative"
                                style={{ height: `${(item.value / maxValue) * 100}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    Rs {item.value}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
