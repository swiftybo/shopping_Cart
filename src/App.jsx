import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { FoodProvider } from "./contexts/FoodContext";

function App() {
  return (
    <>
      <FoodProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
          </Routes>
        </BrowserRouter>
      </FoodProvider>
    </>
  );
}

export default App;
