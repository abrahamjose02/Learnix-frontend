import React, { useEffect } from "react";
import {
  LivestreamLayout,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL05vbV9Bbm9yIiwidXNlcl9pZCI6Ik5vbV9Bbm9yIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3Mjc1ODg2MjIsImV4cCI6MTcyODE5MzQyMn0.B2qOPCCg9oCDkzhWPv5t5re19gw9E0B5_6OUs0TEQw4';
const userId = 'Nom_Anor';

const client = new StreamVideoClient({
  apiKey,
  token,
  user: { id: userId },
});

type Props = {
  callid: string;
};

const UserStream = ({ callid }: Props) => {
  const call = client.call("livestream", callid);

  useEffect(() => {
    const joinCall = async () => {
      try {
        await call.join();
      } catch (error) {
        console.error("Error joining call:", error);
      }
    };

    joinCall();

    return () => {
      call.leave().catch((error) => {
        console.error("Error leaving call:", error);
      });
    };
  }, [callid, call]);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamLayout showParticipantCount={false} />
      </StreamCall>
    </StreamVideo>
  );
};

export default UserStream;