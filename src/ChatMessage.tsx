import { Card, Avatar, Text } from "@chakra-ui/react"
import { ChatMessageProps } from "./types";
import { userMessageConfig, assistantMessageConfig } from "./constants";

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUserMessage = message.role === "user"
  const config = isUserMessage ? userMessageConfig : assistantMessageConfig

  return (
    <Card
      key={message.id}
      direction={config.direction}
      align={"center"}
      bgColor={config.bgColor}
      marginRight={config.marginRight}
      marginLeft={config.marginLeft} >
      <Avatar
        name={config.name}
        src={config.src}
        size='xs' />
      <Text textAlign={config.textAlign}>
        {message.text}
      </Text>
    </Card >
  )
}

export default ChatMessage
