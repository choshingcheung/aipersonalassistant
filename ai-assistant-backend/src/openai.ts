// Import the OpenAI library
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new instance of the OpenAI class
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a response using the OpenAI API
export async function generateResponse(userInput: string): Promise<string> {
  try {
    // Call the OpenAI API to generate a chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    });

    // Return the generated response, or a default message if no response is generated
    return completion.choices[0].message?.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    // Log any errors and return an error message
    console.error('Error calling OpenAI:', error);
    return "An error occurred while processing your request.";
  }
}