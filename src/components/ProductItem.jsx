function ProductItem({ name, stock, price, category }) {
  return (
    <>
      <h3>{name}</h3>
      <div>Stock: {stock}</div>
      <div>{price}</div>
    </>
  );
}

export default ProductItem;
