import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateForm = (props) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const {
    id,
    isClosing,
    setIsClosing,
    setShowForm,
    allData,
    setData,
    // Original data passed as props for initial values
    recipe,
  } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: recipe?.name,
      image: recipe?.image,
      prepTimeMinutes: recipe?.prepTimeMinutes,
      cookTimeMinutes: recipe?.cookTimeMinutes,
      servings: recipe?.servings,
      difficulty: recipe?.difficulty,
      cuisine: recipe?.cuisine,
      ingredients: recipe?.ingredients, // Array of strings
      instructions: recipe?.instructions, // Array of strings
    },
  });

  // Dynamic field handlers for Ingredients and Instructions
  const {
    fields: ingFields,
    append: appendIng,
    remove: removeIng,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: insFields,
    append: appendIns,
    remove: removeIns,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setIsClosing(false);
    }, 300);
  };

  const updateHandle = async (updatedFields) => {
    // Check if any changes were made
    // const isChanged = Object.keys(dirtyFields).length > 0;

    // if (!isChanged) {
    //   toast.error("No changes made to update!");
    //   return;
    // }

    // Ensure numeric fields are actually numbers
    const formattedData = {
      ...updatedFields,
      prepTimeMinutes: Number(updatedFields.prepTimeMinutes),
      cookTimeMinutes: Number(updatedFields.cookTimeMinutes),
      servings: Number(updatedFields.servings),
    };

    const index = allData?.findIndex((r) => r.id === Number(id));
    const newData = [...allData];

    // Merge existing metadata (like rating/userId) with updated fields
    newData[index] = { ...newData[index], ...formattedData };

    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async operation

    setData(newData);
    localStorage.setItem("recipes", JSON.stringify(newData));

    toast.success("Recipe Updated!");
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4 ${
        isClosing ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      {recipe?.image && (
        <img
          src={recipe?.image}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imgLoaded && !isClosing ? "opacity-100" : "opacity-0"
          } ${isClosing ? "animate-fadeOut" : ""}`}
          alt=""
        />
      )}
      <div className="absolute inset-0 backdrop-blur-md bg-amber-100/10" />

      <div className="relative bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-100">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-2xl transition-colors"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center">
          Update Recipe 🍕
        </h1>

        <form onSubmit={handleSubmit(updateHandle)} className="space-y-6">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-amber-700 ml-2">
                Recipe Name
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full p-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-amber-700 ml-2">
                Image URL
              </label>
              <input
                {...register("image")}
                className="w-full p-3 border rounded-xl"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="number"
              {...register("prepTimeMinutes")}
              placeholder="Prep Min"
              className="p-3 border rounded-xl"
              onWheel={(e) => e.target.blur()}
            />
            <input
              type="number"
              {...register("cookTimeMinutes")}
              placeholder="Cook Min"
              className="p-3 border rounded-xl"
              onWheel={(e) => e.target.blur()}
            />
            <input
              type="number"
              {...register("servings")}
              placeholder="Servings"
              className="p-3 border rounded-xl"
              onWheel={(e) => e.target.blur()}
            />
            <select
              {...register("difficulty")}
              className="p-3 border rounded-xl"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Ingredients Section */}
          <div className="p-4 bg-amber-50 rounded-2xl">
            <h2 className="font-bold text-amber-800 mb-2">Ingredients</h2>
            {ingFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input
                  {...register(`ingredients.${index}`)}
                  className="flex-1 p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeIng(index)}
                  className="text-red-400 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendIng("")}
              className="text-sm font-bold text-amber-600"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions Section */}
          <div className="p-4 bg-orange-50 rounded-2xl">
            <h2 className="font-bold text-orange-800 mb-2">Instructions</h2>
            {insFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <textarea
                  {...register(`instructions.${index}`)}
                  className="flex-1 p-2 border rounded-lg h-20"
                />
                <button
                  type="button"
                  onClick={() => removeIns(index)}
                  className="text-red-400 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendIns("")}
              className="text-sm font-bold text-orange-600"
            >
              + Add Step
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || Object.keys(dirtyFields).length === 0}
            className={`w-full py-3 font-bold rounded-2xl transition-all 
            ${Object.keys(dirtyFields).length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
