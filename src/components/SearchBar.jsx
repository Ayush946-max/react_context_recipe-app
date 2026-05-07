// ==================== SearchBar.jsx ====================
import { useContext, useEffect, useState } from "react";
import { rc } from "../context/RecipeContext";

const SearchBar = () => {
  const {
    suggestions,
    setSuggestions,
    updateFilter,
    searchTerm,
    setSearchTerm,
    filters,
    resetFilters,
    hasActiveFilters,
  } = useContext(rc);

  const [showDropdown, setShowDropdown] = useState(false);
  const [filterDropDown, setFilterDropDown] = useState(false);

  const diffState = ["Easy", "Medium", "Hard"];

  // Fetch suggestions when user types
  useEffect(() => {
    if (!searchTerm?.trim()) {
      setSuggestions([]);
      updateFilter("selectedRecipe", null);
      setShowDropdown(false);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/recipes/search?q=${searchTerm}`,
          { signal: controller.signal },
        );
        const data = await res.json();
        setSuggestions(data?.recipes || []);
        setShowDropdown(true);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Handle suggestion selection
  const sugHandler = (suggestion) => {
    setSearchTerm(suggestion.name);
    updateFilter("selectedRecipe", suggestion);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const filterHandler = () => {
    setFilterDropDown(!filterDropDown);
  };

  return (
    <>
      <div className="relative max-w-2xl mx-auto px-4 sm:px-5">
        <div className="bg-orange-400/60 dark:bg-amber-900 hover:bg-orange-400/70 dark:hover:bg-amber-800 my-5 rounded-full pl-4 sm:pl-5 flex items-center shadow-md hover:shadow-xl transition-all duration-300">
          <div className="text-lg sm:text-xl pr-2 sm:pr-3 py-2 text-gray-700 dark:text-white/70 animate-fadeIn">
            <i className="ri-search-line"></i>
          </div>

          <input
            className="outline-none w-full text-lg sm:text-2xl ml-2 sm:ml-4 bg-transparent placeholder:text-stone-800/60 dark:placeholder:text-white/60 placeholder:italic placeholder:text-lg sm:placeholder:text-2xl hover:placeholder:text-stone-800 dark:hover:placeholder:text-white animate-fadeIn dark:text-white"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
              updateFilter("selectedRecipe", null);
            }}
            placeholder="Search recipes..."
          />

          <button
            className={`pr-4 sm:pr-5 text-gray-700 dark:text-white/60 text-lg sm:text-xl relative hover:text-black dark:hover:text-white/70 animate-fadeIn`}
            onClick={filterHandler}
          >
            <i className={`ri-equalizer-line ${hasActiveFilters && 'dark:text-white text-black'}`}></i>
            {hasActiveFilters && (
              <span className="absolute top-0.5 right-3 sm:right-3.5 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Search Suggestions Dropdown - Adjusted for mobile width */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full left-4 right-4 sm:left-0 sm:right-0 mt-2 bg-white dark:bg-zinc-950 dark:text-white rounded-xl shadow-lg max-h-60 sm:max-h-80 overflow-y-auto z-50">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => sugHandler(s)}
                className="flex items-center gap-3 p-3 hover:bg-orange-500 dark:hover:bg-orange-500/20 hover:text-white cursor-pointer transition-colors"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <span className="font-medium text-lg sm:text-2xl">
                    {s.name}
                  </span>
                  <p className="text-[13px] sm:text-base opacity-75">
                    {s.cuisine}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {filterDropDown && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setFilterDropDown(false)}
          />
          <div className="fixed right-0 top-0 sm:top-4 bg-[#940D0D] dark:dark:bg-[#1a0202] shadow-2xl w-80 h-full sm:h-[calc(100vh-2rem)] overflow-y-auto p-5 sm:p-6 z-50 sm:rounded-l-2xl transition-transform duration-1000 animate-slideIn">
            <div className="flex justify-between items-center mb-8 sm:mb-6">
              <h3 className="text-white text-xl font-bold">Filters</h3>
              <button
                onClick={() => setFilterDropDown(false)}
                className="text-white text-3xl sm:text-2xl p-2 hover:text-red-500 dark:hover:text-yellow-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-8 sm:space-y-6 text-white pb-10">
              {/* Serving Size */}
              <div className="border p-4 rounded-lg border-orange-500/50">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-medium">Serving Size</label>
                  <span className="text-orange-300 font-bold">
                    {filters.servings}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={filters.servings}
                  onChange={(e) =>
                    updateFilter("servings", Number(e.target.value))
                  }
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                {filters.servings > 0 && (
                  <button
                    onClick={() => updateFilter("servings", 0)}
                    className="text-sm text-orange-300 mt-4 border py-1.5 px-4 rounded-xl border-orange-300/50 transition-colors hover:bg-orange-300/20"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Difficulty */}
              <div className="border p-4 rounded-lg border-orange-500/50">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-lg font-medium block mb-4">
                    Difficulty
                  </label>
                  {filters.difficulty && (
                    <button
                      onClick={() => updateFilter("difficulty", null)}
                      className="text-base text-orange-300 hover:text-white mb-4"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {diffState.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => updateFilter("difficulty", diff)}
                      className={`px-2 py-2 rounded-xl text-base sm:text-lg transition ${
                        filters.difficulty === diff
                          ? "bg-orange-600 dark:bg-amber-500/20 text-white"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cook Time */}
              <div className="border p-4 rounded-lg border-orange-500/50">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-medium">Max Cook Time</label>
                  <span className="text-orange-300 font-bold">
                    {filters.time} min
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={2}
                  value={filters.time}
                  onChange={(e) => updateFilter("time", Number(e.target.value))}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                {filters.time > 0 && (
                  <button
                    onClick={() => updateFilter("time", 0)}
                    className="text-sm text-orange-300 mt-4 border py-1.5 px-4 rounded-xl border-orange-300/50 transition-colors hover:bg-orange-300/20"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Clear All Button */}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    resetFilters();
                    setFilterDropDown(false);
                  }}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-[#940D0D] font-black text-xl uppercase rounded-xl shadow-xl transition-all active:scale-95"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBar;
