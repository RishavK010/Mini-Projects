import React from 'react';

export default function LoadingSkeleton({ darkMode }) {
    return (
        <div className="animate-pulse" aria-busy="true" role="status">
            {/* Weather Card Skeleton */}
            <div className={`${
                darkMode 
                    ? 'bg-slate-800/40' 
                    : 'bg-white/40'
            } backdrop-blur-md rounded-lg p-6 mb-6 border ${
                darkMode ? 'border-slate-700/50' : 'border-white/50'
            }`}>
                <div className={`h-8 rounded w-1/3 mb-4 ${
                    darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                }`}></div>
                <div className={`h-16 rounded w-1/2 mb-4 ${
                    darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                }`}></div>
                <div className="space-y-3">
                    <div className={`h-4 rounded w-3/4 ${
                        darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                    }`}></div>
                    <div className={`h-4 rounded w-1/2 ${
                        darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                    }`}></div>
                </div>
            </div>

            {/* Weather Details Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`${
                        darkMode 
                            ? 'bg-slate-800/40' 
                            : 'bg-white/40'
                    } backdrop-blur-md rounded-lg p-4 border ${
                        darkMode ? 'border-slate-700/50' : 'border-white/50'
                    }`}>
                        <div className="flex items-center gap-x-2">
                            <div className={`w-6 h-6 rounded-full ${
                                darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                            }`}></div>
                            <div className={`h-4 rounded w-2/3 ${
                                darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                            }`}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className={`mt-6 ${
                darkMode 
                    ? 'bg-slate-800/40' 
                    : 'bg-white/40'
            } backdrop-blur-md rounded-lg p-4 border ${
                darkMode ? 'border-slate-700/50' : 'border-white/50'
            }`}>
                <div className={`h-[200px] rounded ${
                    darkMode ? 'bg-slate-700/50' : 'bg-gray-200/50'
                }`}></div>
            </div>
        </div>
    );
} 