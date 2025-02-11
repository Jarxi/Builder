require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/followup', async (req, res) => {
    try {
      const { messages } = req.body;
  
      let systemMessage = "You are a startup expert and you are helping the user to start a business.";
  
      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        system: systemMessage,
        max_tokens: 4096,
        messages: messages,
      });
  
      res.json(response);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    let systemMessage = "You are a startup expert and you are helping the user to start a business.";
    let userMessage = "Elaborate the user's business idea into a detailed business plan with less than 80 words: " + messages[messages.length - 1].content;
    
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      system: systemMessage,
      max_tokens: 4096,
      messages: messages,
    });

    console.log('server response', response);

    res.json(response);
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 