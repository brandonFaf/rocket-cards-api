import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, async (result: any) => {
      console.log('req.body:', req.body);
      const { topic, difficulty, numCards } = req.body;
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a word generator. your goal is to generate words. I will tell you how many words to make give me exactly that many words, no more, no less. I will tell you how difficult the words should be, and what the topic of the words should be. Do not duplicate any words. Do not give me any explanation, ONLY give me a valid JSON array of strings containing the words',
          },
          {
            role: 'user',
            content: `
        Topic: Animals 
        Difficulty: Medium
        Number of words: 10
        `,
          },
          {
            role: 'assistant',
            content:
              '["Chimpanzee", "Platypus", "Koala", "Hippopotamus", "Octopus", "Kangaroo", "Cheetah", "Rhinoceros", "Ostrich", "Armadillo"]',
          },
          {
            role: 'user',
            content: `
        Topic: Animals 
        Difficulty: Easy
        Number of words: 10
        `,
          },
          {
            role: 'assistant',
            content:
              '["Dog", "Cat", "Bird", "Fish", "Mouse", "Rabbit", "Hamster", "Turtle", "Horse", "Cow"]',
          },
          {
            role: 'user',
            content: `
        Topic: ${topic}
        Difficulty: ${difficulty}
        Number of words: ${numCards}
        `,
          },
        ],
      });
      resolve({ cards: completion.data.choices[0].message?.content });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  const result = await runMiddleware(req, res, cors);

  // Rest of the API logic
  res.json(result);
}
