import React from "react";
import { ShoppingBag, Plus, LogOut, User } from "lucide-react";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { Sun, Moon } from "lucide-react";
import { toggleTheme } from "../store/themeSlice";
export const Navbar = ({ onOpenAddModal }) => {
  const { user } = useSelector((store) => store.auth);

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(logout());
    } catch (error) {
      console.log("error in handleLogout ", error);
    }
  };

  return (
    <nav className="bg-(--theme-surface) border-b border-(--theme-border) text-(--theme-text) sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-(--theme-primary) p-2 rounded-xl text-(--theme-accent-text)">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block leading-none mt-2">
              JoyCart
            </span>
            <span className="text-[10px] text-(--theme-text-muted) font-semibold uppercase tracking-wider">
              Admin Dashboard
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">

          <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          className="rounded-lg border border-(--theme-border) bg-(--theme-surface-muted) p-2 text-(--theme-text) transition-colors hover:bg-(--theme-accent)"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-2 bg-(--theme-primary) hover:bg-(--theme-primary-hover) text-(--theme-accent-text) px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Product</span>
          </button>

          {user && (
            <div className="hidden md:flex items-center space-x-2 text-xs text-(--theme-text-muted) bg-(--theme-surface-muted) px-3 py-2 rounded-lg border border-(--theme-border)">
              <User className="w-3.5 h-3.5 text-(--theme-primary)" />
              <span className="font-medium text-(--theme-text)">
                {user.name}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-(--theme-surface-muted) hover:bg-(--theme-rose-100) hover:text-(--theme-danger) text-(--theme-text-muted) px-3.5 py-2 rounded-lg text-sm font-medium border border-(--theme-border) transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
