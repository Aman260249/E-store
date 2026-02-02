import React, { useState } from 'react';

/**
 * Newsletter Component
 * Captures user emails for marketing updates and offers.
 * Features a minimalist, spacious design tailored for premium e-commerce.
 */
const Newsletter = () => {
  const [email, setEmail] = useState('');

  /**
   * Subscription logic
   * Prevents default form behavior and processes the email address.
   */
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Logic for API integration goes here
    console.log("Subscribing email:", email);
    alert("Thank you for subscribing!");
    setEmail('');
  };

  return (
    /* py-16 and px-6-20 provide the spacious layout typical of luxury retail sites */
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* LEFT SECTION: Branding & Information */}
        <div className="flex flex-col text-center lg:text-left space-y-3">
          <h2 className="text-[20px] md:text-[24px] font-medium uppercase tracking-[0.2em] text-[#1a1a1a]">
            Get Coupons & Offers
          </h2>
          <p className="text-[#666666] text-[13px] md:text-[15px] max-w-[550px] leading-relaxed font-light">
            You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
          </p>
        </div>

        {/* RIGHT SECTION: Subscription Form */}
        <form 
          onSubmit={handleSubscribe} 
          className="flex w-full lg:w-auto items-stretch h-[54px] shadow-sm"
        >
          <input 
            type="email" 
            placeholder="Your email address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            /* Standard professional styling with subtle border-r-0 for unified input-button look */
            className="w-full lg:w-[450px] px-6 border border-[#e5e5e5] border-r-0 focus:outline-none text-[14px] font-light placeholder:text-[#999999]"
          />
          <button 
            type="submit" 
            className="bg-[#333333] text-white px-10 md:px-14 text-[12px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;