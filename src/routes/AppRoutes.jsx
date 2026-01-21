import { Route,Routes } from "react-router-dom"
import Recipe from "../pages/Recipe"
import Home from "../pages/Home"
import App from "../App"
import RecipeDetails from "../components/RecipeDetails"
import CreateRecipe from "../pages/CreateRecipe"
import WildCard from "../components/WildCard"
import Fav from "../pages/Fav"

const AppRoutes = () => {

  return (
        <div >
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path='/recipe' element={<Recipe />} />
            <Route path='/recipe/details/:id' element={<RecipeDetails />} />
            <Route path='/createRecipe' element={<CreateRecipe />} />
            <Route path='/fav' element={<Fav />} />
            {/* <Route path='/setting' element={<Setting />} />
            <Route path='/myAccount' element={<MyAccount />} /> */}
            <Route path='*' element={<WildCard />} />
          </Route>
        </Routes>
    </div>
  )
}

export default AppRoutes