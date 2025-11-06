import { createContext, useContext } from "react";

const FoodContext = createContext();

function FoodProvider({ children }) {
  return <FoodContext.Provider>{children}</FoodContext.Provider>;
}

function useFood() {
  const context = useContext(FoodContext);

  if (context === undefined) {
    throw new Error("You used the FoodContext out of the FoodContext Provider");
  }

  return context;
}

export { useFood, FoodProvider };
