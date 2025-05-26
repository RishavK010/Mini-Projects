import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { TbTemperature, TbDroplet, TbWind } from 'react-icons/tb';
import React from 'react';

const tabs = [
  { id: 'temperature', icon: TbTemperature, label: 'Temperature', color: '#FF9D43', bgColor: 'rgba(255, 157, 67, 0.15)' },
  { id: 'precipitation', icon: TbDroplet, label: 'Precipitation', color: '#4A90E2', bgColor: 'rgba(74, 144, 226, 0.15)' },
  { id: 'wind', icon: TbWind, label: 'Wind', color: '#72C02C', bgColor: 'rgba(114, 192, 44, 0.15)' }
];

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: 'numeric',
    hour12: true
  });
};

const formatDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString([], {
    weekday: 'short'
  });
};

function WeatherTabs({ hourlyData, weeklyData, formatTemp, darkMode }) {
  const [activeTab, setActiveTab] = useState('temperature');
  const activeColor = tabs.find(tab => tab.id === activeTab)?.color || '#FF9D43';

  const getChartData = (data, type) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map(item => ({
      time: type === 'hourly' ? formatTime(item.dt) : formatDay(item.dt),
      temp: item.main.temp,
      tempMin: item.main.temp_min,
      tempMax: item.main.temp_max,
      precipitation: item.pop * 100,
      wind: Math.round(item.wind?.speed || 0),
      weather: item.weather[0].description
    }));
  };

  const hourlyChartData = getChartData(hourlyData, 'hourly');
  const weeklyChartData = getChartData(weeklyData, 'weekly').slice(0, 5);

  const xAxisProps = {
    axisLine: false,
    tickLine: false,
    tick: { 
      fill: '#fff',
      fontSize: 14,
      fontWeight: 500
    },
    stroke: '#ffffff33',
    height: 60
  };

  const tooltipProps = {
    contentStyle: {
      backgroundColor: darkMode ? 'rgba(23, 25, 35, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      border: '1px solid',
      borderColor: darkMode ? 'rgba(75, 85, 99)' : 'rgba(229, 231, 235)',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      fontSize: '14px',
      color: darkMode ? '#fff' : '#1a1a1a'
    },
    formatter: (value, name) => {
      switch (name) {
        case 'temp':
          return [`${value}°C`, 'Temperature'];
        case 'precipitation':
          return [`${value}%`, 'Precipitation'];
        case 'wind':
          return [`${value} km/h`, 'Wind Speed'];
        default:
          return [value, name];
      }
    },
    cursor: {
      stroke: darkMode ? '#ffffff40' : '#00000040',
      strokeWidth: 2
    },
    labelStyle: { 
      color: darkMode ? '#fff' : '#1a1a1a',
      fontWeight: '600',
      marginBottom: '8px'
    },
    isAnimationActive: false
  };

  const yAxisProps = {
    axisLine: false,
    tickLine: false,
    tick: { 
      fill: '#fff',
      fontSize: 12
    },
    stroke: '#ffffff33'
  };

  const gridProps = {
    strokeDasharray: "3 3",
    stroke: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(26, 26, 26, 0.1)',
    vertical: false
  };

  const renderChart = () => {
    switch (activeTab) {
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyChartData}
              onMouseMove={(e) => {
                if (e && e.activeTooltipIndex !== undefined) {
                  const data = hourlyChartData[e.activeTooltipIndex];
                }
              }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9D43" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF9D43" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...xAxisProps} />
              <YAxis {...yAxisProps} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="temp"
                stroke="#FF9D43"
                fill="url(#tempGradient)"
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'precipitation':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyChartData}>
              <defs>
                <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A90E2" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4A90E2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...xAxisProps} />
              <YAxis {...yAxisProps} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="precipitation"
                stroke="#4A90E2"
                fill="url(#precipGradient)"
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'wind':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hourlyChartData}>
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#72C02C" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#72C02C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridProps} />
              <XAxis dataKey="time" {...xAxisProps} />
              <YAxis {...yAxisProps} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="wind"
                stroke="#72C02C"
                fill="url(#windGradient)"
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full min-h-[500px] p-4 sm:p-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-8">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === tab.id 
                ? 'text-white' 
                : darkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-white/80 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            style={{
              backgroundColor: activeTab === tab.id ? tab.bgColor : 'transparent',
              borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : 'none'
            }}
          >
            <tab.icon
              className="text-xl"
              style={{ color: activeTab === tab.id ? tab.color : (darkMode ? '#fff' : 'rgba(255,255,255,0.8)') }}
            />
            <span className="hidden sm:inline font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="mb-8"
        >
          {renderChart()}
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
        {weeklyChartData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: index * 0.03 }}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden p-6 rounded-xl ${
              darkMode 
                ? 'bg-slate-800/40 hover:bg-slate-800/60' 
                : 'bg-white/40 hover:bg-white/60'
            } backdrop-blur-md shadow-lg transition-all duration-100 ease-in-out border ${
              darkMode ? 'border-slate-700/50' : 'border-white/50'
            }`}
          >
            {/* Day Name */}
            <p className={`text-lg font-semibold mb-3 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>{day.time}</p>
            
            {/* Weather Icon */}
            <div className="text-5xl mb-4">
              {day.weather.includes('rain') ? '🌧️' :
               day.weather.includes('cloud') ? '☁️' :
               day.weather.includes('clear') ? '☀️' : '⛅'}
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <p className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {formatTemp(day.tempMax)}
              </p>
              <p className={`text-base ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {formatTemp(day.tempMin)}
              </p>
            </div>

            {/* Weather Details */}
            <div className={`mt-4 pt-4 border-t ${
              darkMode ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Rain</span>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {Math.round(day.precipitation)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Wind</span>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {day.wind} km/h
                </span>
              </div>
            </div>

            {/* Weather Description */}
            <p className={`mt-3 text-sm capitalize ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {day.weather}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WeatherTabs;