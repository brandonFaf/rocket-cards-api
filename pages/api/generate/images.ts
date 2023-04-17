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
      const { words } = req.body as { words: string[] };
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      //   const openai = new OpenAIApi(configuration);
      //   const imagePromises = words.map((word: string) => {
      //     const image = openai.createImage({
      //       prompt: word,
      //       size: '512x512',
      //       n: 3,
      //     });
      //     return image;
      //   });
      //   console.log('imagePromises:', imagePromises);
      //   const imageRes = await Promise.all(imagePromises);
      //   const data = imageRes.map((image, i) => {
      //     return {
      //       word: words[i],
      //       images: image.data.data,
      //     };
      //   });
      const data = [
        {
          word: 'Pomegranate',
          images: [
            {
              url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-mHDapj3eaZIbosJvzT22WyB1/user-09W8ezywC2u7wEREql8w1hKs/img-TQ9xDDA0u6nL4sNzest1FzBN.png?st=2023-04-16T02%3A31%3A43Z&se=2023-04-16T04%3A31%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-16T01%3A29%3A12Z&ske=2023-04-17T01%3A29%3A12Z&sks=b&skv=2021-08-06&sig=5vufQuGbt4N4BD67uQdpJ5ZIXoULLA3KQhcVeFS6n0Y%3D',
            },
            {
              url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-mHDapj3eaZIbosJvzT22WyB1/user-09W8ezywC2u7wEREql8w1hKs/img-PxmNtNYme47q1FjK5dny9My0.png?st=2023-04-16T02%3A31%3A43Z&se=2023-04-16T04%3A31%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-16T01%3A29%3A12Z&ske=2023-04-17T01%3A29%3A12Z&sks=b&skv=2021-08-06&sig=f0fqgPbWS/fXpz5ZNOVgeOU4Yhyu1TFFfjrGoyHEwuI%3D',
            },
            {
              url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-mHDapj3eaZIbosJvzT22WyB1/user-09W8ezywC2u7wEREql8w1hKs/img-gYSyC3ptSJdRJGYQMIJTlfZH.png?st=2023-04-16T02%3A31%3A43Z&se=2023-04-16T04%3A31%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-16T01%3A29%3A12Z&ske=2023-04-17T01%3A29%3A12Z&sks=b&skv=2021-08-06&sig=Sd1qhSw6s92RxlyLpKGHGGZGG6KNY4uzXJKqVn3p7v0%3D',
            },
          ],
        },
        {
          word: 'Guava',
          images: [
            {
              url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-mHDapj3eaZIbosJvzT22WyB1/user-09W8ezywC2u7wEREql8w1hKs/img-UztPrNbsazKlWb7ffgkD1nfY.png?st=2023-04-16T02%3A31%3A43Z&se=2023-04-16T04%3A31%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-16T01%3A06%3A09Z&ske=2023-04-17T01%3A06%3A09Z&sks=b&skv=2021-08-06&sig=e58bAwN5XyDrIrRNOLTT3P0kWpTug8G96P9Fndx0zc0%3D',
            },
            {
              url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-mHDapj3eaZIbosJvzT22WyB1/user-09W8ezywC2u7wEREql8w1hKs/img-hyI520cvWMcLSrJXF8mVTtPo.png?st=2023-04-16T02%3A31%3A43Z&se=2023-04-16T04%3A31%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-16T01%3A06%3A09Z&ske=2023-04-17T01%3A06%3A09Z&sks=b&skv=2021-08-06&sig=p9lWbw4HeXJ8e8xDHJsKLi17hzU1HgsSic7bwMgqGgk%3D',
            },
            {
              url: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-mHDapj3eaZIbosJvzT22WyB1/user-09W8ezywC2u7wEREql8w1hKs/img-WpGNL8nG61jQuos0URgB1Px9.png?st=2023-04-16T02%3A31%3A43Z&se=2023-04-16T04%3A31%3A43Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-16T01%3A06%3A09Z&ske=2023-04-17T01%3A06%3A09Z&sks=b&skv=2021-08-06&sig=ZZvKwEyyT/A%2BOYOixVcnO0hwrCT9b8G99Vy5h2S6gko%3D',
            },
          ],
        },
      ];
      resolve(data);
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
