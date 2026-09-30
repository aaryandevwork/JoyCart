import React, { useState } from "react";
import { ShoppingBag, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import { LoginUserAction } from "../store/authActions";
import { useDispatch } from "react-redux";

const Login = ({ onLogin, onNavigateRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(LoginUserAction(formData)).unwrap();;
      navigate("/main");
    } catch (error) {
      console.log("Error in login",error.response);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-200">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to manage your clothing store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@threadcraft.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                name="password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-md shadow-indigo-200 text-sm active:scale-[0.99]"
          >
            Sign In to Admin
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have an admin account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
