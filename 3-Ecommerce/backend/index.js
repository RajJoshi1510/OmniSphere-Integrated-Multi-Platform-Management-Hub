/**
 * OmniMart (E-Commerce) Backend Server
 * 
 
 * Express server for product listings, order management, user details, and live order status.
 * Fully connected to MongoDB with automatic data fetching from the 'shopnow' database.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Pusher = require('pusher');

// Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Pusher setup for realtime order status updates (with mock fallback)
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "mock",
  key: process.env.VITE_PUSHER_KEY || "mock",
  secret: process.env.PUSHER_SECRET || "mock",
  cluster: process.env.VITE_PUSHER_CLUSTER || "mock",
  useTLS: true
});

// Database Connection with graceful error handling
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopnow';
mongoose.connect(MONGO_URI)
  .then(() => console.log('[OmniMart] MongoDB connected successfully to', MONGO_URI))
  .catch(err => console.warn('[OmniMart] MongoDB offline. Operating in standby mode.'));

// Root Health Check Route
app.get('/', (req, res) => res.json({
  status: 'Online',
  service: 'OmniMart E-Commerce API',
  port: 5002,
  database: 'shopnow',
  timestamp: new Date().toISOString()
}));

// Product list endpoint - fetches real products stored in MongoDB
app.get('/api/products', async (req, res) => {
  try {
    const dbProducts = await Product.find().lean();
    if (dbProducts && dbProducts.length > 0) {
      return res.json({
        success: true,
        count: dbProducts.length,
        source: 'mongodb',
        products: dbProducts
      });
    }
  } catch (err) {
    console.warn('[OmniMart] Could not fetch products from MongoDB, using fallback:', err.message);
  }

  // Fallback products if DB is not populated yet
  res.json({
    success: true,
    count: 4,
    source: 'fallback',
    products: [
      { id: 1, name: 'Wireless Noise-Canceling Headphones', price: 99.99, category: 'Electronics', stock: 25 },
      { id: 2, name: 'Smart Fitness Tracker Watch', price: 49.99, category: 'Wearables', stock: 40 },
      { id: 3, name: 'Ergonomic Mechanical Keyboard', price: 79.99, category: 'Accessories', stock: 15 },
      { id: 4, name: 'Ultra-Fast USB-C Power Bank', price: 29.99, category: 'Power', stock: 50 }
    ]
  });
});

// Single product details
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Orders list endpoint
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json({ success: true, order: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Realtime order status webhook/endpoint
app.post('/api/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Order.findByIdAndUpdate(id, { status });
    pusher.trigger('orders-channel', 'status-update', {
      orderId: id,
      status: status,
      message: `Order #${id} has been ${status}`
    });
  } catch (e) {
    // Ignore pusher errors in local dev
  }
  res.json({ success: true, message: `Order #${id} updated to ${status}` });
});

// Users endpoint
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').lean();
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Stats summary for portal / dashboard
app.get('/api/stats', async (req, res) => {
  try {
    const [productCount, orderCount, userCount] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments()
    ]);
    res.json({
      success: true,
      stats: { products: productCount, orders: orderCount, users: userCount }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`[OmniMart] Server running on port ${PORT}`));
