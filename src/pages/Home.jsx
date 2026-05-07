import { useNavigate } from "react-router-dom";

const Home = ({ }) => {
  const navigate = useNavigate();

  return (
    <div className="gap-4 text-white animate-fadeIn">
      <div className=" text-black bg-amber-100 dark:bg-zinc-950 h-screen p-10 overflow-hidden flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="mt-8 lg:mt-15 text-5xl md:text-7xl lg:text-8xl dark:text-white/90 font-bold lg:leading-22 uppercase max-w-2xl">
            Authentic Pad Thai Recipe
          </h1>
          <h5 className="mb-5 text-gray-500 uppercase tracking-wide text-lg md:text-2xl">
            where spice meets sweetness, the soul finds home
          </h5>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
            {["Location", "Time-Taken", "Serving-Size", "Difficulty"].map(
              (label) => (
                <button
                  key={label}
                  className="bg-amber-500 dark:bg-amber-700 px-4 py-2 rounded-xl shadow-md shadow-gray-700/30 text-lg lg:text-xl font-semibold tracking-wide hover:bg-amber-600 transition"
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <button
            onClick={() => navigate("/recipe")}
            className="bg-[#940D0D] dark:bg-[#4a0202] text-white px-6 py-3 rounded-full text-2xl lg:font-semibold tracking-wide hover:bg-[#780a0a] transition duration-300 active:scale-95 shadow-lg"
          >
            Get Started
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-between min-h-[400px] mt-10 lg:mt-0">
          <div
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[300px] lg:h-[300px] cursor-pointer"
            onClick={() => navigate("/recipe")}
          >
            <img
              className="rounded-full w-full h-full object-cover rotate-16 hover:scale-105 transition-transform duration-500"
              src="https://static.vecteezy.com/system/resources/thumbnails/057/190/205/small_2x/mouthwatering-fast-food-burger-with-sesame-bun-ideal-for-restaurant-branding-free-png.png"
              alt="Pad Thai"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/createRecipe");
            }}
            className="mt-10 lg:mt-20 bg-amber-400/90 dark:bg-amber-700 px-6 py-3 text-xl md:text-3xl lg:text-4xl font-bold tracking-wide uppercase rounded-3xl shadow-md shadow-neutral-900/40 active:scale-95 transition hover:bg-amber-500 flex items-center gap-4"
          >
            click to start cooking
            <i className="ri-logout-circle-r-line text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
