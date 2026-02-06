import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageBanner from '../components/Banner';
import CategorySlider from './CategorySlider';
import FeaturedCollection from '../components/FeaturedCollection';
import BannerGrid from '../components/BannerGrid';
import TabbedProductGrid from '../components/TabbedProductGrid';
import BrandSelection from '../components/BrandSelection';
import FeaturesTrust from '../components/FeaturesTrust';
import Newsletter from '../components/Newsletter';
import heroImg from '../assets/hero_section.jpg';
import hero_img from '../assets/slice_28.jpg';
import rd_img from '../assets/slice_033.jpg';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [gridProducts, setGridProducts] = useState([]); // Original Source
  const [filteredGrid, setFilteredGrid] = useState([]); // Display Source
  const [selectedCategory, setSelectedCategory] = useState('Best Sellers');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://e-store-dn87.onrender.com/api/products');
        const data = Array.isArray(response.data) ? response.data : [];

        setSliderProducts(data.filter(p => p.targetSection === 'Slider'));
        setFeaturedProducts(data.filter(p => p.targetSection === 'Featured'));
        
        const gridData = data.filter(p => p.targetSection === 'Grid');
        setGridProducts(gridData);
        setFilteredGrid(gridData); // Initially sab dikhao

      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // CLICK LOGIC: Jab side menu click ho
  const handleTypeFilter = (typeName) => {
    // Agar product ke 'type' field mein wo naam hai toh filter karo
    const filtered = gridProducts.filter(p => 
      p.type.toLowerCase().includes(typeName.toLowerCase())
    );
    setFilteredGrid(filtered);
    
    // Smooth scroll to Grid section
    const gridSection = document.getElementById('product-grid');
    if (gridSection) gridSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="mt-4 md:mt-5">
        <ImageBanner imgSrc={heroImg} linkTo="/category/iphone" />
      </div>

      <CategorySlider 
        products={sliderProducts} 
        onTypeSelect={handleTypeFilter} 
      />

      <ImageBanner imgSrc={hero_img} linkTo="/magsafe" />

      <FeaturedCollection 
        products={featuredProducts}
        activeTab={selectedCategory} 
        onTabChange={(tab) => setSelectedCategory(tab)} 
      />

      <BannerGrid />

      <div id="product-grid">
        <TabbedProductGrid products={filteredGrid} loading={loading} />
      </div>

      <ImageBanner imgSrc={rd_img} linkTo="/magsafe" />
      <BrandSelection />
      <FeaturesTrust />
      <Newsletter />
    </div>
  );
};

export default Home;