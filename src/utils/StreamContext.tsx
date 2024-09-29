import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the types for the context state and actions
type StreamState = {
  streamId: string | null;
};

type StreamAction = { type: 'SET_STREAM_ID'; payload: string } | { type: 'END_STREAM' };

const initialState: StreamState = {
  streamId: null,
};

// Create a reducer function to handle state changes
const streamReducer = (state: StreamState, action: StreamAction): StreamState => {
  switch (action.type) {
    case 'SET_STREAM_ID':
      return { ...state, streamId: action.payload };
    case 'END_STREAM':
      return { ...state, streamId: null };
    default:
      return state;
  }
};

// Create the Stream Context
const StreamContext = createContext<{
  state: StreamState;
  dispatch: React.Dispatch<StreamAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Create a provider component
export const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(streamReducer, initialState);

  return (
    <StreamContext.Provider value={{ state, dispatch }}>
      {children}
    </StreamContext.Provider>
  );
};

// Create a custom hook to use the StreamContext
export const useStream = () => {
  return useContext(StreamContext);
};
