import React from 'react';
import { Award, ShieldCheck, CreditCard } from 'lucide-react';

/**
 * FeaturesTrust Component
 * Displays the core value propositions and trust signals of the brand.
 * Designed with a premium dark theme and minimalist iconography.
 */
const FeaturesTrust = () => {
  const features = [
    {
      icon: <Award className="w-10 h-10 lg:w-14 lg:h-14" strokeWidth={1} />,
      title: "PREMIUM QUALITY",
      description: "All our products are crafted with 100% premium grade materials."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 lg:w-14 lg:h-14" strokeWidth={1} />,
      title: "SUPERIOR DURABILITY",
      description: "Rigorous testing ensures that every piece meets our high standards of excellence."
    },
    {
      icon: <CreditCard className="w-10 h-10 lg:w-14 lg:h-14" strokeWidth={1} />,
      title: "SECURE PAYMENTS",
      description: "Industry-standard encryption to ensure your transactions are always safe."
    }
  ];

  return (
    /* Section Container with Dark Navy Background */
    <section className="w-full bg-[#020617] text-white py-12 lg:py-16 px-6 flex flex-col items-center">
      
      {/* Main Branding Message */}
      <h2 className="text-[22px] md:text-[32px] lg:text-[40px] font-bold tracking-[0.2em] text-center mb-12 lg:mb-14 uppercase">
        We want you to express yourself
      </h2>

      {/* Trust Badges Grid */}
      <div className="w-full max-w-[1440px] grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-4 px-2 md:px-10">
        {features.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            
            {/* Minimalist Icon with Thin Stroke */}
            <div className="mb-4 text-white opacity-90">
              {item.icon}
            </div>

            {/* Feature Title */}
            <h3 className="text-[14px] md:text-[15px] lg:text-[18px] font-bold tracking-[0.1em] mb-2 uppercase">
              {item.title}
            </h3>

            {/* Feature Description */}
            <p className="text-gray-400 text-[12px] md:text-[13px] lg:text-[15px] leading-relaxed max-w-[260px] font-light">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesTrust;