import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios import karo
import { toast, Toaster } from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FIX: Real API call to Render Backend
      const response = await axios.post('https://e-store-dn87.onrender.com/api/auth/login', {
        email,
        password
      });

      const { success, user, token } = response.data;

      // Check if user exists and has admin role
      if (success && user.role === 'admin') {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAdmin", "true"); // For your existing route guards
        
        toast.success("Welcome, Admin! 🚀");
        navigate('/admin/dashboard');
      } else {
        toast.error("Access Denied: You are not an Admin!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <Toaster position="top-center" />
      <div className="bg-white p-10 rounded-[30px] shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1d1d1f]">Codelab Admin</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-[#0071e3] text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-blue-200 disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;