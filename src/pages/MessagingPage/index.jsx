import React, { useState, useEffect, useRef } from "react";

import { RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const MessagingPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [flags, setFlags] = useState(false);
  const [hide, setHide] = useState(false);

  const userData = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/chat/getusers?id=${localStorage.getItem("userId")}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const selectUser = async (userId) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/chat/user?id=${userId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      setReceiverId(result.data._id);
      setUser(result.data);
      localStorage.setItem("receiverId", result.data._id);
      localStorage.setItem("receiverName", result.data.name);
      localStorage.setItem("receiverDp", result.data.dp);
      setHide(!hide);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    if (message == "") {
      return;
    }
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/chat/sendmessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          senderId: localStorage.getItem("userId"),
          receiverId: receiverId || localStorage.getItem("receiverId"),
        }),
      });

      const result = await response.json();
      setMessage("");

      setUser(result.data);
      setFlags(!flags);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async () => {
    console.log(message);
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/chat/getmessage?receiverId=${
        receiverId || localStorage.getItem("receiverId")
      }&senderId=${localStorage.getItem("userId")}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setMessages(result.message);
      }
      if (!result.success) {
        setMessages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    getMessage();
  }, [receiverId, flags]);

  return (
    <>
      <Header />
      <div className=" bg-black w-full  h-screen flex overflow-hidden ">
        <div
          className={`w-[400px] bg-black flex flex-col gap-2 ${
            !hide ? "flex" : "hidden sm:flex"
          }  relative px-2 h-[calc(100%-5rem)] sm:h-[calc(100%-6rem)] p-2 mt-[5rem] sm:mt-[6rem] `}
        >
          {users?.map((e, index) => {
            return (
              <div
                key={index}
                onClick={() => selectUser(e._id)}
                className={`w-full bg-[#6f6f6f75] rounded p-2 flex gap-2 ${
                  e._id == localStorage.getItem("receiverId")
                    ? "bg-[#c4c4c475]"
                    : "bg-[#6f6f6f75]"
                } items-center cursor-pointer sm:hover:scale-105`}
              >
                <img
                  src={e.dp || "/no_image.jpg"}
                  onError={(e) => {
                    e.target.src = "/no_image.jpg";
                  }}
                  alt="/no_image.jpg"
                  className="rounded-full w-9 h-9 object-contain bg-black"
                />

                <div className="flex flex-col p-1 w-full text-white">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-sm">{e.name}</h1>{" "}
                    {/* <span className="text-xs">11:30 pm</span> */}
                  </div>
                  <div className="w-full flex justify-between items-center">
                    {/* <p className="text-xs"></p> */}
                    {/* <span className="text-xs w-5 h-5  flex justify-center items-center rounded-full bg-green-600">
                      1
                    </span> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`w-full h-[calc(100%-5rem)] sm:h-[calc(100%-6rem)] bg-black relative mt-[5rem] sm:mt-[6rem] ${
            hide ? "flex" : "hidden sm:flex"
          }  sm:flex`}
        >
          {(receiverId || localStorage.getItem("receiverId")) && (
            <div className=" top-0 left-0 z-10 w-full h-[50px] absolute bg-[#151515] flex justify-between items-center py-4 px-1 ">
              <div className="flex justify-center gap-3 items-center text-white">
                <RiArrowLeftSLine
                  onClick={() => setHide(!hide)}
                  className="text-2xl sm:hidden"
                />
                <img
                  src={user?.dp || localStorage.getItem("receiverDp")}
                  onError={(e) => {
                    e.target.src = "/no_image.jpg";
                  }}
                  alt=""
                  className="w-6 h-6 bg-white rounded-full object-contain"
                />
                <h1>{user?.name || localStorage.getItem("receiverName")}</h1>
              </div>
            </div>
          )}

          <div
            className="mb-4 w-full h-full overflow-auto hide py-16"
            id="scroll-container"
          >
            {messages.length <= 0 &&
              (receiverId || localStorage.getItem("receiverId")) && (
                <div className="text-center text-white">No messages yet.</div>
              )}
            {messages?.map((msg, index) => {
              const dateObject = new Date(msg.updatedAt);

              // Get hours and minutes
              let hours = dateObject.getHours();
              const minutes = dateObject
                .getMinutes()
                .toString()
                .padStart(2, "0");

              // Determine AM or PM
              const ampm = hours >= 12 ? "PM" : "AM";

              // Convert hours to 12-hour format and remove leading zero
              hours = hours % 12 || 12;

              const formattedTime = `${hours}:${minutes} ${ampm}`;
              return (
                <div
                  key={index}
                  ref={messagesEndRef}
                  className={`p-2 ${
                    msg.senderId === localStorage.getItem("userId")
                      ? "text-right"
                      : ""
                  }`}
                >
                  <div>
                    <div
                      className={` rounded-xl text-white px-2 pt-3 pb-4 inline-block relative min-w-[50px] text-left ${
                        msg.senderId === localStorage.getItem("userId")
                          ? "bg-[#969696af] rounded-xl rounded-br-none"
                          : " bg-[#686868af] rounded-xl rounded-bl-none"
                      }`}
                    >
                      {msg.message}
                      <span className="text-[10px] absolute text-gray-400  bottom-0 right-1">
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {(receiverId || localStorage.getItem("receiverId")) && (
            <div className="flex gap-2  p-3 absolute  bottom-0 left-0 w-full bg-black">
              <input
                type="text"
                className="border p-2 flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                disabled={message == "" ? true : false}
                className={` ${
                  message == "" ? "bg-red-500 cursor-not-allowed" : "bg-red-700"
                } text-white px-4 py-2 rounded`}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagingPage;
