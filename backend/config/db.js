const mongoose = require('mongoose');

let isConnectedBefore = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    isConnectedBefore = true;
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // Do not terminate process immediately so the server can run and return helpful error messages
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Warning]: Disconnected from database.');
});

mongoose.connection.on('reconnected', () => {
  console.log('[MongoDB]: Reconnected to database.');
});

const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, isDBConnected };
