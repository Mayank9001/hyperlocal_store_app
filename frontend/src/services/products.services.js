const URL = import.meta.env.VITE_BACKEND_URL;

export const getProducts = async (id) => {
  return await fetch(`${URL}/api/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const searchProducts = async (query) => {
  return await fetch(
    `${URL}/api/products/search/search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
