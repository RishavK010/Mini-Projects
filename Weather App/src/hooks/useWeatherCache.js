import { useState, useEffect } from 'react';

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const useWeatherCache = () => {
    const [cache, setCache] = useState(() => {
        const savedCache = localStorage.getItem('weatherCache');
        return savedCache ? JSON.parse(savedCache) : {};
    });

    useEffect(() => {
        localStorage.setItem('weatherCache', JSON.stringify(cache));
    }, [cache]);

    const getCachedData = (key) => {
        const cachedItem = cache[key];
        if (!cachedItem) return null;

        const isExpired = Date.now() - cachedItem.timestamp > CACHE_DURATION;
        if (isExpired) {
            const newCache = { ...cache };
            delete newCache[key];
            setCache(newCache);
            return null;
        }

        return cachedItem.data;
    };

    const setCachedData = (key, data) => {
        setCache(prev => ({
            ...prev,
            [key]: {
                data,
                timestamp: Date.now()
            }
        }));
    };

    const clearCache = () => {
        localStorage.removeItem('weatherCache');
        setCache({});
    };

    return {
        getCachedData,
        setCachedData,
        clearCache
    };
};

export const useProgressiveLoading = (data, delay = 100) => {
    const [visibleItems, setVisibleItems] = useState([]);

    useEffect(() => {
        if (!data) return;

        const loadItems = async () => {
            const items = Array.isArray(data) ? data : [data];
            for (let i = 0; i < items.length; i++) {
                await new Promise(resolve => setTimeout(resolve, delay));
                setVisibleItems(prev => [...prev, items[i]]);
            }
        };

        setVisibleItems([]);
        loadItems();
    }, [data, delay]);

    return visibleItems;
}; 