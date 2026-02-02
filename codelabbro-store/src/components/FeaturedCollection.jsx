import React from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * FeaturedCollection Component
 * Displays filtered products based on selected tabs (Best Sellers, New Arrivals, etc.)
 */
const FeaturedCollection = ({ products, activeTab, onTabChange }) => {
  const tabs = ["Best Sellers", "New Arrivals", "Featured"];
  const navigate = useNavigate();

  // Filter products based on the active tab category received from the parent component
  const filteredItems = products?.filter(p => p.category === activeTab) || [];

  return (
    <section className="w-full bg-white py-10">
      {/* Tab Navigation Section */}
      <div className="flex justify-center gap-10 mb-12 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-4 text-[13px] font-bold uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? "text-black border-b-2 border-black" 
                : "text-gray-400 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product Grid Section */}
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div 
              key={item._id} 
              onClick={() => navigate(`/product/${item._id}`)}
              className="group cursor-pointer text-center"
            >
              {/* Product Image Container */}
              <div className="bg-[#F9F9FB] rounded-[32px] aspect-square flex items-center justify-center p-12 mb-6 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                />
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-bold mb-2">{item.name}</h3>
              <p className="text-gray-500 font-bold tracking-tighter italic">
                ₹{item.price.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full text-center py-10 text-gray-400">
            No products found in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;