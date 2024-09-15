const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Basic route to confirm server is running
app.get('/', (req, res) => {
  res.send('Welcome to the Nessie API-connected app!');
});

// Route to fetch account details by account ID
app.get('/api/accounts/:id', async (req, res) => {
  const accountId = req.params.id;
  try {
    const response = await axios.get(`http://api.nessieisreal.com/accounts/${accountId}?key=a80f5ed483db326d2e882adae756dab7`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching account details:', error.message);
    res.status(500).json({ error: 'Error fetching account details' });
  }
});

// Route to fetch transactions by account ID
app.get('/api/accounts/:accountId/transactions', async (req, res) => {
  const accountId = req.params.accountId;
  try {
    // Make sure this endpoint matches your Nessie API
    const response = await axios.get(`http://api.nessieisreal.com/accounts/${accountId}/purchases?key=a80f5ed483db326d2e882adae756dab7`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching transactions: ", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





