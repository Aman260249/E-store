import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Success Page Component
 * Triggered after a successful checkout.
 * Features a celebratory confetti animation and clear post-purchase CTAs.
 */
const Success = () => {
  useEffect(() => {
    // Launch celebratory confetti on component mount
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0071e3', '#22c55e', '#ffffff']
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        
        {/* ANIMATED ICON SECTION: Visual confirmation of success */}
        <div className="relative flex justify-center mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white rounded-full p-4 shadow-2xl shadow-green-100">
            <CheckCircle2 size={100} className="text-green-500 animate-[bounce_1s_ease-in-out]" />
          </div>
        </div>

        {/* MESSAGING SECTION: Clear and concise order status */}
        <h1 className="text-4xl font-black text-[#1d1d1f] mb-4 tracking-tight">
          It's ordered!
        </h1>
        <p className="text-gray-500 font-bold text-lg mb-10 leading-relaxed">
          Your order has been placed successfully. We'll send you a confirmation email with details shortly.
        </p>

        {/* ORDER INFO CARD: Estimated delivery timeline */}
        <div className="bg-[#F5F5F7] p-6 rounded-[24px] mb-10 border border-gray-100 flex items-center gap-4 text-left">
          <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Est. Delivery</p>
            <p className="text-sm font-bold text-[#1d1d1f]">3-5 Business Days</p>
          </div>
        </div>

        {/* ACTION BUTTONS: Navigation for post-purchase flow */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="w-full bg-[#0071e3] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#0077ed] transition-all active:scale-95 shadow-xl shadow-blue-100"
          >
            Continue Shopping <ShoppingBag size={20} />
          </Link>
          
          <Link 
            to="/orders" 
            className="w-full bg-white text-[#1d1d1f] py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 border-2 border-gray-100 hover:bg-gray-50 transition-all"
          >
            View Order Status <ArrowRight size={20} />
          </Link>
        </div>

        {/* BRAND FOOTER: Subtle thank you note */}
        <p className="mt-12 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Thank you for choosing Codelab Tech.
        </p>
      </div>
    </div>
  );
};

export default Success;