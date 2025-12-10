import React from "react";
import type { ChatMessageProps } from "../../types";

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, props }) => {
  const isBot = message.sender === "bot";
  function getFormattedTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return (
    <div
      className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`flex max-w-[80%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="flex flex-col">
          <p
            className={`text-xs text-stone-500 mb-2 ${
              isBot ? "text-left" : "text-right"
            }`}
          >
            {isBot ? "" : `${props.you}`} {getFormattedTime()}
          </p>
          {isBot ? (
            <div
              dangerouslySetInnerHTML={{ __html: message.content }}
              className={` text-sm text-stone-600 whitespace-pre-line bg-stone-100  rounded-tr-md rounded-bl-md rounded-br-md  px-2 py-2`}
            ></div>
          ) : (
            <div
              className={` text-sm px-2 py-2 rounded-tl-md rounded-bl-md rounded-br-md bg-stone-900 text-white whitespace-pre-line`}
            >
              {message.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
