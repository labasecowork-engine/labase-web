export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

export interface ChatbotProps {
  title: string;
  name: string;
  you: string;
  questions: {
    question1: string;
    question2: string;
    question3: string;
  };
}

export interface ChatProps {
  setOpenChat: (open: boolean) => void;
  props: ChatbotProps;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export interface ChatMessageProps {
  message: Message;
  props: ChatbotProps;
}
