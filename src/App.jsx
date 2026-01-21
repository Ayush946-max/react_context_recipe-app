import { useRef } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Nav from "./pages/Nav";
import { Outlet } from "react-router-dom";


const App = () => {
  const scrollRef = useRef(null);

  return (
    <div className="flex h-screen w-screen bg-gray-700">
      <ScrollToTop scrollRef={scrollRef} />

      <div className="w-80">
        <Nav />
      </div>

      {/* 👇 THIS is the scroll container */}
      <div
        ref={scrollRef}
        className="flex-1 bg-[#F8F8F8] overflow-y-auto rounded-tl-md"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default App;
