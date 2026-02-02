import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, ChevronLeft, CreditCard, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    pincode: '',
    phone: ''
  });

  // 🛡️ SECURITY CHECK: Page load hote hi check karo user hai ya nahi
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Pehle Login toh kar lo bhai! 😅");
      navigate('/'); // Redirect to Home
    }
  }, [navigate]);

  const deliveryCharges = cartTotal > 500 ? 0 : 40;
  const finalAmount = cartTotal + deliveryCharges + 10;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 ACTUAL DATABASE SAVING LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check user again before sending data
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Session expired. Login again.");
      navigate('/');
      return;
    }

    const orderData = {
      customer: formData,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      totalAmount: finalAmount
    };

    try {
      // Backend request with Authorization header
      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success("🚀 Order Placed Successfully!");
        clearCart(); 
        setTimeout(() => {
          navigate('/success'); 
        }, 1500);
      }
    } catch (error) {
      console.error("DB Error:", error);
      toast.error(error.response?.data?.message || "Data save nahi hua. Backend check karo!");
    }
  };

  // Agar items nahi hain toh return to cart
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty!</h2>
        <Link to="/" className="bg-black text-white px-6 py-2 rounded-lg">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <Toaster position="top-center" />
      {/* Header */}
      <div className="border-b border-gray-100 py-6 mb-10">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
          <Link to="/cart" className="flex items-center gap-2 text-gray-500 hover:text-black font-bold">
            <ChevronLeft size={20} /> Back to Bag
          </Link>
          <img 
            src="/logo_codelab.png" 
            alt="Logo" 
            className="h-12 md:h-16 w-auto object-contain" 
          />
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} className="text-green-500" /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: FORM */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black text-[#1d1d1f] mb-8 tracking-tight">Shipping Details</h2>
            <div className="space-y-6">
              <input required name="email" type="email" placeholder="Email" className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
              <div className="grid grid-cols-2 gap-4">
                <input required name="firstName" placeholder="First Name" className="p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
                <input required name="lastName" placeholder="Last Name" className="p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
              </div>
              <input required name="address" placeholder="Street Address" className="w-full p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
              <div className="grid grid-cols-2 gap-4">
                <input required name="city" placeholder="City" className="p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
                <input required name="pincode" placeholder="Pincode" className="p-4 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
              </div>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required name="phone" placeholder="Phone Number" className="w-full p-4 pl-12 bg-[#F5F5F7] rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-[#F5F5F7] p-8 rounded-[32px] sticky top-32">
              <h3 className="text-xl font-black mb-6">Order Summary</h3>
              <div className="max-h-[200px] overflow-y-auto mb-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-12 h-12 object-contain" alt="" />
                      <div>
                        <p className="text-sm font-bold line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500 font-bold"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-gray-500 font-bold"><span>Shipping</span><span>{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}</span></div>
              </div>

              <div className="flex justify-between items-center py-6 border-t border-gray-200 mb-6">
                <span className="text-xl font-black">Total</span>
                <span className="text-2xl font-black text-blue-600">₹{finalAmount.toLocaleString()}</span>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
                Place Order <CreditCard className="inline ml-2" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;