import './App.css'
import { Tab, Tabs, TabList, TabPanels, TabPanel, Container } from "@chakra-ui/react"
import { FilesTab, ChatTab } from '.'

function App() {
  return (
    <>
      <Container>
        <h1>KitchenBot</h1>
        <Tabs>
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Files</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ChatTab />
            </TabPanel>
            <TabPanel>
              <FilesTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default App
