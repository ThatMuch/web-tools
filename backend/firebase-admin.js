const admin = require("firebase-admin");
const path = require("path");
// Charger les variables d'environnement"
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

try {
	if (!admin.apps.length) {
		if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      throw new Error(
        "La variable d'environnement FIREBASE_SERVICE_ACCOUNT_JSON n'est pas définie."
      );
    }
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_JSON
	);
	if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n"
    );
  }

  console.log("FIREBASE_SERVICE_ACCOUNT_JSON loaded:", !!serviceAccount);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
} catch (error) {
  console.error("Firebase Admin Initialization Error:", error);
}

const db = admin.firestore();
module.exports = { db, admin };
