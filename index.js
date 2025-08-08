const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Verify webhook (GET)
app.get('/webhook', (req, res) => {
  const verifyToken = 'YOUR_VERIFY_TOKEN'; // use env variable in production
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Listen to messages (POST)
app.post('/webhook', (req, res) => {
  const body = req.body;
  console.log(JSON.stringify(body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
