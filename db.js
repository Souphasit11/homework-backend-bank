const admin = require('firebase-admin');
const config = require("./config");
const serviceAccount = require("./serviceAccountKey.json")
const firebaseConfig = config.firebaseConfig;


const database = admin.initializeApp({
    firebaseConfig,
    credential: admin.credential.cert(serviceAccount)
  });

module.exports = database;

