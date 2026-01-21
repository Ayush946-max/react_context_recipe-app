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

  const options = [
    "Breakfast",
    "Lunch",
    "Meal",
    "Dinner",
    "Snacks",
    "Desserts",
    "Drinks",
  ];

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
    <div className="relative animate-fadeIn min-h-screen bg-yellow-100/70 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-orange-200/90 backdrop-blur-lg rounded-3xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-3 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold uppercase text-gray-800">
            {recipe?.name}
          </h1>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
              recipe?.cuisine,
              Array.isArray(recipe?.mealType)
                ? recipe?.mealType.join(", ")
                : recipe?.mealType,
            ].map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1 text-md border border-gray-300 rounded-xl text-white font-medium bg-orange-600/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {recipe?.image && (
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md">
            <img
              src={recipe?.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center gap-3">
        <button
          onClick={() =>
            comingFrom === "favorite" ? navigate("/fav") : navigate("/recipe")
          }
          className="px-5 py-2 rounded-xl border text-gray-700 hover:bg-gray-800 hover:text-white transition"
        >
          Back
        </button>

        <button
          onClick={isFavorite ? unfavHandler : favHandler}
          className={`px-4 py-2 rounded-xl transition ${
            isFavorite
              ? "bg-amber-700 text-white hover:bg-amber-800"
              : "border border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white"
          }`}
        >
          <i className={isFavorite ? "ri-star-fill" : "ri-star-line"} />
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ingredients */}
        <div className="border rounded-2xl p-4 bg-white/60 backdrop-blur-md shadow-sm">
          <p className="font-bold text-center mb-3">Ingredients</p>
          <ul className="space-y-1 text-sm text-gray-700">
            {recipe?.ingredients.map((ing, idx) => (
              <li key={idx} className="list-disc list-inside">
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* MetaData */}
        <div className="border rounded-2xl p-5 bg-white/60 backdrop-blur-md shadow-sm space-y-4">
          <p className="font-bold text-center text-lg text-gray-800">
            Meta Data
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-500">Prep Time</span>
              <span className="font-medium">{recipe?.prepTimeMinutes} min</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Cook Time</span>
              <span className="font-medium">{recipe?.cookTimeMinutes} min</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Servings</span>
              <span className="font-medium">{recipe?.servings}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Difficulty</span>
              <span className="font-medium">{recipe?.difficulty}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Calories</span>
              <span className="font-medium">
                {recipe?.caloriesPerServing} kcal
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Rating</span>
              <span className="font-medium flex items-center gap-1">
                ⭐ {recipe?.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-2xl p-4 md:p-6 bg-white backdrop-blur-md shadow-md space-y-6">
        <p className="font-bold text-center text-2xl shadow-xl p-4 rounded-2xl">
          Instructions
        </p>

        {recipe?.instructions.map((ins, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row rounded-xl ${
              idx % 2 !== 0 ? "md:flex-row-reverse text-right" : ""
            }`}
          >
            <div className="w-full text-gray-950">
              <h2 className="font-semibold mb-1">Step {idx + 1}</h2>
              <p className="text-sm leading-relaxed">{ins}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={deleteHandler}
          className="px-5 py-2 rounded-xl border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
        >
          Delete
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-2 rounded-xl border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
        >
          Update
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
