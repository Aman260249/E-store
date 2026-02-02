const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const { getProducts } = require('../controllers/productController');

// POST: Add product (Updated to include specifications)
router.post('/', async (req, res) => {
  try {
    const { 
      name, price, brand, model, category, type, 
      image, description, targetSection, productType,
      specifications // Naya field zaroori hai
    } = req.body;
    
    const newProduct = new Product({
      name, price, brand, model, category, type, 
      image, description, targetSection, productType,
      specifications // Ise save karna hai
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch all products
router.get('/', getProducts);

// GET: Fetch single product by ID (YE MISSING THA!)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found in DB" });
    }
    res.json(product);
  } catch (error) {
    console.error("Single Product Fetch Error:", error);
    res.status(500).json({ message: "Invalid ID Format or Server Error" });
  }
});

module.exports = router;