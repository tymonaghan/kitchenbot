import express from 'express';
import OpenAI from "openai";
import dotenv from 'dotenv';
import fs from "fs";
import fileUpload from "express-fileupload"
import { Readable } from 'stream';

const THREAD_ID = "thread_qsg8cRPAcFr1pErMT4HplfMc"
const ASSISTANT_ID = 'asst_A32SCMiNWUnxFEJORAE5glr4'
dotenv.config();

const router = express.Router()
const app = express();
const port = 3001;
const openai = new OpenAI();
app.use(fileUpload())


app.use(express.json())
app.use('/api', router)

router.post('/assistant', async (req, res) => {
  const incomingChatMessage = req.body.chatMessage
  try {
    const threadMessages = await openai.beta.threads.messages.create(
      THREAD_ID,
      { role: 'user', content: incomingChatMessage }
    )
    const run = await openai.beta.threads.runs.create(
      THREAD_ID,
      { assistant_id: ASSISTANT_ID }
    )
    console.dir('run started.')
    res.send(run.id)
  } catch (error) {
    console.dir(error)
    res.send(false)
  }
})





router.get('/check-run/:runId', async (req, res) => {
  const runId = req.params.runId
  if (!runId) {
    console.dir('no run ID')
    res.send(null)
  }
  try {
    const run = await openai.beta.threads.runs.retrieve(
      THREAD_ID,
      runId
    )
    res.send(run)
  } catch (error) {
    console.dir(error)
    res.send(null)
  }
})

router.get('/get-thread-messages', async (req, res) => {
  try {
    const threadMessages = await openai.beta.threads.messages.list(
      THREAD_ID, { limit: 6, order: "desc" }
    );
    res.send(threadMessages)
  } catch (error) {
    console.dir(error)
  }
})

// router.get('/get-single-message', async (req, res) => {
//   const runId = req.params.runId
//   try {
//     const threadMessages = await openai.beta.threads.messages.list(
//       THREAD_ID, { limit: 1 }
//     );
//     res.send(threadMessages)
//   } catch (error) {
//     console.dir(error)
//   }
// })

router.get('/files', async (req, res) => {
  const assistantFiles = await openai.beta.assistants.files.list(
    ASSISTANT_ID
  )
  res.send(assistantFiles.data)
})

router.get('/file_details/:id', async (req, res) => {
  const fileId = req.params.id
  const fileDetails = await openai.files.retrieve(fileId)

  res.send(fileDetails)
})

app.listen(port, () => {
  console.log(`advocacy-ai app express server listening at http://localhost:${port}`)
})
