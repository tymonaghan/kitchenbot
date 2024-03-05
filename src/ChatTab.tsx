import { useState, useEffect } from "react"
import {
  Box, Card, CardHeader, Heading, CardBody, CardFooter
  , FormControl, Textarea, Container, Button, Spinner, Text
} from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import axios from "axios"
import { ChatMessage } from "."
import { OpenAIThreadMessage, SimplifiedMessage } from "./types"




const ChatTab: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('')
  const [threadMessages, setThreadMessages] = useState<SimplifiedMessage[] | null>(null)
  const [runId, setRunId] = useState<string | null>(null)
  const [runStatus, setRunStatus] = useState<"queued" | "in_progress" | "completed" | "requires action" | "expired" | "cancelling" | "cancelled" | "failed" | null>(null)
  const [myStatus, setMyStatus] = useState<"idle" | "waiting" | "nonOptimal">("idle")

  const retrieveThreadMessages = () => {
    setMyStatus("waiting")
    axios.get('/api/get-thread-messages').then((res) => {
      console.dir(res.data)
      const tempArray: SimplifiedMessage[] = []
      res.data.data.map((message: OpenAIThreadMessage) => {
        tempArray.push({ role: message.role, text: message.content[0] ? message.content[0].text.value : "", id: message.id })
      });
      setThreadMessages(tempArray.reverse());
      setMyStatus("idle")
    })
  }
  useEffect(() => {
    retrieveThreadMessages()
  }, [])

  useEffect(() => { console.dir(threadMessages) }, [threadMessages])

  const sendAssistantMessage = () => {
    setMyStatus("waiting");
    axios.post('/api/assistant', { chatMessage: chatMessage })
      .then((resp) => {
        setRunId(resp.data);
        setMyStatus("idle")
      })
  }

  useEffect(() => {
    if (runId) {
      checkRunStatus()
    }
  }, [runId])


  const checkRunStatus = async () => {
    const intervalId = setInterval(async () => {
      const statusResponse = await axios.get(`/api/check-run/${runId}`);
      setRunStatus(statusResponse.data.status);
      console.log(statusResponse.data.status)
      if (statusResponse.data.status === 'completed') {
        setRunId(null)
        clearInterval(intervalId);
        setChatMessage('')
        retrieveThreadMessages();
      }
    }, 250); // Poll every 0.25 second
  }


  return (
    <Box flex="1">
      < Card >
        <CardHeader>
          <Heading as="h2">Chat</Heading>
        </CardHeader>
        <CardBody>
          <Text size="xs" color="gray">Newest messages at bottom</Text>
          <Container flexDirection={"column"}>
            {threadMessages ? threadMessages.map((threadMessage) => {
              return (
                <ChatMessage message={threadMessage} key={threadMessage.id} />)
            }) : <div>
              <Spinner />
              loading messages
            </div>
            }
          </Container>
          <FormControl>
            <Textarea
              placeholder="type your message here"
              value={chatMessage}
              disabled={myStatus === 'waiting'}
              onChange={(e) => setChatMessage(e.target.value)} />
          </FormControl>
        </CardBody>
        <CardFooter>
          <Button rightIcon={myStatus === "idle" ? <ChatIcon /> : <Spinner />} onClick={sendAssistantMessage} >{myStatus === "idle" ? "ask the assistant" : "please wait..."}</Button>
        </CardFooter>
      </Card >
    </Box >

  )
}

export default ChatTab
