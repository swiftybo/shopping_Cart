import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage";

function App() {
  return (
    <>
      <HomePage></HomePage>
      <h1 className="header_name sixtyfour">Almighty's</h1>
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
