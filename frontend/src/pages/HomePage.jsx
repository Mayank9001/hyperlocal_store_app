import React, { useEffect, useState } from "react";
import { getAllStores } from "../services/store.services";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  const getStores = async () => {
    try {
      const res = await getAllStores();
      const data = await res.json();
      if (res.status === 200) {
        setStores(data);
      } else {
        console.error("Error fetching stores:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Hyperlocal Stores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store._id}
            onClick={() => navigate(`/store/${store._id}`)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:bg-green-50 transition"
          >
            <h2 className="text-xl font-semibold text-green-800">{store.name}</h2>
            <p className="text-gray-600">{store.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
