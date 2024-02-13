import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3001;
const openai = new OpenAI();

app.use(express.json())

app.post('/api', async (req, res) => {
  const incomingChatMessage = req.body.chatMessage
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a kitchen master. You keep track of ingredient stocks, suggest recipes, and offer cooking guidance." },
      { role: "user", content: incomingChatMessage }
    ],
    model: "gpt-3.5-turbo",
  });
  const chatResponse = completion.choices[0].message.content

  res.send(chatResponse);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

