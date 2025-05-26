import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearch, IoLocationSharp } from 'react-icons/io5';
import { AiFillStar } from 'react-icons/ai';
import { useDebounceSearch } from '../hooks/useDebounceSearch';

const popularCities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
    'Dubai', 'Singapore', 'Hong Kong', 'Toronto', 'Mumbai'
];

function SearchBar({ onSearch, favorites = [], onToggleFavorite }) {
    const { value, suggestions, loading, handleChange, setSuggestions } = useDebounceSearch();
    const searchRef = useRef(null);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions.length > 0 && highlightedIndex >= 0) {
            // Use the highlighted suggestion
            const s = suggestions[highlightedIndex];
            onSearch({ lat: s.lat, lon: s.lon });
            setSuggestions([]);
            setHighlightedIndex(-1);
            return;
        }
        if (suggestions.length > 0) {
            onSearch({ lat: suggestions[0].lat, lon: suggestions[0].lon });
            setSuggestions([]);
            setHighlightedIndex(-1);
            return;
        }
        if (value.trim()) {
            onSearch(value.trim());
            setSuggestions([]);
            setHighlightedIndex(-1);
        }
    };

    const handleKeyDown = (e) => {
        if (!suggestions.length) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(idx => (idx + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(idx => (idx - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0) {
                e.preventDefault();
                const s = suggestions[highlightedIndex];
                onSearch({ lat: s.lat, lon: s.lon });
                setSuggestions([]);
                setHighlightedIndex(-1);
            }
        }
    };

    const handleSuggestionClick = (city) => {
        onSearch(city);
        setSuggestions([]);
        setHighlightedIndex(-1);
    };

    const handleLocationClick = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    onSearch({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto mb-8" ref={searchRef}>
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => { handleChange(e.target.value); setHighlightedIndex(-1); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for a city..."
                    aria-label="Search for a city"
                    className="w-full px-6 py-4 text-lg rounded-full bg-white bg-opacity-20 backdrop-blur-lg 
                             placeholder-gray-200 outline-none focus:ring-2 focus:ring-white/50 pr-24"
                    autoComplete="off"
                />
                {value && (
                    <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => handleChange('')}
                        className="absolute right-20 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/20 transition-colors"
                        tabIndex={0}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                )}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                    <button
                        type="button"
                        onClick={handleLocationClick}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        title="Use current location"
                    >
                        <IoLocationSharp className="text-2xl" />
                    </button>
                    <button
                        type="submit"
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <IoSearch className="text-2xl" />
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute w-full mt-2 py-2 bg-white/20 backdrop-blur-lg rounded-xl 
                                 shadow-lg overflow-hidden z-50"
                    >
                        <div className="max-h-60 overflow-y-auto">
                            {loading ? (
                                <div className="px-4 py-2 text-center">Loading suggestions...</div>
                            ) : (
                                suggestions.map((city, idx) => (
                                    <div
                                        key={`${city.name}-${city.lat}-${city.lon}`}
                                        onClick={() => handleSuggestionClick(city)}
                                        onMouseEnter={() => setHighlightedIndex(idx)}
                                        className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-white/20 cursor-pointer ${highlightedIndex === idx ? 'bg-white/30' : ''}`}
                                    >
                                        <span>{city.displayName}</span>
                                        {city.type && (
                                            <span className="ml-2 text-xs text-gray-400">{city.type}</span>
                                        )}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onToggleFavorite(city);
                                            }}
                                            className="p-1 hover:bg-white/20 rounded-full cursor-pointer"
                                        >
                                            <AiFillStar 
                                                className={favorites.some(f => f.name === city.name) 
                                                    ? "text-yellow-400" 
                                                    : "text-white/50"
                                                } 
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default SearchBar;