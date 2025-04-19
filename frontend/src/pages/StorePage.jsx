import React, { useEffect, useState } from "react";
import { getProducts } from "../services/products.services";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const StorePage = () => {
  const { storeId } = useParams();
  const [productsData, setProductsData] = useState(null);
  const [addedMessage, setAddedMessage] = useState("");
  const { addToCart } = useCart();

  const getProductsList = async () => {
    const response = await getProducts(storeId);
    const data = await response.json();
    if (response.status === 200) {
      setProductsData(data);
    } else {
      console.log("Error fetching products:", data);
    }
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMessage(`${product.name} added to cart!`);
    setTimeout(() => setAddedMessage(""), 2500);
  };

  if (!productsData) return <div className="p-6">Loading...</div>;

  const { store, products } = productsData;

  return (
    <div className="flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
        {store.name} - Products
      </h1>

      {addedMessage && (
        <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded border border-green-300 text-center w-full max-w-md">
          {addedMessage}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-md transition w-64 text-center"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <p className="text-sm text-gray-400">
              Available: {product.quantity}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
