// models/User.js
const mongoose = require("mongoose");

// Définir le schéma de l'utilisateur
const UserSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
  },
  { timestamps: true }
); // Ajoute createdAt et updatedAt

module.exports = mongoose.model("User", UserSchema);
