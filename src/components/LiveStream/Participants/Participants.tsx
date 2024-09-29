import React, { useEffect, useState } from "react";
import { socketId } from "../../../utils/socket";

type Props = {
  callId: string;
};

const Participants = ({ callId }: Props) => {
  const [participants, setParticipants] = useState<string[]>([]);

  const handleUpdateParticipants = (data: any) => {
    if (data.callid === callId) {
      setParticipants(data.users);
    }
  };

  useEffect(() => {
    socketId.on("updateStreamParticipants", handleUpdateParticipants);

    return () => {
      socketId.off("updateStreamParticipants", handleUpdateParticipants);
    };
  }, [callId]);

  return (
    <section className="flex flex-col h-full w-1/5 max-w-xs overflow-y-auto bg-white p-4 ml-12">
      <div className="flex w-full items-center justify-between bg-gray-100 px-4 py-2 text-base text-black">
        <p>Participants</p>
        <strong className="rounded bg-gray-200 px-4 py-1 text-sm font-semibold text-black">
          {participants.length}
        </strong>
      </div>
      <div className="flex flex-col gap-4 pt-4 text-black">
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-sm">{participant}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Participants;