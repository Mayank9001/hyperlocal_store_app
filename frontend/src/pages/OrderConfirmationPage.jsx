import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmationPage = () => {
  const { state } = useLocation();
  const { customerName, orderTotal, items } = state || {};

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl text-green-700 font-bold">
        Thank you, {customerName}!
      </h1>
      <p>Your order has been placed successfully.</p>
      <h2 className="text-xl mt-4">Order Summary:</h2>
      <ul className="list-none mt-4">
        {items &&
          items.map((item) => (
            <li key={item._id}>
              {item.name} - ₹{item.price} × {item.quantity}
            </li>
          ))}
      </ul>
      <div className="mt-4 font-semibold">Total: ₹{orderTotal}</div>
    </div>
  );
};

export default OrderConfirmationPage;
