// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

// Connexion à MongoDB
const connectDB = async () => {
  try {
    console.log("🔎 URI Mongo:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté avec succès !");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
