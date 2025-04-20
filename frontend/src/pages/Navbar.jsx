import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
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
      <a
        href="https://github.com/Mayank9001"
        target="_blank"
        className="absolute bottom-5 right-5 text-gray-500 hover:text-gray-700 transition cursor-pointer"
      >
        <FaGithubSquare size={64} />
      </a>
    </div>
  );
};

export default Navbar;
