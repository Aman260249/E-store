import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TabbedProductGrid = ({ products, loading }) => {
  const navigate = useNavigate();
  if (loading) return <div className="text-center py-10 font-bold uppercase tracking-widest animate-pulse">Loading Store...</div>;

  return (
    <section className="w-full bg-white py-10 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 relative flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {products && products.length > 0 ? (
            products.map((item) => (
              <div 
                key={item._id} 
                onClick={() => navigate(`/product/${item._id}`)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="bg-[#F6F6F6] rounded-[24px] w-full h-[320px] flex justify-center p-10 mb-6 overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[14px] font-bold text-center text-gray-800 mb-2 px-4 uppercase tracking-tight">{item.name}</h3>
                <p className="text-[18px] font-black text-blue-600 mb-6 tracking-tighter">₹{item.price}</p>
                <button className="bg-black text-white px-10 py-3 rounded-full text-[11px] font-black uppercase tracking-[2px] hover:bg-blue-600 transition-all duration-300">Shop Now</button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-20 border-2 border-dashed border-gray-100 rounded-[40px]">
              No accessories in this section yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TabbedProductGrid;