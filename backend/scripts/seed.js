require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env'),
});

const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    description:
      'Industry-leading noise cancellation with two processors and eight microphones. Ultra-comfortable lightweight design, crystal clear hands-free calling, and up to 30 hours of battery life with quick charging.',
    price: 398.00,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    numReviews: 142,
  },
  {
    name: 'Apple Watch Series 9 GPS 45mm',
    description:
      'Powerful health innovations including blood oxygen and ECG monitoring. Bright Always-On Retina display, crash detection, and water resistance up to 50 meters.',
    price: 429.00,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 18,
    rating: 4.9,
    numReviews: 89,
  },
  {
    name: 'Minimalist Leather Chronograph Watch',
    description:
      'Crafted with surgical-grade 316L stainless steel and genuine Italian leather strap. Features Japanese Miyota quartz movement and scratch-resistant sapphire crystal glass.',
    price: 185.00,
    image:
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 30,
    rating: 4.7,
    numReviews: 64,
  },
  {
    name: 'Polarized Classic Aviator Sunglasses',
    description:
      'High-definition polarized UV400 lenses housed in a durable ultralight titanium frame. Perfect glare reduction and timeless styling suitable for all face shapes.',
    price: 95.00,
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
    category: 'Accessories',
    stock: 45,
    rating: 4.6,
    numReviews: 53,
  },
  {
    name: 'Organic Cotton Everyday Oversized Hoodie',
    description:
      'Premium 450 GSM French terry cotton. Pre-shrunk relaxed fit with double-layered hood, custom ribbed cuffs, and soft brushed interior for everyday cozy warmth.',
    price: 78.00,
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 50,
    rating: 4.5,
    numReviews: 76,
  },
  {
    name: 'Vintage Leather Weekender Travel Duffle Bag',
    description:
      'Handcrafted full-grain distressed cowhide leather. Reinforced brass hardware, dedicated shoe compartment, and padded shoulder strap designed for modern jetsetters.',
    price: 210.00,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    category: 'Fashion',
    stock: 15,
    rating: 4.9,
    numReviews: 41,
  },
  {
    name: 'Precision Barista Pour-Over Gooseneck Kettle',
    description:
      'Variable temperature control with 1200W rapid heating element and built-in stopwatch. Precise gooseneck spout gives you complete flow-rate accuracy for specialty coffee.',
    price: 139.00,
    image:
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 22,
    rating: 4.8,
    numReviews: 97,
  },
  {
    name: 'Smart Ceramic Aromatherapy Ultrasonic Diffuser',
    description:
      'Sculpted artisan ceramic stone exterior. Whisper-quiet ultrasonic technology with ambient warm LED lighting and auto shut-off safety protection.',
    price: 64.00,
    image:
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    category: 'Home & Kitchen',
    stock: 35,
    rating: 4.6,
    numReviews: 38,
  },
  {
    name: 'Ergonomic Wireless Mechanical Keyboard',
    description:
      'Hot-swappable tactile mechanical switches, sound-dampening gasket mount, wireless Bluetooth 5.1 and 2.4GHz connectivity with long-lasting rechargeable battery.',
    price: 129.00,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    category: 'Electronics',
    stock: 40,
    rating: 4.7,
    numReviews: 112,
  },
];

const seedData = async () => {
  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      'mongodb://127.0.0.1:27017/simple_ecommerce';

    // Never print the MongoDB URI because it may contain credentials.
    console.log('Connecting to MongoDB...');

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('[Seed]: Connected to MongoDB.');

    // WARNING: This permanently deletes all existing products
    // in the database selected by MONGODB_URI.
    await Product.deleteMany({});
    console.log('[Seed]: Cleared existing products.');

    const createdProducts = await Product.insertMany(sampleProducts);

    console.log(
      `[Seed]: Successfully inserted ${createdProducts.length} sample products!`
    );

    // Create the demo user only if it does not already exist.
    const demoEmail = 'demo@example.com';

    const demoUser = await User.findOne({ email: demoEmail });

    if (!demoUser) {
      await User.create({
        name: 'Demo Student User',
        email: demoEmail,
        password: 'password123',
        role: 'user',
      });

      console.log('[Seed]: Created demo user.');
    } else {
      console.log('[Seed]: Demo user already exists.');
    }

    console.log('\n========================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY ');
    console.log('========================================\n');
  } catch (error) {
    // Log the error message, never the connection URI.
    console.error('[Seed Error]: Database seeding failed.');
    console.error('[Seed Error Details]:', error.message);

    process.exitCode = 1;
  } finally {
    // Close the connection whether the script succeeds or fails.
    await mongoose.disconnect().catch(() => { });
  }
};

seedData();