const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// To store accumulated data
let webhookData = [];

// POST endpoint to add data
app.post('/add-data', (req, res) => {
    const { name, age } = req.body;

    // Validate if both name and age are provided
    if (!name || !age) {
        return res.status(400).json({ status: 'error', message: 'Name and Age are required' });
    }

    // Add the data to webhookData array
    webhookData.push({ name, age });

    res.status(200).json({
        status: 'success',
        message: 'Data added successfully',
        data: { name, age }
    });
});

// Webhook endpoint to view accumulated data
app.get('/webhook-test', (req, res) => {
    // Print the accumulated data
    console.log('Webhook received data:', webhookData);

    // Respond back with the accumulated data
    res.status(200).json({
        status: 'success',
        message: 'Webhook received the data',
        data: webhookData
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});




