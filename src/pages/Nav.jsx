import { NavLink } from "react-router-dom";

const Nav = ({ isOpen, setIsOpen }) => {

  // Helper to keep NavLink classes clean
  const navLinkClass = ({ isActive }) =>
    `flex items-center ${isOpen || "lg:block" ? "justify-start" : "justify-center"} py-2 px-4 rounded-2xl font-medium transition-colors ${
      isActive ? "bg-amber-100/20 dark:bg-amber-500/20 text-white" : "hover:bg-white/10"
    }`;

  return (
    <div className="relative text-2xl">
      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-0 h-screen bg-[#940D0D] dark:bg-[#1a0202] text-white rounded-tr-md flex flex-col transition-all duration-300 shadow-2xl z-999 ${
          isOpen ? "w-64" : "w-12"
        } lg:w-72`} // LG stays wide, mobile/md toggles
      >
        {/* Top Header / Logo Section */}
        <div className="h-24 flex items-center pr-4 overflow-hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 hover:bg-white/10 rounded-full lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          >
            <div
              className={`w-6 h-0.5  rounded-full transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-2 bg-red-300" : "bg-white"
              }`}
            ></div>

            <div
              className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0 translate-x-2" : "opacity-100"
              }`}
            ></div>

            <div
              className={`w-6 h-0.5  rounded-full transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-2 bg-red-300" : "bg-white"
              }`}
            ></div>
          </button>

          <div
            className={`relative lg:mx-auto transition-all duration-300 ${isOpen || "lg:block" ? "ml-8 opacity-100" : "hidden w-0"}`}
          >
            <img
              className={`h-26`}
              src="https://static.vecteezy.com/system/resources/thumbnails/022/914/755/small_2x/pizza-3d-junk-food-icon-png.png"
              alt="Logo"
            />
            <h1
              className={`absolute bottom-5.5 right-2 skew-12 font-black text-[1.4rem] text-[#940D0D] ${isOpen ? "ml-8 opacity-100" : "hidden w-0"}`}
            >
              MetaKitchen
            </h1>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="grow space-y-4 mt-10">
          <NavItem
            to="/"
            icon="ri-home-5-line"
            label="Home"
            isOpen={isOpen}
            className={navLinkClass}
          />
          <NavItem
            to="/recipe"
            icon="ri-bowl-line"
            label="Recipes"
            isOpen={isOpen}
            className={navLinkClass}
          />
          <NavItem
            to="/createRecipe"
            icon="ri-restaurant-line"
            label="Create Recipe"
            isOpen={isOpen}
            className={navLinkClass}
          />
        </div>

        {/* Footer Navigation */}
        <div className="pb-10 space-y-2">
          <hr className="border-white/20 mb-4" />
          <NavItem
            to="/fav"
            icon="ri-star-fill"
            label="Favorites"
            isOpen={isOpen}
            className={navLinkClass}
          />
          <NavItem
            to="/setting"
            icon="ri-settings-3-line"
            label="Settings"
            isOpen={isOpen}
            className={navLinkClass}
          />
          <NavItem
            to="/myAccount"
            icon="ri-account-circle-line"
            label="My Account"
            isOpen={isOpen}
            className={navLinkClass}
          />
        </div>
      </div>
    </div>
  );
};

// Small sub-component to keep code DRY
const NavItem = ({ to, icon, label, isOpen, className }) => (
  <NavLink to={to} className={className}>
    <i className={`${icon} text-xl min-h-8 text-center transition-discrete duration-1000`}></i>
    <span
      className={`ml-3 transition-opacity duration-300 whitespace-nowrap lg:opacity-100 ${isOpen ? "opacity-100 block" : "opacity-0 hidden lg:block"}`}
    >
      {label}
    </span>
  </NavLink>
);

export default Nav;
