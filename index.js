require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello! This is WhatsApp webhook base.");
});

app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "whatsapp_secret_token_123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge); // Must respond with challenge
    } else {
      res.sendStatus(403); // Invalid token
    }
  } else {
    res.sendStatus(400); // Missing mode/token
  }
});

// Listen to messages (POST)
app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log(JSON.stringify(body, null, 2));
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
