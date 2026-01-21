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
      <div className="relative max-w-2xl mx-auto px-5">
        <div className="bg-orange-400/60 hover:bg-orange-400/70 my-5 rounded-full pl-5 flex items-center shadow-md hover:shadow-xl transition-shadow-colors duration-300">
          <div className="text-xl pr-3 py-2 text-gray-700 animate-fadeIn">
            <i className="ri-search-line"></i>
          </div>

          <input
            className="outline-none w-full text-lg ml-4 bg-transparent placeholder:text-stone-800/60 placeholder:italic hover:placeholder:text-stone-800 animate-fadeIn"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
              updateFilter("selectedRecipe", null); // Clear selected recipe when typing
            }}
            placeholder="Search recipes, ingredients, or cuisines..."
          />

          <button
            className="pr-5 text-gray-700 text-xl relative hover:text-black animate-fadeIn"
            onClick={filterHandler}
          >
            <i className="ri-equalizer-line"></i>
            {hasActiveFilters && (
              <span className="absolute top-0.5 right-3.5 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => sugHandler(s)}
                className="flex items-center gap-3 p-2 hover:bg-orange-500 hover:text-white cursor-pointer transition-colors"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <span className="font-medium">{s.name}</span>
                  <p className="text-xs opacity-75">{s.cuisine}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {filterDropDown && (
        <div className="fixed right-0 top-4 bg-[#940D0D] shadow-2xl w-80 h-[calc(100vh-1rem)] overflow-y-auto p-6 z-50 rounded-l-2xl duration-700 animate-slideIn">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-xl font-bold">Filters</h3>
            <button
              onClick={() => setFilterDropDown(false)}
              className="text-white text-2xl hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6 text-white">
            {/* Serving Size */}
            <div className="border p-4 rounded-lg border-orange-500/50">
              <div className="flex justify-between items-center mb-3">
                <label className="text-lg font-medium">Serving Size</label>
                {filters.servings > 0 && (
                  <button
                    onClick={() => updateFilter("servings", 0)}
                    className="text-xs text-orange-300 hover:text-white"
                  >
                    Clear
                  </button>
                )}
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
                className="w-full accent-orange-400"
              />

              <div className="flex justify-between text-sm mt-2">
                <span>0 (Any)</span>
                <span className="font-semibold">
                  {filters.servings > 0 ? `Min ${filters.servings}` : "Any"}
                </span>
                <span>40</span>
              </div>
            </div>

            {/* Difficulty */}
            <div className="border p-4 rounded-lg border-orange-500/50">
              <div className="flex justify-between items-center mb-3">
                <label className="text-lg font-medium">Difficulty</label>
                {filters.difficulty && (
                  <button
                    onClick={() => updateFilter("difficulty", null)}
                    className="text-xs text-orange-300 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {diffState.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => updateFilter("difficulty", diff)}
                    className={`flex-1 px-4 py-2 rounded-full font-medium transition ${
                      filters.difficulty === diff
                        ? "bg-orange-600 text-white"
                        : "bg-white/80 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Cook Time */}
            <div className="border p-4 rounded-lg border-orange-500/50">
              <div className="flex justify-between items-center mb-3">
                <label className="text-lg font-medium">Max Cook Time</label>
                {filters.time > 0 && (
                  <button
                    onClick={() => updateFilter("time", 0)}
                    className="text-xs text-orange-300 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <input
                type="range"
                min={0}
                max={120}
                step={5}
                value={filters.time}
                onChange={(e) => updateFilter("time", Number(e.target.value))}
                className="w-full accent-orange-500"
              />

              <div className="flex justify-between text-sm mt-2">
                <span>0 (Any)</span>
                <span className="font-semibold">
                  {filters.time > 0 ? `≤ ${filters.time} min` : "Any"}
                </span>
                <span>120 min</span>
              </div>
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={() => {
                  resetFilters();
                  setFilterDropDown(false);
                }}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
