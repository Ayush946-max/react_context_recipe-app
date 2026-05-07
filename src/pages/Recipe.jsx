import { useContext, useEffect, useState } from "react";
import { rc } from "../context/RecipeContext";
import HeroSlider from "../components/HeroSlider";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import CategoryCards from "../components/CategoryCards";

const Recipe = () => {
  const { data, setData, setAllData, selectedRecipe } = useContext(rc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching or wait for Context to load
    if (allData.length > 0) {
      setIsLoading(false);
    } else {
      // If data takes time to fetch from an API or LocalStorage
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [allData]);

  // const fetchRecipes = async () => {
  //   try {
  //     const res = await fetch("https://dummyjson.com/recipes");
  //     const response = await res.json();

  //     // Only set data if it doesn't exist yet
  //     setData(response?.recipes || []);
  //     setAllData(response?.recipes || []);
  //     setIsLoading(false); // Stop loading after fetch
  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    // Check if we already have data (from localStorage via Context)
    const localSaved = localStorage.getItem("recipes");

    if (allData.length > 0 || localSaved) {
      // If data exists in context or storage, don't fetch API
      setIsLoading(false);
    } else {
      // Only fetch if the app is totally empty
      fetchRecipes();
    }
  }, [allData]); // Watch allData

  const recipesToShow = selectedRecipe.length > 0 ? selectedRecipe : data;

  return (
    <div className="animate-fadeIn min-h-screen">
      {/* Container with responsive padding to breathe on mobile */}
      <div className="px-2 md:px-8 lg:px-12 py-6 space-y-10">
        {/* HERO SECTION - Ensure Slider is responsive internally */}
        <section className="w-full overflow-hidden rounded-3xl shadow-lg">
          <HeroSlider />
        </section>

        {/* SEARCH & FILTER SECTION - Stacked on mobile, row on desktop */}
        <section className="flex flex-col gap-6 items-center justify-between">
          <div className="w-full lg:w-2/3 xl:1/2">
            <SearchBar />
          </div>
          <div className="w-full md:w-auto">
            <CategoryCards />
          </div>
        </section>

        {/* RECIPE GRID SECTION */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white/80 px-4">
            {selectedRecipe.length > 0
              ? "Filtered Results"
              : "Featured Recipes"}
          </h2>

          {/* We pass the grid logic into RecipeCard or handle it here */}
          <RecipeCard recipesToShow={recipesToShow} isLoading={isLoading} />
        </section>
      </div>
    </div>
  );
};

export default Recipe;
