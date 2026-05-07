import { useContext, useRef, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./pages/Nav";
import { Outlet } from "react-router-dom";
import { rc } from "./context/RecipeContext";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef(null);
  const { isDark } = useContext(rc);

  return (
    <div
      className={`${isDark ? "dark" : ""} flex h-screen w-screen bg-white dark:bg-[#0f0f0f]`}
    >
      <ScrollToTop scrollRef={scrollRef} />

      <div className={`${isDark ? "dark" : ""} w-12 lg:w-72`}>
        <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div
        ref={scrollRef}
        className={`${isDark ? "dark" : ""} flex-1 bg-[#F8F8F8] dark:bg-[#0f0f0f] overflow-y-auto rounded-tl-md`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
