import { useState } from "react";

function Cart() {
  const [quantityInput, setQuantityInput] = useState(1);
  const [productCost, setProductCost] = useState(5);

  function handleQuantity(e) {
    if (e.target.value < 0) {
      setQuantityInput(0);
    } else {
      setQuantityInput(e.target.value);
    }
  }

  const totalCost = productCost * quantityInput;
  return (
    <>
      <h2>Shopping Cart:</h2>
      <div className="shopping-cart">
        <div className="product-column">
          <h3>Product:</h3>
          <div className="product-cart-item">
            <span>Apple</span>
            <span>-</span>
          </div>
        </div>
        <div className="price-column">
          <h3>Price:</h3>
          <span>£{productCost}</span>
        </div>
        <div className="quantity-column">
          <h3>Quantity:</h3>
          <input
            onChange={handleQuantity}
            type="number"
            value={quantityInput}
            min="0"
          />
        </div>
        <div className="total-column">
          <h3>Total Price:</h3>
          <span>£{totalCost}</span>
        </div>
      </div>
    </>
  );
}

export default Cart;
