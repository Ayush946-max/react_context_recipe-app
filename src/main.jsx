import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import RecipeContext from "./context/RecipeContext.jsx";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <RecipeContext>
    <BrowserRouter>
      <AppRoutes /> <ToastContainer position="top-right" autoClose={800} />
    </BrowserRouter>
  </RecipeContext>
);
