import ProductItem from "./ProductItem.jsx";

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

function ProductList() {
  return (
    <>
      {catalogue.map((food) => (
        <ProductItem
          name={food.name}
          stock={food.stock}
          price={food.price}
        ></ProductItem>
      ))}
    </>
  );
}

export default ProductList;
