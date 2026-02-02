import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { cartItems, clearCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearCart(); 
    setUser(null);
    window.location.href = "/"; // Safe and clean logout
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md font-sans sticky top-0 z-[999] shadow-sm">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* --- TOP LAYER --- */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-[85px] flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/logo_codelab.png" alt="Tech And Gear" className="h-25 scale-125 object-contain" />
          </Link>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:flex items-center space-x-4 text-[13px] font-medium text-gray-700 mr-8">
            <Link to="/best-sellers" className="hover:text-black">Best Sellers</Link>
            <span className="text-gray-300">|</span>
            <Link to="/valentines-day" className="hover:text-black">Valentines Day</Link>
            <span className="text-gray-300">|</span>
            <Link to="/flora" className="hover:text-black">Flora</Link>
            <span className="text-gray-300">|</span>
            <Link to="/photo-cases" className="hover:text-black">Photo Cases</Link>
            <span className="text-gray-300">|</span>
            <Link to="/hearts" className="hover:text-black">Hearts</Link>
          </div>

          <div className="flex items-center space-x-5 text-gray-800">
            <Search size={22} className="cursor-pointer hover:scale-110 transition" />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-[12px] font-bold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button onClick={handleLogout} className="hover:text-red-600 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div onClick={() => setIsAuthOpen(true)} className="cursor-pointer hover:scale-110 transition">
                <User size={22} />
              </div>
            )}

            <Link to="/cart" className="relative cursor-pointer hover:scale-110 transition">
              <ShoppingBag size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button className="lg:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM LAYER (BLACK) --- */}
      <div className="hidden lg:block bg-[#1A1A1A] text-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center h-12 space-x-8 text-[11px] font-bold tracking-[0.1em] uppercase">
          <Link to="/category/phone" className="hover:text-gray-400">Phone</Link>
          <span className="text-gray-700">|</span>
          <Link to="/category/watch-audio" className="hover:text-gray-400">Watch / Audio</Link>
          <span className="text-gray-700">|</span>
          <Link to="/category/tablet-laptop" className="hover:text-gray-400">Tablet / Laptop</Link>
          <span className="text-gray-700">|</span>
          <Link to="/category/magfit" className="hover:text-gray-400">Magfit Lineup</Link>
          <span className="text-gray-700">|</span>
          <Link to="/category/power" className="hover:text-gray-400">Power | Magfit Lineup</Link>
          <span className="text-gray-700">|</span>
          <Link to="/category/accessories" className="hover:text-gray-400">Accessories</Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-[85px] left-0 w-full h-screen bg-white z-[1000] p-6 flex flex-col space-y-4 text-sm font-semibold uppercase">
            <Link to="/category/phone" onClick={() => setIsMenuOpen(false)}>Phone</Link>
            <Link to="/category/watch-audio" onClick={() => setIsMenuOpen(false)}>Watch / Audio</Link>
            <Link to="/category/tablet-laptop" onClick={() => setIsMenuOpen(false)}>Tablet / Laptop</Link>
            {user && (
              <button onClick={handleLogout} className="text-left text-red-500 mt-4 border-t pt-4 font-bold">Logout</button>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;