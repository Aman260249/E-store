import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Image Assets for Sidebar Categories
 */
import iphoneIcon from '../assets/slice_16.jpg'; 
import chargerIcon from '../assets/slice_19.jpg'; 
import wirelessIcon from '../assets/slice_21.jpg';

/**
 * CategorySlider Component
 * Features a category sidebar filter and a horizontal product scroller.
 * Designed for quick product discovery based on item types.
 */
const CategorySlider = ({ products, onTypeSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-[#F5F5F7] py-8 md:py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-10">
        
        {/* SIDEBAR NAVIGATION: Category Filters */}
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full lg:w-[280px] h-[280px] flex flex-col justify-between">
          {/* iPhone Category Toggle */}
          <div 
            onClick={() => onTypeSelect('iPhone')} 
            className="flex items-center gap-6 cursor-pointer group transition-all"
          >
            <img src={iphoneIcon} alt="iPhone Category" className="w-8 h-8 object-contain" />
            <span className="text-gray-400 group-hover:text-black font-semibold transition-colors">iPhone</span>
          </div>

          {/* Charger Category Toggle */}
          <div 
            onClick={() => onTypeSelect('Charger')} 
            className="flex items-center gap-6 cursor-pointer group transition-all"
          >
            <img src={chargerIcon} alt="Charger Category" className="w-8 h-8 object-contain" />
            <span className="text-gray-400 group-hover:text-black font-semibold transition-colors">Charger</span>
          </div>

          {/* Wireless Category Toggle */}
          <div 
            onClick={() => onTypeSelect('Wireless')} 
            className="flex items-center gap-6 cursor-pointer group transition-all"
          >
            <img src={wirelessIcon} alt="Wireless Category" className="w-8 h-8 object-contain" />
            <span className="text-gray-400 group-hover:text-black font-semibold transition-colors">Wireless</span>
          </div>
        </div>

        {/* PRODUCT DISPLAY: Horizontal Scroller */}
        <div className="flex-1 flex items-center relative w-full overflow-hidden">
          <div className="flex-1 flex gap-4 overflow-x-auto no-scrollbar py-4 px-2 scroll-smooth">
            {products && products.length > 0 ? (
              products.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => navigate(`/product/${item._id}`)} 
                  className="min-w-[170px] md:min-w-[190px] bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center justify-between h-[280px] hover:shadow-md transition-all cursor-pointer group"
                >
                  {/* Product Visual */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-36 object-contain group-hover:scale-105 transition-transform duration-300" 
                  />

                  {/* Product Details & Link */}
                  <div className="text-center w-full">
                    <p className="text-[10px] md:text-[11px] font-bold text-gray-800 uppercase tracking-tight mb-2 truncate">
                      {item.model}
                    </p>
                    <span className="text-[9px] text-blue-600 font-bold uppercase tracking-widest border-t border-gray-100 pt-3 block group-hover:text-blue-800">
                      View Detail
                    </span>
                  </div>
                </div>
              ))
            ) : (
              /* Fallback for empty state */
              <div className="w-full flex items-center justify-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic text-sm text-center">
                  No products available in this slider.<br/>Please add items via Admin Panel.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;