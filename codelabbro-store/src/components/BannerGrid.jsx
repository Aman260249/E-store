import React from 'react';

// Images import
import bannerLeft from '../assets/slice_1.jpg';  
import bannerRight from '../assets/slice_2.jpg'; 
import bannerBottom from '../assets/slice_3.jpg'; 

const BannerGrid = () => {
  return (
    <section className="w-full flex flex-col items-center">
      {/* 1. TOP SECTION: 2 Images with side gaps */}
      <div className="w-full max-w-[1440px] px-4 md:px-10 py-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="overflow-hidden rounded-md shadow-sm">
          <img 
            src={bannerLeft} 
            alt="Left" 
            className="w-full h-full object-cover" // Top images cover area nicely
          />
        </div>
        <div className="overflow-hidden rounded-md shadow-sm">
          <img 
            src={bannerRight} 
            alt="Right" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 2. BOTTOM SECTION: Full Width, No Crop, No Zoom */}
      <div className="w-full overflow-hidden">
        <img 
          src={bannerBottom} 
          alt="Full Width Banner" 
          // 'object-contain' image ko katne se bachayega
          // 'h-auto' ensures height stays according to image width
          className="w-full h-auto object-contain block" 
        />
      </div>
    </section>
  );
};

export default BannerGrid;