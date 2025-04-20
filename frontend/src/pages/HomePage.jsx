// import React, { useEffect, useState } from "react";
// import { getAllStores } from "../services/store.services";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const [stores, setStores] = useState([]);
//   const navigate = useNavigate();

//   const getStores = async () => {
//     try {
//       const res = await getAllStores();
//       const data = await res.json();
//       if (res.status === 200) {
//         setStores(data);
//       } else {
//         console.error("Error fetching stores:", data);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     getStores();
//   }, []);

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
//         Hyperlocal Stores
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {stores.map((store) => (
//           <div
//             key={store._id}
//             onClick={() => navigate(`/store/${store._id}`)}
//             className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:bg-green-50 transition"
//           >
//             <h2 className="text-xl font-semibold text-green-800">
//               {store.name}
//             </h2>
//             <p className="text-gray-600">{store.location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { getAllStores } from "../services/store.services";
import { searchProducts } from "../services/products.services";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await searchProducts(query);
      const data = await res.json();
      if (res.status === 200) {
        setSearchResults(data);
      } else {
        console.error("Search failed:", data);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Hyperlocal Stores
      </h1>

      {/* Search bar */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search for fruits or vegetables..."
          className="flex-1 p-3 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-5 rounded-r-lg hover:bg-green-700 cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Search Results for "{query}"
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {searchResults.map((item) => (
              <div
                key={item._id}
                className="bg-teal-100 p-4 rounded-xl border-0 shadow-sm hover:shadow-xl cursor-pointer hover:bg-teal-200 transition"
                onClick={() => navigate(`/store/${item.storeId}`)}
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Store: {item.storeName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Store List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store._id}
            onClick={() => navigate(`/store/${store._id}`)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:bg-green-100 transition"
          >
            <h2 className="text-xl font-semibold text-green-800">
              {store.name}
            </h2>
            <p className="text-gray-600">{store.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
