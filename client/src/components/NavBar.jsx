import React from 'react';
import { ShoppingBag, Plus, LogOut, User } from 'lucide-react';
import { axiosInstance } from '../config/axiosInstance';

export const Navbar = ({ user, onOpenAddModal, onLogout }) => {

  const handleGetMe = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      console.log(res);
    } catch (error) {
      console.log("error in get me",error.response); 
    }
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block leading-none">ThreadCraft</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Admin Dashboard</span>
          </div>
        </div>

          <button
            onClick={handleGetMe}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Get Me</span>
          </button>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={onOpenAddModal}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Product</span>
          </button>

          {user && (
            <div className="hidden md:flex items-center space-x-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-medium text-slate-200">{user.name}</span>
            </div>
          )}

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-red-950/80 hover:text-red-400 text-slate-300 px-3.5 py-2 rounded-lg text-sm font-medium border border-slate-700 transition"
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