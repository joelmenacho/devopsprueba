// seed/clearProducts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB');

    const result = await Product.deleteMany({});
    console.log(`🧹 Deleted ${result.deletedCount} products`);

  } catch (error) {
    console.error('Error clearing products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from DB');
    process.exit(0);
  }
};

run();
