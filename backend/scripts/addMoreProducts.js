/**
 * Safe, Non-Destructive Catalogue Importer / Seeder
 *
 * SAFETY RULES ENFORCED:
 * 1. NEVER calls Product.deleteMany({}) or destroys existing inventory.
 * 2. NEVER logs, prints, or exposes MongoDB connection strings or credentials.
 * 3. Preserves all existing product documents, IDs, stock levels, and order relationships.
 * 4. Idempotent: Can be run multiple times safely. Existing products are skipped so their
 *    live stock counts (decremented by actual orders) are never reset or overwritten.
 * 5. Fails cleanly without falling back to an unconfigured local database if Atlas is unreachable.
 */

const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const mongoose = require('mongoose');
const Product = require('../models/Product');
const catalogueProducts = require('../data/catalogueData');

// Helper to escape regex special characters
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const safeSeedCatalogue = async () => {
  let isConnected = false;

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri || typeof mongoUri !== 'string' || mongoUri.trim() === '') {
      console.error(
        '[Safe Catalogue Seeder Error]: MONGODB_URI is not set or empty in backend/.env. Cannot proceed.'
      );
      process.exitCode = 1;
      return;
    }

    console.log('[Safe Catalogue Seeder]: Connecting to configured MongoDB instance...');

    // Connect with strict timeout to prevent indefinite hanging
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = true;
    console.log('[Safe Catalogue Seeder]: Successfully connected to database.');

    const initialTotal = await Product.countDocuments();
    console.log(`[Safe Catalogue Seeder]: Initial products in database: ${initialTotal}`);
    console.log(
      `[Safe Catalogue Seeder]: Evaluating ${catalogueProducts.length} candidate catalogue items...`
    );

    let insertedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const item of catalogueProducts) {
      try {
        // Case-insensitive exact name match to detect existing product
        const trimmedName = item.name.trim();
        const existing = await Product.findOne({
          name: { $regex: new RegExp(`^${escapeRegex(trimmedName)}$`, 'i') },
        });

        if (existing) {
          // Rule: DO NOT overwrite existing product or its stock!
          skippedCount++;
        } else {
          // Validate schema compliance before saving
          const productDoc = new Product(item);
          await productDoc.save();
          insertedCount++;
        }
      } catch (itemErr) {
        errorCount++;
        errors.push({ name: item.name, error: itemErr.message });
      }
    }

    const finalTotal = await Product.countDocuments();

    console.log('\n======================================================');
    console.log('       SAFE CATALOGUE IMPORT SUMMARY                 ');
    console.log('======================================================');
    console.log(`  Candidate items processed : ${catalogueProducts.length}`);
    console.log(`  New products inserted     : ${insertedCount}`);
    console.log(`  Existing products skipped : ${skippedCount} (stock & IDs 100% preserved)`);
    console.log(`  Errors encountered        : ${errorCount}`);
    console.log(`  Initial database count    : ${initialTotal}`);
    console.log(`  Final database count      : ${finalTotal}`);
    console.log('======================================================\n');

    if (errorCount > 0) {
      console.warn('[Safe Catalogue Seeder]: Some items failed to import:');
      errors.slice(0, 5).forEach((e) => console.warn(` - ${e.name}: ${e.error}`));
      process.exitCode = 1;
    } else {
      console.log('[Safe Catalogue Seeder]: Completed successfully without data loss.');
    }
  } catch (error) {
    console.error(
      '[Safe Catalogue Seeder Fatal Error]: Could not connect to or update the database.'
    );
    console.error('[Reason]:', error.message);
    process.exitCode = 1;
  } finally {
    if (isConnected) {
      try {
        await mongoose.disconnect();
        console.log('[Safe Catalogue Seeder]: Database connection closed cleanly.');
      } catch (disconnectErr) {
        console.warn('[Safe Catalogue Seeder]: Error closing connection:', disconnectErr.message);
      }
    }
  }
};

if (require.main === module) {
  safeSeedCatalogue();
}

module.exports = { safeSeedCatalogue };
