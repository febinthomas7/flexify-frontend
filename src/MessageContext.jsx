import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { handleSuccess } from "./utils";

export const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState([]);
  const [messages, setMessages] = useState([]);
  const [auth, setAuth] = useState(true);
  const [users, setUsers] = useState();
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
      if (
        newMessage.senderId === localStorage.getItem("receiverId") &&
        newMessage.receiverId === localStorage.getItem("userId")
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }

      const audio = new Audio("/notification.mp3"); // Add the path to your notification sound file
      audio.play();

      handleSuccess(`message from ${newMessage.senderName}`);
    };
    const handleNewChat = (newMessage) => {
      updateUserMessages(newMessage);
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("newChat", handleNewChat);

    // Cleanup listener on dependency change
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("newChat", handleNewChat);
    };
  }, [socket]);

  const updateUserMessages = (newMessage) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        return {
          ...user,
          newMessage: [
            ...user.newMessage.filter(
              (msg) => msg._id !== newMessage._id // Prevent duplicate messages
            ),
            newMessage,
          ],
        };
      })
    );
  };
  return (
    <MessagingContext.Provider
      value={{
        socket,
        online,
        messages,
        setMessages,
        auth,
        setAuth,
        users,
        setUsers,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};
