// Import necessary modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateResponse } from './openai';

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 3001;

// Use CORS middleware to allow cross-origin requests
app.use(cors());
// Use JSON middleware to parse JSON request bodies
app.use(express.json());

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('AI Assistant API is running');
});

// Define a route for chat functionality
app.post('/api/chat', async (req, res) => {
  const userInput = req.body.message;
  try {
    // Generate a response using the OpenAI API
    const response = await generateResponse(userInput);
    res.json({ message: response });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});