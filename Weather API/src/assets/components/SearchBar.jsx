import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8 flex items-center justify-center p-2"
        >
            <input
                className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search by City"
            />
            <button
                type="submit"
                className="bg-pink-400 hover:bg-pink-600 w-20 h-12 rounded-full flex justify-center items-center transition"
            >
                <IoMdSearch className="text-2xl text-white" />
            </button>
        </form>
    );
}

export default SearchBar;