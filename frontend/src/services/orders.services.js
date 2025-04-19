const URL = import.meta.env.VITE_BACKEND_URL;

export const placeOrder = async (order) => {
  return await fetch(`${URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
};
