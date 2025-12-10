import React from "react";

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center space-x-0.5 p-2 bg-stone-100 w-fit rounded-md">
        <div
          className="size-1 rounded-full bg-stone-400 animate-pulse"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="size-1 rounded-full bg-stone-400 animate-pulse"
          style={{ animationDelay: "300ms" }}
        ></div>
        <div
          className="size-1 rounded-full bg-stone-400 animate-pulse"
          style={{ animationDelay: "600ms" }}
        ></div>
      </div>
    </div>
  );
};
