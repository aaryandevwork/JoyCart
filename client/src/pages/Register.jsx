import React, { useState } from 'react';
import { ShoppingBag, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../config/axiosInstance';

const Register = ({ onRegister, onNavigateLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name : "",
    email: "",
    password: "",
    confirmPassword : ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (userData) => {
    try {
        const res = await axiosInstance.post("/auth/register",userData);
        return res;
    } catch (error) {
        console.log("error in Register", error.response);
        return error.response.status;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await registerUser(formData);

    setFormData({
    name : "",
    email: "",
    password: "",
    confirmPassword : ""
  });

    if(response !== 400){
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-200">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-sm text-slate-500 mt-1">Register a new clothing store admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={formData.name}
                name = "name"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@threadcraft.com"
                value={formData.email}
                name = "email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                name = "password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                name = "confirmPassword"
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
            Create Admin Account
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{' '}
          <button onClick={() => navigate("/")} className="text-indigo-600 font-semibold hover:underline">
            Sign in here
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;