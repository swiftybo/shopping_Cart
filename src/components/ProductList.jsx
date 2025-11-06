import ProductItem from "./ProductItem.jsx";
import { useReducer } from "react";

const initialState = [{ productName: "apple", quantity: 2 }];
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
    case "add_product":
      return [...state, { productName: action.payload, quantity: 1 }];
    case "increase_quantity":
      state.map((product) => {
        if (product.productName === action.payload) {
        }
        console.log(`product is still ${product["productName"]}`);

        // Finding index of the productItem object with the name equivalent to action.payload
        const currentProductIndex = state.findIndex(
          (product) => product.productName === "apple"
        );

        // Saving the previous quantity of this productItem in a separate variable
        const previousQuantity = state[currentProductIndex].quantity;

        // Creating new object with updated quantity value
        const updatedProduct = {
          ...state[currentProductIndex],
          quantity: previousQuantity + 1,
        };

        const newState = [...state];
        newState[currentProductIndex] = updatedProduct;
        console.log(newState);

        return newState;
      });

    default:
      return state;
  }

  // (action.type === "add_product") {
  //   return {

  //     apple: state.apple + 1,
  //   };
  // }
  // throw Error("unkown action");
}

function ProductList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAddToCart() {
    dispatch({ type: "add_product", payload: "apple" });
  }

  function handleIncreaseQuantity() {
    dispatch({ type: "increase_quantity", payload: "apple" });
  }

  return (
    <>
      {catalogue.map((food) => (
        <ProductItem
          name={food.name}
          stock={food.stock}
          price={food.price}
          handleClick={handleIncreaseQuantity}
        ></ProductItem>
      ))}
      <div>You have {state[0]?.quantity} apples in your cart!</div>
    </>
  );
}

export default ProductList;
