import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import loginImg from '../assets/login-bg.png';
import registerImg from '../assets/register-bg.png';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Reset form when switching between Login/Register
  useEffect(() => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  }, [isLogin]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post('https://e-store-dn87.onrender.com/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          toast.success("Login Successful!");
          onClose();
          window.location.reload();
        }
      } else {
        // Strict Front-end check
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match!");
          setLoading(false);
          return;
        }

        const response = await axios.post('https://e-store-dn87.onrender.com/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
          // confirmPassword not needed by backend anymore
        });

        if (response.data.success) {
          toast.success("Account created! Please login.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 w-screen h-screen">
      <Toaster position="top-center" />
      <div className="bg-white w-full max-w-[850px] flex flex-col md:flex-row rounded-[24px] overflow-hidden relative shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-black z-10">
          <X size={24} />
        </button>

        <div className="hidden md:block md:w-1/2 min-h-[500px]">
          <img src={isLogin ? loginImg : registerImg} className="w-full h-full object-cover" alt="auth" />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6">{isLogin ? "Welcome Back" : "Create Account"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                className="w-full border-b py-3 outline-none focus:border-black"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              className="w-full border-b py-3 outline-none focus:border-black"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              className="w-full border-b py-3 outline-none focus:border-black"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                className="w-full border-b py-3 outline-none focus:border-black"
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            )}
            <button disabled={loading} className="w-full bg-black text-white py-4 font-bold rounded-xl mt-6 hover:bg-gray-800 transition-all active:scale-95 disabled:bg-gray-400 shadow-lg">
              {loading ? "Processing..." : (isLogin ? "Sign In" : "Register")}
            </button>
          </form>
          <p className="text-center mt-6 text-sm">
            {isLogin ? "New to Codelab Tech?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-black ml-1 hover:underline">
              {isLogin ? "Join Now" : "Login Instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;