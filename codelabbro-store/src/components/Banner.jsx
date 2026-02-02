import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ imgSrc, linkTo, desktopHeight = "auto", mobileHeight = "auto" }) => {
  return (
    <div className="w-full overflow-hidden leading-[0]"> 
      {/* leading-[0] se image ke niche ka extra gap khatam ho jata hai */}
      <Link to={linkTo || "#"}>
        <img 
          src={imgSrc} 
          alt="UniSaviour Banner" 
          className="w-full object-cover cursor-pointer hover:opacity-95 transition-all duration-300"
          style={{
            // Dynamic Height Handling
            height: window.innerWidth <= 480 ? mobileHeight : desktopHeight,
            maxWidth: '100%', // Poori screen ki width lega
          }}
        />
      </Link>
    </div>
  );
};

export default Banner;