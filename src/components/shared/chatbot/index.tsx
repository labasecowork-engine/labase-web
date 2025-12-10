import { useState } from "react";
import { Chat } from "./components";
import type { ChatbotProps } from "./types";

interface ChatbotMainProps {
  props: ChatbotProps;
}

export default function Chatbot({ props }: ChatbotMainProps) {
  const [openChat, setOpenChat] = useState<boolean>(false);
  return (
    <div>
      <button
        className="fixed bottom-4 right-4 size-10 md:size-16 rounded-full bg-stone-950 z-40  hover:bg-stone-800 transition-all cursor-pointer items-center flex justify-center"
        onClick={() => setOpenChat(!openChat)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 md:size-6 text-white"
        >
          <path
            fillRule="evenodd"
            d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {openChat && <Chat setOpenChat={setOpenChat} props={props} />}
    </div>
  );
}
