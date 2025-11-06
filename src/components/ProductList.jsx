import ProductItem from "./ProductItem.jsx";
import { useReducer } from "react";

const initialState = [
  { productName: "Leek", quantity: 2 },
  { productName: "Broccoli", quantity: 5 },
];
const catalogue = [
  {
    name: "Broccoli",
    stock: 5,
    price: 1.5,
    category: "vegetable",
  },
  { name: "Golden Kiwi", stock: 8, price: 1.85, category: "fruit" },
  { name: "Croissant", stock: 20, price: 1.1, category: "bread" },
  { name: "Leek", stock: 4, price: 0.9, category: "vegetable" },
];

function reducer(state, action) {
  switch (action.type) {
    // Add a new object with the action.payload being the name of the product to the shopping cart state array
    case "add_product":
      return [...state, { productName: action.payload, quantity: 1 }];
    case "increase_quantity": {
      // Iterates through the shopping cart state array to find a match for a specific product, e.g. apple
      const newState = state.map((product) => {
        if (product.productName === action.payload) {
          // Updates the quantity of the desired product
          return {
            productName: product.productName,
            quantity: product.quantity + 1,
          };
          // For all items in the shopping cart array, dont do any changes
        } else {
          return product;
        }
      });
      // return the new state of the shopping cart with quantity increased for a specific product
      return newState;
    }

    default:
      return state;
  }
}

function ProductList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Adds a new object of a product to the shopping cart state
  function handleAddToCart() {
    dispatch({ type: "add_product", payload: "apple" });
  }

  // Increases quantity of existing products in the shopping cart state
  function handleIncreaseQuantity(product) {
    dispatch({ type: "increase_quantity", payload: product });
  }

  return (
    <>
      {catalogue.map((food) => (
        <ProductItem
          name={food.name}
          stock={food.stock}
          price={food.price}
          handleClick={() => handleIncreaseQuantity(food.name)}
        ></ProductItem>
      ))}
      <div>You have {state[0]?.quantity} apples in your cart!</div>
    </>
  );
}

export default ProductList;
