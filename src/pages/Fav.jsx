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
    <div className="flex flex-wrap justify-center gap-6 p-6 animate-fadeIn">
      {favorite.length === 0 ? (
        <p className="text-center my-10 text-red-600/90 text-4xl font-bold animate-fadeIn">
          No Recipes Found in Favorites.
        </p>
      ) : (
        favorite.map((recipe) => (
          <div
            key={recipe.id}
            className="w-65 min-h-90 bg-amber-100 border border-amber-700/40 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <NavLink
              to={`/recipe/details/${recipe.id}`}
              state={{ from: "favorite" }}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt="Not accessible, please upload another image"
                  className="w-30 h-30 object-cover rounded-full mx-auto shadow-xl mt-5 hover:shadow-2xl transition-transform duration-1000"
                />
              )}

              <div className="py-4">
                <h3 className="text-lg font-bold text-black mb-5 text-center">
                  {recipe.name}
                </h3>

                <div className="flex justify-around items-center text-sm text-gray-500 my-2">
                  <p className="text-sm text-gray-600">
                    {recipe?.mealType?.map((meal) => (
                      <span key={meal} className="mr-1">
                        {`${mealIcons[meal] || "🍟"} ${meal}`}
                      </span>
                    ))}
                  </p>

                  <p className="text-sm">{recipe.rating} ⭐</p>
                </div>
              </div>
            </NavLink>

            <button
              onClick={() => unfavHandeler(recipe.id)}
              className="block mx-auto py-2 px-6 bg-orange-400/70 hover:bg-amber-600 font-semibold rounded-full transition-all"
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
