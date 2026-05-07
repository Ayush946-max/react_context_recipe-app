import { useContext } from "react";
import { rc } from "../context/RecipeContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Fav = () => {
  const { favorite, setFavorite } = useContext(rc);

  const mealIcons = {
    Breakfast: "🥞",
    Lunch: "🍜",
    Meal: "🍝",
    Dinner: "🍛",
    Desserts: "🍩",
    Beverage: "🍸",
  };

  const unfavHandeler = (rId) => {
    toast.error("Remove from Favorites 🙂");
    const filterFav = favorite.filter((f) => f.id !== rId);
    setFavorite(filterFav);
    localStorage.setItem("fav", JSON.stringify(filterFav));
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1.5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-4 md:pt-10 justify-items-center">
      {favorite.length === 0 ? (
        <div className="col-span-full text-center mt-20">
          <p className="text-gray-400 text-5xl mb-4">🔍</p>
          <p className="text-gray-600 text-lg font-medium">Recipe not Found</p>
        </div>
      ) : (
        favorite.map((recipe) => (
          <div
            key={recipe.id}
            /* Width becomes 'w-full' so it fills its assigned grid cell */
            className="w-full max-w-[280px] min-h-[380px] bg-amber-100 dark:bg-zinc-900 border border-amber-700/40 dark:border-zinc-700 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* NavLink and Button content stays exactly as you had it */}
            <NavLink
              to={`/recipe/details/${recipe.id}`}
              state={{ from: "recipe" }}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto shadow-xl mt-5 hover:scale-105 transition-transform duration-500"
                />
              )}

              <div className="pt-4 px-3 text-center">
                <h3 className="text-3xl font-bold text-black dark:text-zinc-100 line-clamp-2 min-h-14 flex items-center justify-center">
                  {recipe.name}
                </h3>

                <div className="flex justify-around items-center text-xl text-gray-500 dark:text-zinc-400 mt-6">
                  <div className="text-xl text-gray-600 dark:text-zinc-400 line-clamp-1 max-w-[120px]">
                    {recipe?.mealType?.map((meal) => (
                      <span key={meal} className="mr-1 inline-block">
                        {`${mealIcons[meal] || "🍟"} ${meal}`}
                      </span>
                    ))}
                  </div>
                  <p className="text-xl font-bold text-amber-700 dark:text-amber-600">
                    {recipe.rating} ⭐
                  </p>
                </div>
              </div>
            </NavLink>

            <button
              onClick={() => unfavHandeler(recipe.id)}
              className="block bg-orange-400/70 dark:bg-amber-800 hover:bg-amber-600 text-gray-800 dark:text-zinc-100 mx-auto py-2 px-8 mb-5 text-2xl rounded-full transition-all active:scale-95"
            >
              Remove Fav
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Fav;
