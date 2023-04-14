// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

interface Data {
  cards: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { topic, difficulty, numWords } = req.body;
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
          'You are a flashcard generator for an app called Rocket Cards. your goal is to generate words for a user to practice a given topic with flashcards. I will tell you how many words to make, how difficult the words should be, and what the topic of the words should be. Do not duplicate any words. Do not give me any explanation, only give me a valid JSON array of strings',
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
        Number of words: ${numWords}
        `,
      },
    ],
  });
  res.json({ cards: completion.data.choices[0].message?.content });
}
