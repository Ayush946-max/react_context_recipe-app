// ==================== RecipeContext.jsx ====================
import { createContext, useEffect, useState, useMemo } from "react";

export const rc = createContext(null);

const RecipeContext = (props) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("mode")) || "",
  );

  const [allData, setAllData] = useState([]); // Original data (never changes)
  const [data, setData] = useState([]); // Filtered data for UI

  // 🔥 CENTRALIZED FILTER STATE
  const [filters, setFilters] = useState({
    search: "",
    category: null,
    difficulty: null,
    servings: 0,
    time: 0,
    selectedRecipe: null,
  });

  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("fav")) || [],
  );

  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState([]);

  // Load recipes from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recipes"));
    if (stored) {
      setAllData(stored);
      setData(stored);
    }
  }, []);

  // 🔥 APPLY FILTERS - This runs whenever filters or allData changes
  useEffect(() => {
    let result = [...allData];

    // 1. If a specific recipe is selected (from search suggestions)
    if (filters.selectedRecipe) {
      setData([filters.selectedRecipe]);
      return;
    }

    // 2. Search filter (from searchTerm in SearchBar)
    if (searchTerm.trim()) {
      result = result.filter(
        (r) =>
          r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.cuisine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.ingredients?.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // 3. Category filter (from CategoryCards)
    if (filters.category) {
      result = result.filter((r) => r.mealType?.includes(filters.category));
    }

    // 4. Difficulty filter (from SearchBar filter panel)
    if (filters.difficulty) {
      result = result.filter((r) => r.difficulty === filters.difficulty);
    }

    // 5. Servings filter (minimum servings)
    if (filters.servings > 0) {
      result = result.filter((r) => r.servings >= filters.servings);
    }

    // 6. Time filter (maximum cook time)
    if (filters.time > 0) {
      result = result.filter((r) => r.cookTimeMinutes <= filters.time);
    }

    setData(result);
  }, [filters, allData, searchTerm]);

  // 🔥 FILTER UPDATE FUNCTIONS
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: null,
      difficulty: null,
      servings: 0,
      time: 0,
      selectedRecipe: null,
    });
    setSearchTerm("");
    setSelectedRecipe([]);
  };

  const resetFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        key === "search" ? "" : key === "servings" || key === "time" ? 0 : null,
    }));
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== "" ||
      filters.category !== null ||
      filters.difficulty !== null ||
      filters.servings > 0 ||
      filters.time > 0
    );
  }, [filters, searchTerm]);

  return (
    <rc.Provider
      value={{
        // Data
        data,
        setData,
        allData,
        setAllData,

        // Filters
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        resetFilter,
        hasActiveFilters,

        // Favorites
        favorite,
        setFavorite,

        // Dark Mode
        darkMode,
        setDarkMode,

        // Search
        suggestions,
        setSuggestions,
        searchTerm,
        setSearchTerm,
        selectedRecipe,
        setSelectedRecipe,
      }}
    >
      {props.children}
    </rc.Provider>
  );
};

export default RecipeContext;
