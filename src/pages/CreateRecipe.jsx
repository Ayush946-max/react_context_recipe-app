import { nanoid } from "nanoid";
import { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { rc } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { setData, allData } = useContext(rc);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ingredients: [""],
      instructions: [""],
      difficulty: "Easy",
      mealType: ["Dinner"],
    },
  });

  // Watch image for the background preview
  const imageUrl = watch("image");

  // Dynamic field handlers
  const { fields: ingFields, append: appendIng } = useFieldArray({
    control,
    name: "ingredients",
  });
  const { fields: insFields, append: appendIns } = useFieldArray({
    control,
    name: "instructions",
  });

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 500));

    // Formatting data to match your JSON structure
    const newRecipe = {
      ...data,
      id: nanoid(),
      prepTimeMinutes: Number(data.prepTimeMinutes),
      cookTimeMinutes: Number(data.cookTimeMinutes),
      servings: Number(data.servings),
      caloriesPerServing: Number(data.caloriesPerServing),
      rating: 0,
      reviewCount: 0,
      userId: Math.floor(Math.random() * 200), // Mock User ID
    };

    const updatedData = [...allData, newRecipe];
    setData(updatedData);
    localStorage.setItem("recipes", JSON.stringify(updatedData));

    toast.success("Recipe Created!");
    reset();
    navigate("/recipe");
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center py-20 overflow-x-hidden">
      {/* Background Preview */}
      {imageUrl && (
        <img
          src={imageUrl}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />
      )}
      <div className="absolute inset-0 backdrop-blur-md bg-amber-100/10" />

      <div className="relative z-10 w-full max-w-3xl p-8 bg-white/90 shadow-2xl rounded-3xl border border-amber-100">
        <h1 className="text-4xl font-bold text-center mb-8 text-amber-800">
          New Recipe 🍕
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Recipe Name (e.g. Margherita Pizza)"
                className="p-3 border rounded-xl"
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              {...register("image")}
              placeholder="Image URL"
              className="p-3 border rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="number"
              {...register("prepTimeMinutes")}
              placeholder="Prep (min)"
              className="p-3 border rounded-xl"
            />
            <input
              type="number"
              {...register("cookTimeMinutes")}
              placeholder="Cook (min)"
              className="p-3 border rounded-xl"
            />
            <input
              type="number"
              {...register("servings")}
              placeholder="Servings"
              className="p-3 border rounded-xl"
            />
            <select
              {...register("difficulty")}
              className="p-3 border rounded-xl bg-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Dynamic Ingredients */}
          <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
            <h2 className="font-bold text-amber-800 mb-3">Ingredients</h2>
            {ingFields.map((field, index) => (
              <input
                key={field.id}
                {...register(`ingredients.${index}`)}
                placeholder="e.g. 2 cups of Flour"
                className="w-full p-2 mb-2 border rounded-lg"
              />
            ))}
            <button
              type="button"
              onClick={() => appendIng("")}
              className="text-sm font-bold text-amber-700"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Dynamic Instructions */}
          <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
            <h2 className="font-bold text-orange-800 mb-3">Instructions</h2>
            {insFields.map((field, index) => (
              <textarea
                key={field.id}
                {...register(`instructions.${index}`)}
                placeholder={`Step ${index + 1}`}
                className="w-full p-2 mb-2 border rounded-lg"
              />
            ))}
            <button
              type="button"
              onClick={() => appendIns("")}
              className="text-sm font-bold text-orange-700"
            >
              + Add Step
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("cuisine")}
              placeholder="Cuisine (e.g. Italian)"
              className="p-3 border rounded-xl"
            />
            <input
              {...register("caloriesPerServing")}
              type="number"
              placeholder="Calories per serving"
              className="p-3 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
          >
            {isSubmitting ? "Saving..." : "Create Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
