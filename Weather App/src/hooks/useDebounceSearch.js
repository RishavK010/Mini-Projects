import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const API_URL = "https://api.openweathermap.org/geo/1.0";
const API_KEY = "bcdb8eefeb536e3abe5adc43e5776c0e";

export const useDebounceSearch = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Create a debounced function for API calls
    const debouncedSearch = debounce(async (searchTerm) => {
        if (searchTerm.length < 2) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${API_URL}/direct?q=${searchTerm}&limit=5&appid=${API_KEY}`
            );
            const data = await response.json();
            
            // Format suggestions to include state and country
            const formattedSuggestions = data.map(city => ({
                name: city.name,
                state: city.state,
                country: city.country,
                lat: city.lat,
                lon: city.lon,
                displayName: `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
            }));
            
            setSuggestions(formattedSuggestions);
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
            setSuggestions([]);
        }
        setLoading(false);
    }, 300); // 300ms delay

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    const handleChange = (newValue) => {
        setValue(newValue);
        debouncedSearch(newValue);
    };

    return {
        value,
        suggestions,
        loading,
        handleChange,
        setSuggestions
    };
}; 