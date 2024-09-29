// room.tsx
"use client";
import React from "react";
import Stream from "../Stream/Stream";
import Chat from "../Chat/Chat";
import Participants from "../Participants/Participants";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type Props = {};

const Room = (props: Props) => {
  const callid = uuidv4().substr(0, 6); // Generates a unique ID for the room
  const router = useRouter();

  const handleExit = () => {
    router.push("/instructor");
  };

  return (
    <main className="relative flex h-screen w-full bg-white text-black">
      <Participants callId={callid} />

      <section className="flex-1 flex items-center justify-center border-l border-gray-300 bg-white px-4 py-2">
        <Stream callid={callid} onExit={handleExit} />
      </section>

      <section className="w-1/4 max-w-xs overflow-y-auto border-l border-gray-300 bg-white">
        <Chat callId={callid} isUser={false} />
      </section>
    </main>
  );
};

export default Room;
