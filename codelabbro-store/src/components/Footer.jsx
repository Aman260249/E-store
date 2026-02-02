import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Linkedin, Instagram } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6"; 

/**
 * Image Assets Import
 * Importing payment icons for Vite to process correctly
 */
import visaCard from '../assets/visa_card.png';
import masterCard from '../assets/master_card.png';
import americanCard from '../assets/american_card.png';
import discoverCard from '../assets/discover_card.png';
import paypalCard from '../assets/paypal_card.png';

/**
 * Footer Component
 * Provides site navigation, contact info, and payment trust badges.
 */
const Footer = () => {
  // Mapping payment methods with imported image assets
  const paymentMethods = [
    { name: 'Visa', src: visaCard },
    { name: 'Mastercard', src: masterCard },
    { name: 'American Express', src: americanCard },
    { name: 'Discover', src: discoverCard },
    { name: 'PayPal', src: paypalCard }
  ];

  return (
    <footer className="w-full bg-[#F3F4F6] pt-16 pb-6 px-6 md:px-12 lg:px-20 border-t border-gray-200 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* TOP SECTION: Information and Navigation Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-black">Company</h4>
            <ul className="space-y-3 text-[#555555] text-[14px] font-normal">
              <li className="hover:text-black cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-black cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-black cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-black">Need Help?</h4>
            <ul className="space-y-3 text-[#555555] text-[14px] font-normal">
              <li className="hover:text-black cursor-pointer transition-colors">Track Order</li>
              <li className="hover:text-black cursor-pointer transition-colors">FAQ's</li>
              <li className="hover:text-black cursor-pointer transition-colors">Refund & Exchange</li>
              <li className="hover:text-black cursor-pointer transition-colors">Shipping Information</li>
            </ul>
          </div>

          {/* Product Catalog Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-black">Latest Models</h4>
            <ul className="space-y-3 text-[#555555] text-[14px] font-normal">
              <li className="hover:text-black cursor-pointer transition-colors">iPhone 15 Pro Max</li>
              <li className="hover:text-black cursor-pointer transition-colors">Galaxy Z Fold5</li>
              <li className="hover:text-black cursor-pointer transition-colors">Galaxy S23 Ultra</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-black">Connect With Us</h4>
            <ul className="space-y-4 text-[#333333] text-[14px]">
              <li className="flex items-center gap-3"><MessageSquare size={18} className="text-black"/> 24/7 Live Chat</li>
              <li className="flex items-center gap-3"><Mail size={18} className="text-black"/> support@techandgears.com</li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-black"/> The Techandgears</li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-black"/> +91-8021511555</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR: Copyright, Payment Icons, and Social Media */}
        <div className="border-t border-gray-300 pt-8 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Copyright Information */}
          <p className="text-[#666666] text-[13px] order-3 lg:order-1 text-center lg:text-left">
            © 2026 Codelabbro.com | All Rights Reserved
          </p>

          {/* Payment Gateway Badges */}
          <div className="flex items-center flex-wrap justify-center gap-3 order-1 lg:order-2">
            <span className="text-[12px] font-semibold text-gray-600 uppercase mr-2">We Accept</span>
            <div className="flex gap-2">
               {paymentMethods.map((card, i) => (
                 <img 
                    key={i} 
                    src={card.src} 
                    alt={card.name} 
                    className="h-6 md:h-8 w-auto object-contain bg-white rounded-sm px-1 border border-gray-200 shadow-sm" 
                 />
               ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 order-2 lg:order-3">
            <span className="text-[12px] font-semibold text-gray-600 uppercase">Follow us :</span>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#3B5998] text-white rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm">
                <Linkedin size={14} fill="currentColor" />
              </div>
              <div className="p-2 bg-black text-white rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm">
                <FaXTwitter size={14} />
              </div>
              <div className="p-2 bg-[#0077B5] text-white rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm">
                <Linkedin size={14} fill="currentColor" />
              </div>
              <div className="p-2 bg-gradient-to-tr from-[#F58529] to-[#D62976] text-white rounded-full hover:scale-110 transition-transform cursor-pointer shadow-sm">
                <Instagram size={14} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;