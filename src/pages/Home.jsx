import { useNavigate } from "react-router-dom";

const Home = ({ }) => {
  const navigate = useNavigate();

  return (
    <div className="gap-4 text-white animate-fadeIn">
      <div className=" text-black bg-amber-100 h-screen rounded-tl-4xl p-10 overflow-hidden flex justify-between">
        <div>
          <h1 className="ml-5 mt-15 text-6xl w-130 leading-20 uppercase">
            Authentic Pad Thai Recipe
          </h1>
          <h5 className="ml-5 my-6 text-gray-500 uppercase font-medium tracking-wide">
            where spice meets sweetness, the soul finds home
          </h5>
          <button className="bg-amber-500 px-3 py-2 rounded-xl mx-5 shadow-lg shadow-gray-700/60">
            Location
          </button>
          <button className="bg-amber-500 px-3 py-2 rounded-xl mx-5 shadow-lg shadow-gray-700/60">
            Time-Taken
          </button>
          <button className="bg-amber-500 px-3 py-2 rounded-xl mx-5 shadow-lg shadow-gray-700/60">
            Serving-Size
          </button>
          <br />
          <br />
          <button className="bg-amber-500 px-3 py-2 rounded-xl mx-5 shadow-lg shadow-gray-700/60">
            Difficulty
          </button>
          <br />
          <br />
          <button
            onClick={() => navigate("/recipe")}
            className="m-5 bg-[#940D0D] text-white px-6 py-3 rounded-full font-medium hover:bg-[#780a0a] transition duration-300 active:scale-95"
          >
            Get Started
          </button>
        </div>
        <div
          onClick={() => navigate("/recipe")}
          className="flex flex-col items-end justify-between"
        >
          <img
            className="rounded-full w-1/2 shadow-lg shadow-gray-700/60"
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfDJ8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
            alt=""
          />
          <button
            onClick={() => navigate("/createRecipe")}
            className="mt-20 ml-45 bg-amber-400/80 px-5 py-2 text-2xl font-medium uppercase rounded-2xl shadow-md shadow-neutral-900/60 active:scale-95 transition hover:bg-amber-500"
          >
            swipe to start cooking
            <i className="ri-logout-circle-r-line ml-5"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
