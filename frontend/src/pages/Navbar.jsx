import React from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-16 bg-slate-700 flex flex-row items-center">
      <ul className="flex flex-row items-center justify-center gap-16 w-full h-full px-4">
        <li
          className="text-white text-xl font-bold cursor-pointer font-manrope"
          onClick={() => navigate("/")}
        >
          <p>Home</p>
        </li>
        <li
          className="text-white text-xl font-bold cursor-pointer font-manrope"
          onClick={() => navigate("/cart")}
        >
          <p>Cart</p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
