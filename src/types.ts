interface SimplifiedMessage {
  role: "assistant" | "user";
  text: string;
  id: string;
}

interface OpenAIThreadMessage {
  id: string,
  object: "thread.message",
  created_at: number,
  thread_id: number,
  role: "user" | "assistant",
  content: {
    type: string,
    text: {
      value: string,
      annotations: string[]
    }
  }[],
  file_ids: string[],
  assistant_id: string | null,
  run_id: string | null,
}

interface ChatMessageProps {
  message: SimplifiedMessage;
}
interface ChatMessageConfig {
  direction: "row" | "row-reverse";
  align: "center";
  textAlign: "left" | "center" | "right";
  bgColor: "aliceblue" | "lightblue";
  name: string;
  src: string | undefined,
  marginRight: string;
  marginLeft: string

}

export type { SimplifiedMessage, OpenAIThreadMessage, ChatMessageProps, ChatMessageConfig }
