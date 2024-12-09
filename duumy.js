// Certainly! Below is the complete implementation for both the *API to store data and trigger a webhook* as well as the *Webhook API* that receives the data.

// ---

// ### 1. *Backend API* (Node.js + Express + MongoDB)

// #### Step 1: Initialize Project

// In the backend directory, initialize a new Node.js project:

// bash
// mkdir backend
// cd backend
// npm init -y
// npm install express mongoose axios body-parser


// #### Step 2: Create server.js

// Create a file called server.js to handle the data storage and webhook trigger.

// javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MongoDB connection (replace with your MongoDB URI if not local)
mongoose.connect('mongodb://localhost:27017/userWebhook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Function to store user data in MongoDB and trigger a webhook
async function storeDataAndTriggerWebhook(userData) {
  try {
    // Save the user data to MongoDB
    const user = new User(userData);
    await user.save();

    // Fetch the user data from MongoDB (you can customize this if needed)
    const savedUser = await User.findOne({ _id: user._id });

    // Trigger the webhook after fetching data
    const webhookUrl = 'http://localhost:5000/webhook'; // URL of your webhook
    await axios.post(webhookUrl, savedUser);

    return savedUser;
  } catch (error) {
    throw new Error('Error storing data and triggering webhook');
  }
}

// API endpoint to store user data
app.post('/api/users', async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await storeDataAndTriggerWebhook(userData);
    res.status(201).json({ message: 'User data stored and webhook triggered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Start the server
// app.listen(port, () => {
//   console.log(`Backend API running on port ${port}`);
// });


// ### Explanation:
// 1. *MongoDB Connection*: We use Mongoose to connect to a MongoDB database (userdb).
// 2. *User Schema*: Defines the user data schema with name, email, and age.
// 3. *Webhook Trigger*: After saving the user data, the server fetches the saved user and sends it to a webhook (http://localhost:4000/webhook in this case).
// 4. **POST /api/users Endpoint**: This endpoint receives user data, stores it in MongoDB, and triggers the webhook.

// ### Step 3: Run the Backend API Server

// bash
// node server.js


// Your backend API is now running on http://localhost:5000.

// ---

// ### 2. *Webhook API* (Receiver API)

// #### Step 1: Initialize Webhook Project

// In a new directory, initialize another Node.js project for the webhook receiver:

// bash
// mkdir webhook-server
// cd webhook-server
// npm init -y
// npm install express body-parser


// #### Step 2: Create webhook-server.js

// Create a file webhook-server.js that will receive the data from the backend and handle it.

// javascript
// const express = require('express');
// const bodyParser = require('body-parser');

// Create an Express app
// const app = express();
// const port = 4000; // Webhook listener port

// Middleware to parse incoming JSON requests
// app.use(bodyParser.json());

// Route to handle the incoming webhook POST request
app.post('/webhook', (req, res) => {
  const userData = req.body; // The data sent by the backend API

  console.log('Webhook received: ', userData);

  // You can perform any action you need with the data here, for example:
  // - Save to another database
  // - Send an email
  // - Process the data in some way

  // For now, we just send a success response
  res.status(200).json({
    message: 'Webhook received successfully',
    receivedData: userData,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});


// ### Explanation:
// 1. *Webhook Listener*: This server listens for POST requests to the /webhook route.
// 2. *Data Logging*: The incoming data (user data) is logged to the console. You can modify this to handle the data however you need (e.g., saving it to another database, sending an email).
// 3. *Response*: The server responds with a JSON message confirming the data was received.

// #### Step 3: Run the Webhook Server

// bash
// node webhook-server.js


// Your webhook server is now running on http://localhost:4000.

// ---

// ### 3. *Frontend (React)*

// If you have already set up a React app (as shown previously), here's the code to submit the form data.

// #### Step 1: Create UserForm.js

// javascript
// import React, { useState } from 'react';
// import axios from 'axios';

// const UserForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userData = { name, email, age };

//     try {
//       // Send data to the backend API
//       const response = await axios.post('http://localhost:5000/api/users', userData);
//       console.log(response.data);
//       alert('User data submitted and webhook triggered!');
//     } catch (error) {
//       console.error('Error:', error);
//       alert('There was an error submitting the form');
//     }
//   };

//   return (
//     <div>
//       <h1>User Form</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name: </label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Email: </label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Age: </label>
//           <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;


// #### Step 2: Use UserForm in App.js

// javascript
// import React from 'react';
// import UserForm from './UserForm';

// function App() {
//   return (
//     <div className="App">
//       <UserForm />
//     </div>
//   );
// }

// export default App;


// ### Step 3: Run the React App

// Make sure your React app is running with:

// bash
// npm start


// ### 4. *Test the Full Flow*

// 1. *Start the Webhook Server* (http://localhost:4000):
//    bash
//    node webhook-server.js
   

// 2. *Start the Backend API Server* (http://localhost:5000):
//    bash
//    node server.js
   

// 3. *Start your React App* (http://localhost:3000):
//    bash
//    npm start
   

// 4. *Submit the Form* on your React app. This will:
//    - Send the data to the backend (http://localhost:5000/api/users).
//    - The backend will store the data in MongoDB and then trigger the webhook (http://localhost:4000/webhook).
//    - The webhook server will log the received data.

// ---

// ### Conclusion

// You now have the complete setup:
// - *Backend API*: Stores user data in MongoDB and triggers a webhook.
// - *Webhook API*: Receives the data and processes it (e.g., logging, saving to another database).
// - *React Frontend*: Allows users to submit their data, which is then processed by the backend and sent to the webhook.

// This is a complete working example of how to trigger a webhook from a Node.js API and process the data in a separate webhook server.