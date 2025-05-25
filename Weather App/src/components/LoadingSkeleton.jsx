import React from 'react';

export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Weather Card Skeleton */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
                <div className="h-8 bg-gray-300/20 rounded w-1/3 mb-4"></div>
                <div className="h-16 bg-gray-300/20 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-300/20 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300/20 rounded w-1/2"></div>
                </div>
            </div>

            {/* Weather Details Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <div className="flex items-center gap-x-2">
                            <div className="w-6 h-6 bg-gray-300/20 rounded-full"></div>
                            <div className="h-4 bg-gray-300/20 rounded w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="h-[200px] bg-gray-300/20 rounded"></div>
            </div>
        </div>
    );
} 