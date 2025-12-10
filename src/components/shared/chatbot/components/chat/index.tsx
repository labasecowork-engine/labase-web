import React, { useState, useRef, useEffect } from "react";
import { ChatInput, ChatMessage, TypingIndicator } from "../";
import { initialMessages } from "../../data";
import apiClient from "@/services";
import type { ChatState, Message, ChatProps } from "../../types";
import { AxiosError } from "axios";

const getBotResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await apiClient.post("/chatbot/send-message", {
      message: userMessage,
    });

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return (
        error.response?.data?.message ||
        error.message ||
        "Error al procesar el mensaje"
      );
    }
    return "Error al procesar el mensaje";
  }
};

export const Chat: React.FC<ChatProps> = ({ setOpenChat, props }) => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: initialMessages,
    isTyping: false,
  });

  const [isHome, setIsHome] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleSendMessage = async (content: string) => {
    setIsHome(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    const botResponseText = await getBotResponse(content);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: botResponseText,
      sender: "bot",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      isTyping: false,
    }));
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto  shadow-lg overflow-hidden bg-white fixed bottom-0 right-0 md:bottom-4 md:right-4 z-40 rounded-m">
      <div className="p-2 bg-white flex items-center justify-between border-b border-stone-200">
        <div className="flex items-center ">
          {!isHome && (
            <button
              className="p-1 rounded-full hover:bg-stone-100 transition-all"
              onClick={() => setIsHome(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-stone-600"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </button>
          )}
          <p className="text-sm font-semibold text-stone-600 ml-2">
            {props.name}
          </p>
        </div>

        <button
          className="p-1 rounded-full hover:bg-stone-100 transition-all"
          onClick={() => setOpenChat(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 text-stone-600"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isHome ? (
        <div className="flex-1 p-4 overflow-y-auto bg-white flex items-center justify-center relative">
          <div className="relative z-10">
            <h1 className="text-xl font-bold text-stone-700 whitespace-pre-line">
              {props.title}
            </h1>
            <div className="flex items-center gap-2 justify-start mt-6 flex-wrap">
              <button
                className="text-sm border cursor-pointer rounded-sm border-stone-900 text-stone-900 px-2 py-1 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                onClick={() => handleSendMessage(props.questions.question1)}
              >
                {props.questions.question1}
              </button>
              <button
                className="text-sm cursor-pointer border rounded-sm border-stone-900 text-stone-900 px-2 py-1 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                onClick={() => handleSendMessage(props.questions.question2)}
              >
                {props.questions.question2}
              </button>
              <button
                className="text-sm cursor-pointer border rounded-sm border-stone-900 text-stone-900 px-2 py-1 transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
                onClick={() => handleSendMessage(props.questions.question3)}
              >
                {props.questions.question3}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto">
          {chatState.messages.slice(1).map((message) => (
            <ChatMessage key={message.id} message={message} props={props} />
          ))}
          {chatState.isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isTyping}
      />
    </div>
  );
};
