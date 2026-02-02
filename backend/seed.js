const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const dummyProducts = [
  {
    name: "iPhone 15 Pro Max Classic Hybrid Case",
    price: 1803,
    image: "https://via.placeholder.com/300",
    brand: "Apple",
    model: "iPhone 15 Pro Max",
    category: "Best Sellers"
  },
  {
    name: "Samsung S23 Ultra MagSafe Case",
    price: 1589,
    image: "https://via.placeholder.com/300",
    brand: "Samsung",
    model: "S23 Ultra",
    category: "New Arrivals"
  },
  {
    name: "iPhone 14 Pro Clear Case",
    price: 1103,
    brand: "Apple",
    model: "iPhone 14 Pro",
    category: "Featured",
    image: "https://via.placeholder.com/300"
  }
];

const seedDB = async () => {
  await Product.deleteMany({}); // Purana data saaf
  await Product.insertMany(dummyProducts);
  console.log("Data Seeded! 🚀");
  process.exit();
};

seedDB();