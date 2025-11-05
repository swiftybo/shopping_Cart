import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="cart" element={<ShoppingCartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
