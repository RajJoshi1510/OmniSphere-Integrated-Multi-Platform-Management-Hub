/**
 * Yummix Food Delivery - Database Seeder
 * 
 * Simple English Comment:
 * Populates local MongoDB 'yummix' database with restaurants and delicious food items
 * so that food cards, prices, ratings, and categories are populated and workable!
 */

import mongoose from 'mongoose';
import restaurantModel from '../models/restaurantModel.js';
import foodModel from '../models/foodModel.js';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yummix';

const sampleFoods = [
  {
    name: "Hyderabadi Chicken Biryani",
    description: "Fragrant basmati rice cooked with spiced tender chicken and saffron herbs.",
    price: 280,
    category: "Biriyani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500",
    prepTime: 30,
    spiceLevel: "Hot",
    avgRating: 4.8,
    ratingCount: 120
  },
  {
    name: "Royal Mutton Biryani",
    description: "Slow-cooked mutton dum biryani served with spicy salan and fresh raita.",
    price: 360,
    category: "Biriyani",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500",
    prepTime: 35,
    spiceLevel: "Hot",
    avgRating: 4.9,
    ratingCount: 88
  },
  {
    name: "Paneer Tikka Roll",
    description: "Charcoal grilled paneer cubes wrapped in layered flaky paratha with mint chutney.",
    price: 160,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500",
    prepTime: 20,
    spiceLevel: "Medium",
    avgRating: 4.6,
    ratingCount: 75
  },
  {
    name: "Chicken Kathi Roll",
    description: "Spicy roasted chicken strips with pickled onions and tangy sauces in crisp roti.",
    price: 190,
    category: "Rolls",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500",
    prepTime: 20,
    spiceLevel: "Hot",
    avgRating: 4.7,
    ratingCount: 92
  },
  {
    name: "Farmhouse Margherita Pizza",
    description: "Classic Italian thin crust topped with mozzarella, basil, and San Marzano tomato sauce.",
    price: 320,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    prepTime: 25,
    spiceLevel: "Mild",
    avgRating: 4.7,
    ratingCount: 150
  },
  {
    name: "Spicy Pepperoni Pizza",
    description: "Loaded with double pepperoni, garlic butter crust, and melted gouda cheese.",
    price: 420,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500",
    prepTime: 25,
    spiceLevel: "Medium",
    avgRating: 4.9,
    ratingCount: 130
  },
  {
    name: "Creamy Alfredo Pasta",
    description: "Penne pasta tossed in rich parmesan garlic white sauce with fresh mushrooms.",
    price: 240,
    category: "Pasta",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500",
    prepTime: 20,
    spiceLevel: "Mild",
    avgRating: 4.5,
    ratingCount: 64
  },
  {
    name: "Hakka Veg Noodles",
    description: "Wok-tossed noodles with shredded bell peppers, cabbage, and roasted sesame.",
    price: 180,
    category: "Noodles",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500",
    prepTime: 15,
    spiceLevel: "Medium",
    avgRating: 4.4,
    ratingCount: 82
  },
  {
    name: "Special Paneer Butter Masala",
    description: "Rich cottage cheese cubes simmered in velvety tomato cashew gravy.",
    price: 260,
    category: "Pure Veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    prepTime: 25,
    spiceLevel: "Mild",
    avgRating: 4.8,
    ratingCount: 140
  },
  {
    name: "Belgian Chocolate Truffle Cake",
    description: "Decadent dark chocolate sponge layered with silky ganache and cocoa dust.",
    price: 220,
    category: "Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    prepTime: 10,
    spiceLevel: "Mild",
    avgRating: 4.9,
    ratingCount: 180
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for Yummix seeding...");

    // Find or create default restaurant
    let restaurant = await restaurantModel.findOne();
    if (!restaurant) {
      restaurant = await restaurantModel.create({
        restaurantName: "Royal Spice Kitchen",
        ownerName: "Chef Raj",
        email: "chef@royalspice.local",
        password: "hashedpassword123",
        phone: "9876543210",
        address: "42 MG Road, Downtown",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
        isApproved: true,
        location: { lat: 19.076, lng: 72.877 }
      });
      console.log("Created default restaurant:", restaurant.restaurantName);
    }

    // Clear existing foods and re-seed
    await foodModel.deleteMany({});
    const foodsToInsert = sampleFoods.map(f => ({
      ...f,
      restaurantId: restaurant._id,
      isAvailable: true
    }));

    const inserted = await foodModel.insertMany(foodsToInsert);
    console.log(`✅ Successfully seeded ${inserted.length} foods into MongoDB 'yummix' database!`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();

