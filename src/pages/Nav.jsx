import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <div className="fixed w-80 bg-[#940D0D] text-white h-screen rounded-tr-md flex flex-col justify-around">
        <div className="mb-10 ">
          <img
            className="h-20 m-auto pr-10 py-1"
            src="https://www.svgrepo.com/show/492596/food.svg"
            alt="Logo"
          />
        </div>
        <div className="mx-5 flex flex-col gap-5 mb-50">
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-amber-100/20 p-1.5 rounded-2xl font-medium"
                : "font-medium p-1.5"
            }
            to="/"
          >
            <i className="ri-home-5-line px-4 text-2xl"></i> Home
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-amber-100/20 p-1.5 rounded-2xl font-medium"
                : "font-medium p-1.5"
            }
            to="/recipe"
          >
            <i className="ri-bowl-line px-4 text-2xl"></i> Recipes
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-amber-100/20 p-1.5 rounded-2xl font-medium"
                : "font-medium p-1.5"
            }
            to="/createRecipe"
          >
            <i className="ri-restaurant-line px-4 text-2xl"></i> Create Recipe
          </NavLink>
        </div>
        <div className="mx-5 flex flex-col gap-2 my-10">
          <hr />
          <NavLink
            className={(e) =>
              e.isActive
                ? "bg-amber-100/20 p-1.5 rounded-2xl font-medium"
                : "font-medium p-1.5"
            }
            to="/fav"
          >
            <i className="ri-star-fill px-4 text-2xl"></i> Favorites
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive ? "bg-amber-100/20 p-1.5 rounded-2xl" : "p-1.5"
            }
            to="/setting"
          >
            <i className="ri-settings-3-line px-4 text-2xl"></i> Setting
          </NavLink>
          <NavLink
            className={(e) =>
              e.isActive ? "bg-amber-100/20 p-1.5 rounded-2xl" : "p-1.5"
            }
            to="/myAccount"
          >
            <i className="ri-account-circle-line px-4 text-2xl"></i> My Account
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Nav;
