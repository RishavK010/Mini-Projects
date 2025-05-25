import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('weatherFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (city) => {
        if (!favorites.some(fav => fav.name === city.name)) {
            setFavorites(prev => [...prev, city]);
        }
    };

    const removeFavorite = (cityName) => {
        setFavorites(prev => prev.filter(city => city.name !== cityName));
    };

    const isFavorite = (cityName) => {
        return favorites.some(city => city.name === cityName);
    };

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };
}; 