import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; 
import { ShoppingCart, Zap, ShieldCheck, Truck, RotateCcw, CreditCard, Info } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 

  // --- 🛡️ SECURITY LOGIC START ---
  const handleAddToCart = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Arey Codelab! Pehle Login toh kar lo. 😅");
      return;
    }
    addToCart(product);
  };

  const handleBuyNow = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Arey Codelab! Buy karne ke liye login zaroori hai. 🔒");
      return;
    }
    addToCart(product);
    navigate('/cart'); 
  };
  // --- 🛡️ SECURITY LOGIC END ---

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );

  if (!product) return <div className="text-center py-20 font-bold text-2xl">Product not found!</div>;
  const specs = product.specifications || {};

  return (
    <div className="bg-[#F5F5F7] min-h-screen pb-20">
      <div className="max-w-[1200px] mx-auto px-4 pt-8">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 md:p-12 bg-white flex flex-col items-center border-r border-gray-50">
             <div className="relative group w-full flex justify-center">
                <img src={product.image} alt={product.name} className="max-h-[450px] object-contain transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-gray-100 shadow-sm">
                  <ShieldCheck className="text-green-500" size={24} />
                </div>
             </div>
             <div className="grid grid-cols-3 gap-4 mt-12 w-full">
                <TrustBadge icon={<Truck size={18}/>} text="Free Delivery" />
                <TrustBadge icon={<RotateCcw size={18}/>} text="7 Days Return" />
                <TrustBadge icon={<CreditCard size={18}/>} text="Secure Pay" />
             </div>
          </div>

          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase inline-block w-fit mb-4">
              {product.brand} Official Store
            </span>
            <h1 className="text-4xl font-bold text-[#1d1d1f] leading-tight mb-2">{product.name}</h1>
            <p className="text-gray-400 font-medium mb-6">Model: {product.model}</p>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-5xl font-black text-black tracking-tighter">₹{product.price.toLocaleString()}</span>
              <span className="text-gray-400 line-through text-xl">₹{(product.price * 1.3).toFixed(0)}</span>
              <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg text-sm">Save 30%</span>
            </div>

            <p className="text-gray-500 leading-relaxed mb-10 text-lg border-l-4 border-blue-600 pl-4 bg-gray-50 py-4 rounded-r-xl">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#1d1d1f] text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>

              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100"
              >
                <Zap size={22} /> Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Specs Section remains same */}
        <div className="mt-12 bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
               <Info size={24} />
            </div>
            <h2 className="text-3xl font-bold text-black tracking-tight">Technical Specifications</h2>
          </div>
          <div className="grid grid-cols-1 gap-y-2">
            {product.productType === 'Mobile' ? (
              <>
                <ModernSpecRow title="General" data={{"Model": product.model, "Brand": product.brand, "Type": "Smartphone"}} />
                <ModernSpecRow title="Display" data={{"Size": specs.displaySize, "Resolution": specs.resolution}} />
                <ModernSpecRow title="Platform" data={{"OS": specs.os, "Processor": specs.processorBrand, "Cores": specs.processorCore}} />
                <ModernSpecRow title="Storage" data={{"Internal": specs.internalStorage, "RAM": specs.ram}} />
                <ModernSpecRow title="Camera" data={{"Main": specs.primaryCamera, "Features": specs.cameraType}} />
                <ModernSpecRow title="Battery" data={{"Capacity": specs.battery}} />
              </>
            ) : (
              <ModernSpecRow title="Essentials" data={{"Package": specs.warrantySummary, "Warranty": specs.warrantyPeriod, "Power": specs.battery || "Direct"}} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const TrustBadge = ({ icon, text }) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-center">
    <div className="text-blue-600">{icon}</div>
    <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-500">{text}</span>
  </div>
);

const ModernSpecRow = ({ title, data }) => (
  <div className="flex flex-col md:flex-row border-b border-gray-50 py-8 last:border-none hover:bg-gray-50/50 transition-colors px-4 rounded-2xl">
    <div className="md:w-1/4 mb-4 md:mb-0">
      <h4 className="text-blue-600 font-black uppercase text-xs tracking-[2px]">{title}</h4>
    </div>
    <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
      {Object.entries(data).map(([key, value]) => (
        value && (
          <div key={key} className="flex flex-col">
            <span className="text-[11px] text-gray-400 font-bold uppercase mb-1">{key}</span>
            <span className="text-[#1d1d1f] font-semibold">{value}</span>
          </div>
        )
      ))}
    </div>
  </div>
);

export default ProductDetails;