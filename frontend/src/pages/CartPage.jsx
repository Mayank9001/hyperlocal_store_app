import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orders.services";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    const res = await placeOrder({
      customerName: name,
      items: cartItems.map(({ _id, quantity }) => ({
        productId: _id,
        quantity,
      })),
    });
    const data = await res.json();
    if (res.status === 201) {
      setOrderPlaced(true);
      clearCart();

      navigate("/order-confirmation", {
        state: {
          customerName: name,
          orderTotal: total,
          items: cartItems,
        },
      });
    } else {
      alert("Order failed");
    }
  };

  if (orderPlaced) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl text-green-700 font-bold">
          Thank you, {name}!
        </h1>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto flex items-center flex-col">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>
                  ₹{item.price} × {isNaN(item.quantity) ? 0 : item.quantity}
                </p>
              </div>
              <input
                type="number"
                min={1}
                className="w-16 border rounded px-2 py-1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item._id, parseInt(e.target.value))
                }
              />
              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right text-lg font-semibold">
            Total: ₹{isNaN(total) ? 0 : total}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleOrder}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full cursor-pointer"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
