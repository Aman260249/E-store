const Product = require('../models/Product');

// 1. Naya Product Add karne ke liye (Dashboard se call hoga)
exports.addProduct = async (req, res) => {
    try {
        const { name, price, brand, model, category, type, image } = req.body;

        const newProduct = new Product({
            name,
            price,
            brand,
            model,
            category,
            type,
            image
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product Added Successfully!", product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error saving product", error: error.message });
    }
};

// 2. Saare Products Get karne ke liye (Frontend components ke liye)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};