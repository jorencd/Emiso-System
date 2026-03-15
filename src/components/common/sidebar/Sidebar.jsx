import React, { useState } from "react";
import Logo from "../../../assets/logo/PLSPLogo.png";
import bg from "../../../assets/loginBG/loginBG.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import ConfirmModal from "../modal/ConfirmModal";

function BookpageSidebar() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Clear authentication data and redirect
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      className="relative flex flex-col w-1/4 h-screen p-2 bg-center bg-cover border-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#71b280ea] to-[#134E5E]"></div>

      {/* Top Section */}
      <div className="relative z-10 flex flex-col items-center gap-y-4">
        <div
          className="bg-cover rounded-full md:h-20 md:w-20"
          style={{ backgroundImage: `url(${Logo})` }}
        ></div>

        <p className="w-full font-bold text-center text-white">
          Pamantasan ng Lungsod ng San Pablo
        </p>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-col flex-1 mt-8">
        <hr className="w-full my-4 border-white" />

        <ul className="w-full space-y-2">
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

        <div className="w-full mt-auto">
          <hr className="w-full my-4 border-white" />
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

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        message="Are you sure you want to log out?"
      />
    </div>
  );
}

export default BookpageSidebar;
