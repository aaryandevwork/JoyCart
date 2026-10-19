import React, { useState } from 'react';
import { ShoppingBag, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../config/axiosInstance';

const Register = ({ onRegister, onNavigateLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      return res;
    } catch (error) {
      console.log("error in Register", error.response);
      return error.response.status;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerUser(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    if (response !== 400) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-(--theme-bg) flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-(--theme-surface) rounded-2xl shadow-2xl overflow-hidden p-8">

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-(--theme-primary) text-(--theme-accent-text) rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-(--theme-border)/40">
            <ShoppingBag className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-(--theme-text)">
            Create Account
          </h2>

          <p className="text-sm text-(--theme-text-muted) mt-1">
            Register a new clothing store admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-(--theme-text) uppercase mb-1">
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-(--theme-border) bg-(--theme-surface) text-(--theme-text) placeholder:text-(--theme-text-muted) focus:ring-2 focus:ring-(--theme-primary) focus:border-(--theme-primary) outline-none text-sm transition"
              />

              <User className="w-4 h-4 text-(--theme-text-muted) absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-(--theme-text) uppercase mb-1">
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@threadcraft.com"
                value={formData.email}
                name="email"
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

          <div>
            <label className="block text-xs font-semibold text-(--theme-text) uppercase mb-1">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                name="confirmPassword"
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
            Create Admin Account
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-(--theme-text-muted)">
          Already registered?{' '}
          <button
            onClick={() => navigate("/")}
            className="text-(--theme-primary) font-semibold hover:underline"
          >
            Sign in here
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;