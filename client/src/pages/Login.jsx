import React, { useState } from "react";
import { ShoppingBag, Lock, Mail, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
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
      await dispatch(LoginUserAction(formData)).unwrap();
      navigate("/main");
    } catch (error) {
      console.log("Error in login", error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen bg-(--theme-bg) flex flex-col items-center justify-center p-4">
      {/* JoyCart Branding */}
      <div className="flex flex-col items-center text-center mb-20">
        <div className="flex items-center justify-center gap-2">
          <div className="w-9 h-9 bg-(--theme-primary) text-(--theme-accent-text) rounded-xl flex items-center justify-center shadow-lg shadow-(--theme-border)/40">
            <ShoppingBag className="w-5 h-5" />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-(--theme-text)">
            JoyCart
          </h1>

          <Sparkles className="w-5 h-5 text-(--theme-primary)" />
        </div>

        <p className="text-sm text-(--theme-text-muted) mt-2">
          Your style, your cart, your happiness.
        </p>
      </div>
      <div className="max-w-md w-full bg-(--theme-surface) rounded-2xl shadow-2xl overflow-hidden p-8 border border-(--theme-border)">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-(--theme-text)">
            Welcome Back
          </h2>

          <p className="text-sm text-(--theme-text-muted) mt-1">
            Sign in to manage your clothing store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-(--theme-text) uppercase mb-1">
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@joycart.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-(--theme-border) bg-(--theme-surface) text-(--theme-text) placeholder:text-(--theme-text-muted) focus:ring-2 focus:ring-(--theme-primary) focus:border-(--theme-primary) outline-none text-sm transition"
              />

              <Mail className="w-4 h-4 text-(--theme-text-muted) absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-(--theme-text) uppercase mb-1">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-(--theme-border) bg-(--theme-surface) text-(--theme-text) placeholder:text-(--theme-text-muted) focus:ring-2 focus:ring-(--theme-primary) focus:border-(--theme-primary) outline-none text-sm transition"
              />

              <Lock className="w-4 h-4 text-(--theme-text-muted) absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-(--theme-primary) hover:bg-(--theme-primary-hover) text-(--theme-accent-text) font-semibold rounded-xl transition shadow-md shadow-(--theme-border)/40 text-sm active:scale-[0.99]"
          >
            Sign In to Admin
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-(--theme-text-muted)">
          Don't have an admin account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-(--theme-primary) font-semibold hover:underline"
          >
            Register here
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-(--theme-border) text-center">
          <p className="text-xs text-(--theme-text-muted)">
            © {new Date().getFullYear()} JoyCart. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
