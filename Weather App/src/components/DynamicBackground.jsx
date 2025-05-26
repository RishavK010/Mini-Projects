import React, { useMemo } from 'react';

const getBackgroundStyle = (weather, isDark) => {
    const time = new Date().getHours();
    const isNight = time < 6 || time > 18;

    const backgrounds = {
        clear: {
            day: {
                light: 'from-sky-400 via-blue-300 to-amber-100',
                dark: 'from-slate-900 via-blue-900 to-indigo-900'
            },
            night: {
                light: 'from-indigo-900 via-purple-800 to-blue-900',
                dark: 'from-gray-950 via-slate-900 to-blue-950'
            }
        },
        clouds: {
            day: {
                light: 'from-slate-200 via-blue-100 to-sky-100',
                dark: 'from-slate-800 via-slate-700 to-blue-900'
            },
            night: {
                light: 'from-slate-700 via-blue-800 to-indigo-900',
                dark: 'from-slate-950 via-slate-900 to-blue-950'
            }
        },
        rain: {
            day: {
                light: 'from-slate-300 via-blue-200 to-sky-200',
                dark: 'from-slate-800 via-blue-800 to-indigo-900'
            },
            night: {
                light: 'from-slate-800 via-blue-900 to-indigo-950',
                dark: 'from-slate-950 via-blue-950 to-indigo-950'
            }
        },
        snow: {
            day: {
                light: 'from-sky-100 via-blue-50 to-slate-50',
                dark: 'from-slate-800 via-blue-900 to-indigo-900'
            },
            night: {
                light: 'from-slate-700 via-blue-800 to-indigo-900',
                dark: 'from-slate-950 via-blue-950 to-indigo-950'
            }
        },
        thunderstorm: {
            day: {
                light: 'from-slate-600 via-purple-600 to-indigo-700',
                dark: 'from-slate-900 via-purple-900 to-indigo-950'
            },
            night: {
                light: 'from-slate-900 via-purple-900 to-indigo-950',
                dark: 'from-gray-950 via-purple-950 to-indigo-950'
            }
        }
    };

    let condition = 'clear';
    if (weather) {
        const weatherLower = weather.toLowerCase();
        if (weatherLower.includes('cloud')) condition = 'clouds';
        if (weatherLower.includes('rain')) condition = 'rain';
        if (weatherLower.includes('snow')) condition = 'snow';
        if (weatherLower.includes('thunder')) condition = 'thunderstorm';
    }

    const timeOfDay = isNight ? 'night' : 'day';
    const theme = isDark ? 'dark' : 'light';

    return `bg-gradient-to-br ${backgrounds[condition][timeOfDay][theme]}`;
};

const DynamicBackground = ({ weather, isDark, children }) => {
    const backgroundClass = useMemo(() => getBackgroundStyle(weather, isDark), [weather, isDark]);

    return (
        <div className={`min-h-screen transition-colors duration-700 ${backgroundClass}`}>
            <div className="relative z-10">
                {children}
            </div>
            
            {/* Weather Effects */}
            {weather && weather.toLowerCase().includes('rain') && (
                <div className="absolute inset-0 z-0 animate-rain pointer-events-none">
                    {[...Array(100)].map((_, i) => (
                        <div
                            key={i}
                            className="rain-drop"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${0.5 + Math.random() * 0.5}s`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DynamicBackground; 