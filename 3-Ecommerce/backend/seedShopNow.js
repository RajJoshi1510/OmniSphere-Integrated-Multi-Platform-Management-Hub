/**
 * ShopNow (E-Commerce) - Database Seeder
 * 
 * Populates local MongoDB 'shopnow' database with demo products, admin, and a user.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./models/Product');
const User = require('./models/User');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopnow';

const sampleProducts = [
  {
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30hr battery, and crystal clear audio.",
    price: 99.99,
    oldPrice: 149.99,
    stock: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.8,
    reviewsCount: 120
  },
  {
    name: "Smart Fitness Tracker Watch",
    description: "Track steps, heart rate, sleep, and workouts. Water-resistant with 7-day battery life.",
    price: 49.99,
    oldPrice: 79.99,
    stock: 40,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.5,
    reviewsCount: 88
  },
  {
    name: "Ergonomic Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX switches and wrist rest for all-day comfort.",
    price: 79.99,
    oldPrice: 109.99,
    stock: 15,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 4.7,
    reviewsCount: 65
  },
  {
    name: "Ultra-Fast USB-C Power Bank",
    description: "20000mAh portable charger with 65W USB-C PD fast charging. Charges laptop and phone simultaneously.",
    price: 29.99,
    oldPrice: 44.99,
    stock: 50,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    rating: 4.6,
    reviewsCount: 200
  },
  {
    name: "Premium Leather Laptop Bag",
    description: "Handcrafted genuine leather messenger bag fits 15.6\" laptops with padded compartments.",
    price: 129.99,
    oldPrice: 179.99,
    stock: 12,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    rating: 4.9,
    reviewsCount: 45
  },
  {
    name: "4K Ultra HD Webcam",
    description: "Professional 4K webcam with auto-focus, noise-canceling mic, and adjustable ring light.",
    price: 69.99,
    oldPrice: 99.99,
    stock: 30,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500",
    rating: 4.4,
    reviewsCount: 78
  },
  {
    name: "Bluetooth Speaker Portable",
    description: "Waterproof portable speaker with 360° surround sound, 24hr playtime, and deep bass.",
    price: 39.99,
    oldPrice: 59.99,
    stock: 35,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    rating: 4.3,
    reviewsCount: 155
  },
  {
    name: "Smart Home Security Camera",
    description: "1080p WiFi security camera with night vision, motion detection, and 2-way audio.",
    price: 44.99,
    oldPrice: 69.99,
    stock: 20,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500",
    rating: 4.6,
    reviewsCount: 92
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for ShopNow seeding...");

    // Seed products
    await Product.deleteMany({});
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${products.length} products.`);

    // Seed admin user
    const adminPassword = await bcrypt.hash('password123', 10);
    await User.findOneAndUpdate(
      { email: 'admin@shopnow.com' },
      { name: 'ShopNow Admin', email: 'admin@shopnow.com', password: adminPassword, role: 'admin' },
      { upsert: true, new: true }
    );
    console.log("✅ Admin: admin@shopnow.com / password123");

    // Seed regular user
    const userPassword = await bcrypt.hash('password123', 10);
    await User.findOneAndUpdate(
      { email: 'raj.joshi@example.com' },
      { name: 'Raj Joshi', email: 'raj.joshi@example.com', password: userPassword, role: 'client' },
      { upsert: true, new: true }
    );
    console.log("✅ User: raj.joshi@example.com / password123");

    // Create a demo order
    const Order = require('./models/Order');
    const admin = await User.findOne({ email: 'admin@shopnow.com' });
    await Order.deleteMany({});
    await Order.create({
      user: admin._id,
      items: [
        { product: products[0]._id, qty: 1, price: products[0].price },
        { product: products[2]._id, qty: 2, price: products[2].price }
      ],
      shippingInfo: { name: 'ShopNow Admin', phone: '9876543210', address: '42 MG Road', city: 'Mumbai', zip: '400001' },
      paymentMethod: 'card',
      paymentStatus: 'completed',
      status: 'delivered',
      total: products[0].price + products[2].price * 2,
      tva: 15.99
    });
    console.log("✅ Seeded 1 demo order.");

    await mongoose.disconnect();
    console.log("🎉 ShopNow database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
