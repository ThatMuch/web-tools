const express = require("express");
const serverless = require("serverless-http");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { admin } = require("../firebase-admin"); // Importer admin

// Charger les variables d'environnement
require("dotenv").config();
console.log(
  "FIREBASE_SERVICE_ACCOUNT_JSON loaded:",
  !!process.env.FIREBASE_SERVICE_ACCOUNT_JSON
);

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const router = express.Router();

// --- ROUTES API ---
router.get("/hello", (req, res) => res.send("Hello World!"));

// POST /api/session-login
// Crée une session en vérifiant un ID Token Firebase
router.post("/session-login", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "ID Token manquant." });
  }

  try {
    // Vérifier le token avec Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
console.log(decodedToken);
    // **Sécurité** : Vérifier si l'utilisateur a le rôle d'admin
    // if (decodedToken.admin !== true) {
    //   return res.status(403).json({ message: "Accès non autorisé." });
    // }

    // Créer notre propre token de session
    const sessionToken = jwt.sign(
      { uid: decodedToken.uid, email: decodedToken.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("session_token", sessionToken, {
      httpOnly: true, // Inaccessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Uniquement en HTTPS
      sameSite: "strict", // Protection CSRF
      maxAge: 3600000, // 1 heure
      path: "/",
    });

    return res.status(200).json({ message: "Session créée avec succès" });
  } catch (error) {
    console.error("Erreur de connexion de session:", error);
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
});

// POST /api/logout
router.post("/logout", (req, res) => {
  res.cookie("session_token", "", { expires: new Date(0), path: "/" });
  res.status(200).json({ message: "Déconnexion réussie" });
});

// GET /api/session
router.get("/session", (req, res) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ isAuthenticated: true, user: { email: decoded.email } });
  } catch (error) {
    return res.status(401).json({ isAuthenticated: false });
  }
});

app.use("/api/", router);

// Exporter le handler pour Netlify
module.exports.handler = serverless(app);
