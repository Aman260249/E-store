const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const Order = require('./models/order');

dotenv.config();
connectDB();

const app = express(); // Pehle app initialize karo

// Middlewares
app.use(cors({
  origin: 'https://codelabshop.vercel.app', // Apna Vercel link yahan dalo
  credentials: true
}));

app.use(express.json());

// Routes - Iska matlab URL banega: http://localhost:5000/api/auth/...
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Routes ke section mein ye POST api add karo

app.post('/api/orders', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, orderId: savedOrder._id });
    } catch (error) {
        console.error("Order Save Error:", error);
        res.status(500).json({ success: false, message: "Server Error: Order save nahi ho paya" });
    }
});

app.get('/api/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // New orders upar dikhenge
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Orders fetch nahi ho paye" });
    }
});

app.get('/', (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));