import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { handleSuccess, handleError } from "./src/utils";

export const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BASE_URL, {
      query: {
        userId: localStorage.getItem("userId"),
      },
    });
    setSocket(newSocket);

    newSocket.on("getOnlineUser", (onlineUsers) => {
      setOnline(onlineUsers);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Handle incoming messages
    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      handleSuccess(
        `message : ${newMessage.message ? newMessage.message : "📷"}`
      );
      console.log(newMessage);
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup listener on dependency change
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);
  return (
    <MessagingContext.Provider
      value={{
        socket,
        online,
        messages,
        setMessages,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

// export const UseMessaging = () => useContext(MessagingContext);
