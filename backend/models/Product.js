const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true }, 
    model: { type: String, required: true }, 
    category: { type: String, required: true }, 
    type: { type: String, required: true }, 
    
    // --- SMART LOGIC FIELDS ---
    targetSection: { 
        type: String, 
        required: true, 
        enum: ["Slider", "Featured", "Grid", "BrandPage"] 
    },
    productType: { 
        type: String, 
        required: true, 
        enum: ["Mobile", "Accessory"] 
    },
    
    // --- FLEXIBLE SPECIFICATIONS ---
    // 'type: Object' sabse best hai taaki hum kitni bhi keys (RAM, Camera) bhej sakein
    specifications: {
        type: Object,
        default: {}
    },

    image: { type: String, required: true },
    description: { type: String, default: "Premium product by Codelab Shop." }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);