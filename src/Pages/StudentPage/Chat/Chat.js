import React from "react";
import useChat from "./_useChat";
import ChatBox from "./ChatBox/ChatBox";
import Messages from "./Messages/Messages";

const Chat = () => {
  const { messages, sendMessage } = useChat();

  return (
    <div>
      <ChatBox
        onSendMessage={(message) => {
          sendMessage({ message });
        }}
      />
      <Messages messages={messages} />
    </div>
  );
};
export default Chat;
