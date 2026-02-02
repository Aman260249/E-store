import React, { createContext, useState, useEffect, useContext } from 'react';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage se purana data uthao agar hai toh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('codelab_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Jab bhi cart change ho, use LocalStorage mein save karo
  useEffect(() => {
    localStorage.setItem('codelab_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. ADD TO CART LOGIC
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((item) => item._id === product._id);
      if (isItemInCart) {
        // Agar item pehle se hai, toh quantity badhao
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Agar naya item hai, toh quantity 1 set karke add karo
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`${product.name} added to cart!`);
  };

  // 2. REMOVE FROM CART
  const removeFromCart = (id, isDecreaseOnly = false) => {
  setCartItems((prevItems) => {
    // 1. Pehle wo item dhundo jise kam karna hai
    const existingItem = prevItems.find((item) => item._id === id);

    // 2. Agar isDecreaseOnly true hai AUR quantity 1 se zyada hai
    if (isDecreaseOnly && existingItem.quantity > 1) {
      return prevItems.map((item) =>
        item._id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    }

    // 3. Agar quantity 1 hai ya isDecreaseOnly false hai, toh pura remove kar do
    return prevItems.filter((item) => item._id !== id);
  });
};

  // 3. CLEAR CART
  const clearCart = () => setCartItems([]);

  // 4. TOTAL PRICE CALCULATION
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook use karne ke liye
export const useCart = () => useContext(CartContext);