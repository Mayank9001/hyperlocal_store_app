const URL = import.meta.env.VITE_BACKEND_URL;

export const getAllStores = async () => {
  return await fetch(`${URL}/api/stores/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
