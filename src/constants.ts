import { ChatMessageConfig } from "./types"
const userMessageConfig: ChatMessageConfig = {
  direction: "row",
  align: "center",
  textAlign: "right",
  bgColor: "lightblue",
  name: "You",
  src: "/biopic-ico.jpg",
  marginRight: "2rem",
  marginLeft: "0"
}

const assistantMessageConfig: ChatMessageConfig =
{
  direction: "row-reverse",
  align: "center",
  textAlign: 'left',
  bgColor: "aliceblue",
  name: "A. I.",
  src: undefined,
  marginRight: "0",
  marginLeft: "2rem"
}


export { userMessageConfig, assistantMessageConfig }
