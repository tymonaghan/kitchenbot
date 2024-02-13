import express from 'express';

const app = express();
const port = 3001;

app.use(express.json())

app.post('/api', (req, res) => {
  const incomingChatMessage = req.body.chatMessage
  res.send(`express is connected; your input was ${incomingChatMessage}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

