"use client";
import React, { useEffect } from "react";
import UserStream from "../Stream/UserStream";
import Chat from "../Chat/Chat";
import Participants from "../Participants/Participants";
import { socketId } from "../../../utils/socket";
import { useRouter } from "next/navigation";
import { FaPhoneSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useStream } from "@/utils/StreamContext";

type Props = {
  streamId: string;
};

const RoomUser = ({ streamId }: Props) => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { dispatch } = useStream();


  useEffect(() => {
    const handleStreamEnd = () => {
      dispatch({ type: "END_STREAM" });
      router.push("/");
    };

    socketId.on("streamEnded", (data) => {
      if (data.streamId === streamId) {
        handleStreamEnd();
      }
    });

    socketId.emit("userJoinedStream", {
      name: user.name,
      callid: streamId,
    });

    return () => {
      socketId.off("streamEnded");
    };
  }, [streamId, router, user.name]);

  const handleExit = () => {
    router.push("/");
  };

  return (
    <main className="relative flex h-screen w-full bg-white text-black">
      <Participants callId={streamId} />

      <section className="flex-1 flex items-center justify-center border-l border-gray-300 bg-white px-4 py-2">
        <UserStream callid={streamId} />
      </section>

      <section className="w-1/4 max-w-xs overflow-y-auto border-l border-gray-300 bg-white">
        <Chat callId={streamId} isUser={true} />
      </section>

      <section className="absolute left-1/2 top-[calc(50%+10rem)] transform -translate-x-1/2">
        <button
          onClick={handleExit}
          className="p-4 mt-11 text-black bg-red-500 rounded-full shadow-md hover:bg-red-700"
        >
          <FaPhoneSlash size={20} />
        </button>
      </section>
    </main>
  );
};

export default RoomUser;