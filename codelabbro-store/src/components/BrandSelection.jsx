import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrandSelection = () => { 
  const navigate = useNavigate();
  const brands = [
    { name: "honor", style: "font-serif lowercase tracking-tighter" },
    { name: "GIONEE", style: "font-sans font-extrabold tracking-widest" },
    { name: "mi", style: "font-mono font-bold lowercase scale-110" },
    { name: "Apple", style: "font-sans font-light tracking-tight" },
    { name: "oppo", style: "font-serif italic lowercase tracking-widest" },
    { name: "SAMSUNG", style: "font-sans font-black tracking-tighter italic" },
    { name: "Lenovo", style: "font-sans font-bold" },
    { name: "NOKIA", style: "font-serif font-bold tracking-[0.2em]" },
    { name: "ASUS", style: "font-mono font-bold tracking-tighter" },
    { name: "htc", style: "font-sans lowercase font-light" },
    { name: "vivo", style: "font-serif italic font-bold" },
  ];

  return (
    <section className="w-full bg-white py-12 px-4 md:px-10 max-w-[1440px] mx-auto">
      <h2 className="text-center text-[26px] md:text-[32px] font-black mb-12 text-black uppercase tracking-tighter italic">Select Brand Collection</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 border-t border-l border-gray-200">
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={() => navigate(`/brand/${brand.name.toLowerCase()}`)} // Navigate logic
            className="relative group border-r border-b border-gray-200 aspect-square flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-white"
          >
            <span className={`text-[18px] md:text-[20px] text-[#999999] group-hover:text-black transition-colors duration-300 ${brand.style}`}>
              {brand.name}
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-black text-white text-[10px] py-3 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out font-black uppercase tracking-widest">
              View Mobile Shop
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSelection;