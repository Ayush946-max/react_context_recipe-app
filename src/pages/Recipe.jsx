import { useContext, useEffect, useState } from "react";
import { rc } from "../context/RecipeContext";
import HeroSlider from "../components/HeroSlider";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import CategoryCards from "../components/CategoryCards";

const Recipe = () => {
  const { data, setData, setAllData, selectedRecipe, allData } = useContext(rc);
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
    <div className="animate-fadeIn">
      {/* -------- HERO SLIDER -------- */}
      <HeroSlider />

      {/* -------- SEARCH BAR --------- */}
      <SearchBar />

      {/* ------- CATEGORY CARDS ------- */}
      <CategoryCards />

      {/* ------ MAIN RECIPE LIST ------ */}
      <RecipeCard recipesToShow={recipesToShow} isLoading={isLoading} />
    </div>
  );
};

export default Recipe;
