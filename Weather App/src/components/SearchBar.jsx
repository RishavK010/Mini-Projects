import { useRef } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            onSearch(value.trim());
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (city) => {
        onSearch(city);
        setSuggestions([]);
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
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full px-6 py-4 text-lg rounded-full bg-white bg-opacity-20 backdrop-blur-lg 
                             placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 pr-24"
                />
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
                        className="absolute w-full mt-2 py-2 bg-white/20 backdrop-blur-lg rounded-xl 
                                 shadow-lg overflow-hidden z-50"
                    >
                        <div className="max-h-60 overflow-y-auto">
                            {loading ? (
                                <div className="px-4 py-2 text-center">Loading suggestions...</div>
                            ) : (
                                suggestions.map((city) => (
                                    <div
                                        key={`${city.name}-${city.lat}-${city.lon}`}
                                        onClick={() => handleSuggestionClick(city)}
                                        className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-white/20 cursor-pointer"
                                    >
                                        <span>{city.displayName}</span>
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