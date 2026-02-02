import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Abhi ke liye simple check, baad mein JWT backend se connect karenge
    if(email === "admin@codelab.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate('/admin/dashboard');
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <div className="bg-white p-10 rounded-[30px] shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1d1d1f]">Codelab Admin</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@codelab.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-[#0071e3] text-white py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-blue-200">
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;