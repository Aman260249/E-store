import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Filter, Smartphone } from 'lucide-react';

const BrandPage = () => {
  const { brandName } = useParams(); // URL se brand ka naam lega
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://e-store-dn87.onrender.com/api/products');
        
        // Logic: Sirf wahi products jo is Brand ke hain aur BrandPage ke liye mark hain
        const filtered = response.data.filter(p => 
          p.brand.toLowerCase() === brandName.toLowerCase() && 
          p.targetSection === 'BrandPage'
        );
        
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching brand products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandProducts();
  }, [brandName]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-all"
          >
            <ChevronLeft size={20} /> <span className="font-bold text-sm uppercase tracking-widest">Home</span>
          </button>
          
          <h1 className="text-2xl font-black uppercase tracking-tighter italic">
            {brandName} <span className="text-blue-600">Edition</span>
          </h1>

          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Hero Brand Title */}
      <div className="bg-[#F2F2F7] py-16 px-6 text-center">
        <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm mb-6">
          <Smartphone size={18} className="text-blue-600" />
          <span className="text-xs font-black uppercase tracking-widest">{brandName} Collection</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
          {brandName}
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Exclusive premium mobile collection for {brandName} lovers. Handpicked quality and performance.
        </p>
      </div>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-gray-400 uppercase tracking-widest">Fetching {brandName} Stock...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)} // Agla step: Details Page
              >
                <div className="bg-[#F9F9FB] rounded-[32px] aspect-[4/5] flex items-center justify-center p-10 mb-6 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="space-y-2 text-center">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.model}</p>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-xl font-black">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest mb-4">Abhi koi {brandName} mobile nahi hai</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-black text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest"
            >
              Back to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrandPage;