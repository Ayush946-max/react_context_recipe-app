// ==================== CategoryCards.jsx ====================
import { useContext, useState } from "react";
import { rc } from "../context/RecipeContext";

const CategoryCards = () => {
  const { updateFilter, filters, resetFilter } = useContext(rc);

  const [cards] = useState([
    {
      image:
        "https://images.unsplash.com/photo-1560788843-f7bee7cfe087?auto=format&fit=crop&q=60&w=600",
      title: "Breakfast",
    },
    {
      image:
        "https://images.unsplash.com/photo-1608582037152-adefa9decb70?auto=format&fit=crop&q=60&w=600",
      title: "Snacks",
    },
    {
      image: "https://cdn.dummyjson.com/recipe-images/15.webp",
      title: "Lunch",
    },
    {
      image: "https://cdn.dummyjson.com/recipe-images/7.webp",
      title: "Appetizer",
    },
    {
      image:
        "https://images.unsplash.com/photo-1571809839227-b2ac3d261257?auto=format&fit=crop&q=60&w=600",
      title: "Dinner",
    },
    {
      image:
        "https://images.unsplash.com/photo-1675227977042-a572dac762be?auto=format&fit=crop&q=60&w=600",
      title: "Dessert",
    },
    {
      image:
        "https://imgs.search.brave.com/ACU5tZuaH75QjD6I3neef1mwklXXNzhLkA2BmtBlK4w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDkv/MTg3Lzc0NS9zbWFs/bC9zYXZvcmluZy1s/dXh1cnktZ291cm1l/dC1jaG9jb2xhdGUt/ZHJpbmtzLWV4cXVp/c2l0ZWx5LXByZXNl/bnRlZC1pbi1hLW1v/ZGVybi1jYWYtYmF0/aGVkLWluLW5hdHVy/YWwtc3VubGlnaHQt/cGhvdG8uanBn",
      title: "Beverage",
    },
  ]);

  const catHandler = (category) => {
    // If clicking the same category, toggle it off
    if (filters.category === category) {
      resetFilter("category");
    } else {
      updateFilter("category", category);
    }
  };

  return (
    <div className="mx-5 my-10 flex items-center justify-evenly flex-wrap gap-4">
      {cards.map((item, index) => (
        <div
          onClick={() => catHandler(item.title)}
          key={index}
          className="text-center cursor-pointer group"
        >
          <div
            className={`w-[6em] h-[5em] overflow-hidden rounded-2xl border-2 transition-all ${
              filters.category === item.title
                ? "border-amber-600 shadow-lg shadow-amber-600/50 scale-110"
                : "border-amber-600/40 hover:border-amber-600"
            }`}
          >
            <img
              className="w-full h-full object-cover rounded-2xl group-hover:scale-125 transition-transform duration-500"
              src={item.image}
              alt={item.title}
            />
          </div>
          <h5
            className={`mt-2 font-medium transition-colors ${
              filters.category === item.title
                ? "text-amber-700 font-bold"
                : "text-gray-700"
            }`}
          >
            {item.title}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
