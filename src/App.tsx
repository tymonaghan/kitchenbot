import { useState } from 'react';
import './App.css'
import {
  Button, Container, HStack, VStack, Card, CardHeader,
  CardBody, CardFooter, Heading, FormControl, FormLabel,
  FormErrorMessage, Textarea
} from '@chakra-ui/react'
import axios from "axios";

function App() {
  const [chatMessage, setChatMessage] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const sendChatMessage = () => {
    axios.post('/api', { chatMessage: chatMessage })
      .then((resp) => setResponseMessage(resp.data))
  }
  return (
    <>
      <Container>
        <Heading as="h1">Kitchenbot</Heading>
        <HStack>
          <VStack>
            <Card>
              <CardHeader>
                <Heading as="h2" size="sm">Files</Heading>
              </CardHeader>
              <p>some files could maybe go here</p></Card>
          </VStack>
          <VStack>
            <Card>
              <CardHeader>
                <Heading as="h2" size="sm">Chat</Heading>
              </CardHeader>
              <CardBody>
                <FormControl>
                  <FormLabel>Ask kitchenbot!</FormLabel>
                  <Textarea value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                </FormControl>
                <Container><p>{responseMessage}</p></Container>
              </CardBody>
              <CardFooter><Button onClick={sendChatMessage}>Send</Button></CardFooter>
            </Card>
          </VStack>
        </HStack>
      </Container>

    </>
  )
}

export default App
