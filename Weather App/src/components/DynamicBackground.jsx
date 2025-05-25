import React, { useMemo } from 'react';

const getBackgroundStyle = (weather, isDark) => {
    const time = new Date().getHours();
    const isNight = time < 6 || time > 18;

    const backgrounds = {
        clear: {
            day: {
                light: 'from-blue-400 via-blue-300 to-yellow-200',
                dark: 'from-blue-900 via-blue-800 to-blue-700'
            },
            night: {
                light: 'from-blue-900 via-purple-900 to-indigo-900',
                dark: 'from-gray-900 via-blue-900 to-black'
            }
        },
        clouds: {
            day: {
                light: 'from-gray-300 via-blue-200 to-gray-200',
                dark: 'from-gray-800 via-gray-700 to-gray-600'
            },
            night: {
                light: 'from-gray-800 via-gray-700 to-gray-600',
                dark: 'from-gray-900 via-gray-800 to-gray-700'
            }
        },
        rain: {
            day: {
                light: 'from-gray-400 via-blue-400 to-gray-500',
                dark: 'from-gray-800 via-blue-800 to-gray-700'
            },
            night: {
                light: 'from-gray-800 via-blue-900 to-gray-900',
                dark: 'from-gray-900 via-blue-900 to-black'
            }
        },
        snow: {
            day: {
                light: 'from-blue-100 via-blue-50 to-gray-100',
                dark: 'from-blue-900 via-gray-800 to-gray-700'
            },
            night: {
                light: 'from-blue-900 via-gray-800 to-gray-900',
                dark: 'from-gray-900 via-blue-900 to-black'
            }
        },
        thunderstorm: {
            day: {
                light: 'from-gray-600 via-purple-600 to-gray-700',
                dark: 'from-gray-900 via-purple-900 to-gray-800'
            },
            night: {
                light: 'from-gray-900 via-purple-900 to-black',
                dark: 'from-black via-purple-900 to-gray-900'
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