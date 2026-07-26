import React from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.svg"
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { MdLogout, MdMenu, MdOutlineShoppingCart } from "react-icons/md";

const Navbar = () => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { cartCount, toggleCart } = useCart();
  const navigate = useNavigate();

  const userProfile = loggedInUser?.name ? loggedInUser.name.split("")[0].toUpperCase() : "U";
  const userName = loggedInUser?.name || "User";

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 transition-all duration-300 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <div
          className="flex items-center gap-2 shrink-0 active cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
            <img src={logo} alt="logo" />
          </div>
          <span className="font-heading text-foreground font-bold text-lg">
            Sky<span className="text-primary">Mart</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center text-white/70 gap-6">
          <NavLink to="/" className={({ isActive }) =>
            `transition-all duration-300 hover:text-foreground ${
              isActive ? "text-primary font-semibold" : ""
            }`
          }>
            Home
          </NavLink>
          <NavLink className={({ isActive }) =>
            `transition-all duration-300 hover:text-foreground ${
              isActive ? "text-primary font-semibold" : ""
            }`
          } to="/products">
            Shop
          </NavLink>
          <NavLink className={({ isActive }) =>
            `transition-all duration-300 hover:text-foreground ${
              isActive ? "text-primary font-semibold" : ""
            }`
          } to="/about">
            About
          </NavLink>
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center text-background text-xs font-bold">
              {userProfile}
            </div>
            <span className="text-sm text-foreground font-body truncate max-w-[100px]">
              {userName}
            </span>
          </div>
          <button 
            onClick={toggleCart}
            className="relative p-2.5 bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl transition-all cursor-pointer"
          >
            <MdOutlineShoppingCart className='text-white/70 hover:text-white transition-all duration-300' size={20}/>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2.5 bg-white/8 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded-xl transition-all text-white/60 hover:text-red-400 cursor-pointer"
          >
            <MdLogout size={20}/>
          </button>
          <button className="md:hidden p-2.5 bg-white/8 border border-white/10 rounded-xl cursor-pointer">
            <MdMenu/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
