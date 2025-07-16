// server.js
require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();
const app = express();

// Middleware pour parser le corps en JSON
app.use(express.json());

// Connexion à MongoDB
connectDB();

// ROUTES CRUD

// GET - Récupérer tous les utilisateurs
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // retourne tous les utilisateurs
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Ajouter un nouvel utilisateur
app.post("/api/users", async (req, res) => {
  const { nom, email, age } = req.body;
  console.log("📥 Données reçues :", req.body);
  try {
    const newUser = new User({ nom, email, age });
    await newUser.save();
    res.status(201).json(newUser); // retourne l'utilisateur ajouté
  } catch (err) {
    console.error("Erreur lors du POST :", err);
    res.status(400).json({ message: err.message });
  }
});

// PUT - Modifier un utilisateur par ID
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, email, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nom, email, age },
      { new: true } // retourne le document mis à jour
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Supprimer un utilisateur par ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
