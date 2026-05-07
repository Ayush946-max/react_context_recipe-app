import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { rc } from "../context/RecipeContext";
import { toast } from "react-toastify";
import UpdateForm from "./UpdateForm";

const RecipeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location.state?.from;
  const { id } = useParams();

  const { data, setData, favorite, setFavorite, allData, setAllData } = useContext(rc);
  const recipe = data.find((r) => r?.id == Number(id));
  const isFavorite = favorite.some((f) => f.id === Number(id));

  const [steps, setSteps] = useState(recipe?.instructions || []);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(recipe?.mealType || "Breakfast");
  const [showForm, setShowForm] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const favHandler = () => {
    if (!isFavorite) {
      const newFav = [...favorite, recipe];
      setFavorite(newFav);
      localStorage.setItem("fav", JSON.stringify(newFav));
      toast.success("Added to Favorites ☺️");
    }
  };

  const unfavHandler = () => {
    const filteredFav = favorite.filter((f) => f.id !== Number(id));
    setFavorite(filteredFav);
    toast.error("Remove from Favorites 🙂");
    localStorage.setItem("fav", JSON.stringify(filteredFav));
    if (comingFrom === "favorite") navigate("/fav");
  };

  const deleteHandler = () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    const filtered = allData.filter((r) => String(r.id) !== String(id));

    setData(filtered); 
    setAllData(filtered);
    localStorage.setItem("recipes", JSON.stringify(filtered));
    toast.error("Recipe Deleted!");
    navigate("/recipe");
  };

  if (!recipe)
    return (
      <p className="text-center my-10 text-red-600/70 text-xl font-bold">
        Recipe not found!
      </p>
    );

  return (
    <div className="relative animate-fadeIn min-h-screen bg-yellow-100/70 dark:bg-[#121212] p-4 md:p-8 lg:px-12 space-y-6">
      {/* Header */}
      <div className="mx-auto max-w-6xl bg-orange-200/90 dark:bg-zinc-800/90 backdrop-blur-lg rounded-3xl p-5 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-orange-300/30">
        <div className="space-y-1 lg:space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black uppercase text-gray-800 dark:text-zinc-100 tracking-tight">
            {recipe?.name}
          </h1>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
              recipe?.cuisine,
              ...(Array.isArray(recipe?.mealType)
                ? recipe.mealType
                : [recipe?.mealType]),
            ].map((tag, i) => (
              <span
                key={i}
                className="px-6 py-1.5 text-lg md:text-xl border border-orange-700/20 rounded-full text-white tracking-wide bg-orange-600 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {recipe?.image && (
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50">
            <img
              src={recipe?.image}
              alt={recipe?.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Sticky Action Bar for Mobile */}
      <div className="sticky top-0 z-30 flex justify-between items-center gap-3 bg-white/40 dark:bg-black/10 backdrop-blur-md p-3 rounded-2xl md:relative md:bg-transparent md:p-0">
        <button
          onClick={() =>
            comingFrom === "favorite" ? navigate("/fav") : navigate("/recipe")
          }
          className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800/90 border border-gray-300 text-gray-700 dark:text-zinc-100 text-2xl hover:bg-gray-800 hover:text-white transition shadow-sm active:scale-95"
        >
          <i className="ri-arrow-left-line mr-2 text-base"></i> Back
        </button>

        <button
          onClick={isFavorite ? unfavHandler : favHandler}
          className={`px-6 py-2 rounded-xl transition shadow-sm active:scale-95 ${
            isFavorite
              ? "bg-amber-700 text-white"
              : "bg-white border border-amber-700 text-amber-700"
          }`}
        >
          <i className={isFavorite ? "ri-star-fill" : "ri-star-line"} />
        </button>
      </div>

      {/* Info Grid - Changed to 1 col on small mobile, 2 on tablet, 3 on large desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto dark:text-zinc-300">
        {/* Ingredients */}
        <div className="lg:col-span-2 border rounded-3xl p-6 bg-white/80 dark:bg-zinc-800/90 backdrop-blur-md shadow-sm border-white">
          <p className="font-black text-3xl mb-4 border-b pb-2 border-orange-100 flex items-center gap-2">
            <i className="ri-restaurant-line text-orange-600"></i> Ingredients
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 dark:text-zinc-300">
            {recipe?.ingredients.map((ing, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xl md:text-2xl mt-1"
              >
                <span className="text-orange-500">•</span> {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* MetaData */}
        <div className="border rounded-3xl p-6 bg-white/80 dark:bg-zinc-800/90 backdrop-blur-md shadow-sm border-white space-y-4">
          <p className="font-black text-3xl mb-4 border-b pb-2 border-orange-100">
            Details -
          </p>
          <div className="space-y-3">
            {[
              { label: "Prep", value: `${recipe?.prepTimeMinutes}m` },
              { label: "Cook", value: `${recipe?.cookTimeMinutes}m` },
              { label: "Serves", value: recipe?.servings },
              { label: "Difficulty", value: recipe?.difficulty },
              {
                label: "Calories",
                value: `${recipe?.caloriesPerServing} kcal`,
              },
              { label: "Rating", value: `⭐ ${recipe?.rating}` },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-xl md:text-2xl border-b border-gray-50 pb-1"
              >
                <span className="text-gray-500 dark:text-zinc-300 font-medium">
                  {item.label}
                </span>
                <span className="font-bold text-gray-800 dark:text-zinc-200">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions - Fixed the alternating text alignment issue */}
      <div className="max-w-6xl mx-auto border rounded-3xl p-6 md:p-6 md:px-10 bg-white/80 dark:bg-zinc-800/50 border-white dark:border-zinc-700 backdrop-blur-md shadow-md space-y-8">
        <p className="font-black text-3xl text-center text-gray-800 dark:text-zinc-300 border-b border-orange-100 pb-3">
          Cooking Steps
        </p>
        <div className="space-y-12">
          {recipe?.instructions.map((ins, idx) => (
            <div
              key={idx}
              className={`flex flex-col md:flex-row md:items-center gap-6 ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-orange-500 dark:bg-orange-700 text-white rounded-full text-3xl shadow-lg">
                {idx + 1}
              </div>
              <div
                className={`flex-1 ${idx % 2 !== 0 ? "md:text-right" : "text-left"}`}
              >
                <h2 className="font-semibold text-3xl mb-2 text-orange-700 dark:text-orange-500 uppercase tracking-tighter">
                  Step {idx + 1}
                </h2>
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed text-xl md:text-2xl">
                  {ins}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="max-w-6xl mx-auto flex justify-center md:justify-end gap-4 pb-10">
        <button
          onClick={deleteHandler}
          className="flex-1 md:flex-none px-5 py-3 rounded-2xl dark:border border-2 border-red-600 text-red-600 text-2xl hover:bg-red-600 hover:text-white transition active:scale-95"
        >
          Delete Recipe
        </button>
        <button
          onClick={() => setShowForm(true)}
          className="flex-1 md:flex-none px-5 py-3 rounded-xl dark:border border-2 border-green-700 text-green-700 text-2xl hover:bg-green-700 hover:text-white transition"
        >
          Update Recipe
        </button>
      </div>

      {/* Update Modal */}
      {(showForm || isClosing) && (
        <UpdateForm
          id={id}
          isClosing={isClosing}
          setIsClosing={setIsClosing}
          steps={steps}
          setSteps={setSteps}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setShowForm={setShowForm}
          data={data}
          allData={allData}
          setData={setData}
          selected={selected}
          recipe={recipe}
        />
      )}
    </div>
  );
};

export default RecipeDetails;
