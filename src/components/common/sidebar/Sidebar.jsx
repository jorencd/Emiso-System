import React from 'react'
import Logo from "../../../assets/logo/PLSPLogo.png";
import bg from "../../../assets/loginBG/loginBG.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function BookpageSidebar() {
  const navigate = useNavigate();

  const handleBooksClick = (e) => {
    e.preventDefault();
    navigate("/hero");
  };

  const handleJournalsClick = (e) => {
    e.preventDefault();
    navigate("/journal");
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    
    // Clear authentication data
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    
    navigate("/", { replace: true });
  };

  const getActiveClass = ({ isActive }) => {
    return `px-4 py-3 gap-x-2 text-white rounded-lg transition-all duration-300 font-medium cursor-pointer w-full flex ${
      isActive 
        ? 'bg-white/30 border-l-4 border-white shadow-lg' 
        : 'hover:bg-white/20'
    }`;
  };

  return (
    <div
      className="h-screen bg-cover bg-center relative w-1/3 rounded-xl border-7 p-2 border-white flex flex-col"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 rounded-lg bg-linear-to-b from-green-600/80 to-emerald-900"></div>

      {/* Top Section */}
      <div className="relative z-10 flex flex-col items-center gap-y-4">
        <div
          className="md:h-20 md:w-20 bg-cover rounded-full"
          style={{ backgroundImage: `url(${Logo})` }}
        ></div>

        <p className="w-full font-bold text-white text-center">
          Pamantasan ng Lungsod ng San Pablo
        </p>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mt-8 flex-1 flex flex-col">
        <hr className="my-4 w-full border-white" />

        <ul className="space-y-2 w-full">
          <li>
            <NavLink 
              to="/hero" 
              onClick={handleBooksClick}
              className={getActiveClass}
            >
              <Icon icon="raphael:books" width="32" height="32" />
              <p>Books</p>
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/journal" 
              onClick={handleJournalsClick}
              className={getActiveClass}
            >
              <Icon icon="bi:journals" width="25" height="25" />
              <p>Journals</p>
            </NavLink>
          </li>
        </ul>

        <div className="mt-auto w-full">
          <hr className="my-4 w-full border-white" />
          <NavLink 
            to="/" 
            onClick={handleLogoutClick}
            className={getActiveClass}
          >
            <Icon icon="solar:logout-2-bold" width="24" height="24" />
            <p>Log out</p>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default BookpageSidebar
