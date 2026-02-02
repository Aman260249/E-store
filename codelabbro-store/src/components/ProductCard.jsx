import React from 'react';

/**
 * ProductCard Component
 * Displays individual product details including image, price, and stock status.
 * Handles conditional rendering for 'Out of Stock' and 'Low Stock' scenarios.
 */
const ProductCard = ({ product }) => {
  // Logic: Determine if the product is unavailable based on stock count
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group border p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Product Image Container with Badge Overlay */}
      <div className="relative overflow-hidden bg-gray-50 rounded-md">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Conditional Badge: Displayed only when stock is zero */}
        {isOutOfStock && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Information Section */}
      <div className="mt-4 text-center">
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-600 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
        
        {/* Urgency Indicator: Shows when stock is critically low but not empty */}
        {!isOutOfStock && product.stock < 5 && (
          <p className="text-orange-500 text-[11px] font-bold mt-1 animate-pulse">
            Only {product.stock} left in stock!
          </p>
        )}

        {/* Action Button: Dynamic styling based on availability */}
        <button 
          disabled={isOutOfStock}
          className={`mt-4 w-full py-2.5 rounded uppercase text-[12px] font-bold tracking-wider transition-all
            ${isOutOfStock 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800 active:scale-95'}`}
        >
          {isOutOfStock ? 'Sold Out' : 'Shop Now'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;