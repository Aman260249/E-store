import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, cartTotal, clearCart } = useCart();
  
  const freeShippingThreshold = 500;
  const deliveryCharges = cartTotal >= freeShippingThreshold ? 0 : 40;
  const platformFee = 10;
  const finalAmount = cartTotal + deliveryCharges + platformFee;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);

  const handleCheckoutClick = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Arey Codelab! Checkout ke liye Login zaroori hai. 🔒");
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-4 text-center">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-8"><ShoppingBag size={50} className="text-blue-200" /></div>
        <h2 className="text-3xl font-black mb-3">Your bag is empty.</h2>
        <Link to="/" className="bg-[#1d1d1f] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3">Continue Shopping <ArrowRight size={20} /></Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBFD] min-h-screen pb-24 pt-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-5xl font-black text-[#1d1d1f]">Review your bag.</h1>
          <button onClick={clearCart} className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl">Clear All</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            {/* Progress Bar */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm flex items-center gap-2"><Truck size={20} className="text-blue-600" /> {cartTotal >= freeShippingThreshold ? "Unlocked Free Shipping!" : `Add ₹${freeShippingThreshold - cartTotal} more for FREE Delivery`}</span>
                    <span className="text-xs font-black text-gray-400">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-700" style={{ width: `${progress}%` }} /></div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-32 h-32 bg-[#F5F5F7] rounded-2xl p-4"><img src={item.image} alt="" className="w-full h-full object-contain" /></div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center bg-[#F5F5F7] p-1 rounded-2xl">
                      <button onClick={() => removeFromCart(item._id, true)} className="w-10 h-10 bg-white rounded-xl shadow-sm"><Minus size={16} className="mx-auto" /></button>
                      <span className="px-6 font-black">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="w-10 h-10 bg-white rounded-xl shadow-sm"><Plus size={16} className="mx-auto"/></button>
                    </div>
                    <span className="text-2xl font-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] border border-gray-100 shadow-2xl sticky top-32">
              <h2 className="text-2xl font-black mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-green-600 font-bold">{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}</span></div>
                <div className="flex justify-between"><span>Platform Fee</span><span className="font-bold">₹10</span></div>
              </div>
              <div className="pt-6 border-t-2 border-dashed border-gray-100 mb-8 text-3xl font-black text-blue-600">₹{finalAmount.toLocaleString()}</div>
              
              <button onClick={handleCheckoutClick} className="w-full bg-blue-600 text-white py-6 rounded-[24px] font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 transition-all">
                Check Out <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;