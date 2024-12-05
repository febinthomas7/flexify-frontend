import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { handleSuccess, handleError } from "./utils";

export const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);
  const [messages, setMessages] = useState([]);
  const [auth, setAuth] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
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
    }
  }, []);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const url = `${
          import.meta.env.VITE_BASE_URL
        }/auth/check-auth?userId=${localStorage.getItem("userId")}`;
        const headers = {
          Authorization: localStorage.getItem("token"),
        };
        const response = await fetch(url, { headers });

        const result = await response.json();
        if (result.success === false) {
          const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/auth/device-logout`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          await response.json();
          window.localStorage.clear();
        }
      } catch (error) {
        console.log(error);
      }
    };

    authenticate();
  }, [socket, auth]);

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
        auth,
        setAuth,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
