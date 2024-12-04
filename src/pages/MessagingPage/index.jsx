import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import Header from "../../components/Header";
import { PiCamera } from "react-icons/pi";
import { Helmet } from "react-helmet";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MessagingContext } from "../../../MessageContext";
import {
  LoadingComponentForchatUsers,
  LoadingComponentForchatMessages,
} from "../../components/LoadingComponent";
import "react-toastify/dist/ReactToastify.css";

const MessagingPage = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [flags, setFlags] = useState(false);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { messages, setMessages, socket, online } =
    useContext(MessagingContext);

  const userData = async () => {
    setLoading(true);
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
      setUsers(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    userData();
  }, [flags, socket, messages, setMessages]);

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
      if (result.data._id == undefined) {
        setReceiverId("");
        localStorage.setItem("receiverId", []);
      } else {
        setReceiverId(result.data._id);
        localStorage.setItem("receiverId", result.data._id);
      }

      setUser(result.data);

      localStorage.setItem("receiverName", result.data.name);
      localStorage.setItem("receiverDp", result.data.dp);
      setHide(!hide);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    setSendLoader(true);
    if (message == "" && !e.target.image.files[0]) {
      setSendLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("message", message);
    formData.append("senderId", localStorage.getItem("userId"));
    formData.append(
      "receiverId",
      receiverId || localStorage.getItem("receiverId")
    );
    formData.append("userId", localStorage.getItem("userId"));

    fetch(`${import.meta.env.VITE_BASE_URL}/chat/sendmessage`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        const { success } = result;

        setMessage("");
        e.target.image.value = "";
        setSelectedFile("");

        if (success) {
          setMessages([...messages, result?.newMessage]);
          setSendLoader(false);
        }

        setFlags(!flags);
        setUser(result.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSendLoader(false);
      });
  };

  const getMessage = async () => {
    setChatLoading(true);
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
      const { success, message, chatId } = result;
      if (success) {
        setMessages(message);
        setChatLoading(false);
      }
      if (!success) {
        setMessages([]);
        setChatLoading(false);
      }
    } catch (error) {
      console.log(error);
      setChatLoading(false);
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
  }, [receiverId]);

  const filteredChats = useMemo(
    () =>
      users?.filter((chat) =>
        chat?.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  return (
    <>
      <Helmet>
        <title>Chat - Flexifyy</title>
        <meta name="description" content="user chat" />
      </Helmet>
      <Header />
      <div className=" bg-black w-full  h-screen flex overflow-hidden ">
        <div
          className={`w-[400px] bg-[#8b000047] flex flex-col gap-2 overflow-auto ${
            !hide ? "flex" : "hidden sm:flex"
          }  relative px-2 h-[calc(100%-5rem)] sm:h-[calc(100%-6rem)] p-2 mt-[5rem] sm:mt-[6rem] `}
        >
          {loading && <LoadingComponentForchatUsers />}
          <div className="gap-2 flex flex-col ">
            <input
              type="text"
              placeholder="Username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2  p-2 rounded-lg bg-white text-gray-700 outline-none sticky "
            />

            {filteredChats?.map((chat, index) => (
              <div
                key={index}
                onClick={() => selectUser(chat._id)}
                className={`w-full rounded p-2 flex gap-2 ${
                  chat._id == localStorage.getItem("receiverId")
                    ? "bg-[#c4c4c475]"
                    : "bg-[#6f6f6f75]"
                } ${
                  searchTerm === "" || searchTerm === null ? "hidden" : ""
                } items-center cursor-pointer sm:hover:scale-105`}
              >
                <div className="relative gap-1">
                  <img
                    src={chat.dp || "/no_image.jpg"}
                    onError={(e) => {
                      e.target.src = "/no_image.jpg";
                    }}
                    alt="/no_image.jpg"
                    className="rounded-full w-9 h-9 object-contain bg-black"
                  />
                  {online.includes(chat?._id) && (
                    <span className="p-1 rounded-full w-3 h-3  border-black border -right-1 t-0 absolute top-0   bg-green-500"></span>
                  )}
                </div>

                <div className="flex flex-col p-1 w-full text-white">
                  <div className="w-full flex justify-between items-center">
                    <h1 className="text-sm">{chat?.name}</h1>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {users
            ?.filter((usr, i) =>
              usr.friends?.includes(localStorage.getItem("userId"))
            )
            ?.map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={() => selectUser(e._id)}
                  className={`w-full rounded p-2 flex gap-2 ${
                    e._id == localStorage.getItem("receiverId")
                      ? "bg-[#c4c4c475]"
                      : "bg-[#6f6f6f75]"
                  }  ${
                    searchTerm === "" ||
                    searchTerm === null ||
                    searchTerm === undefined
                      ? ""
                      : "hidden"
                  }  items-center cursor-pointer sm:hover:scale-105`}
                >
                  <div className="relative">
                    <img
                      src={e.dp || "/no_image.jpg"}
                      onError={(e) => {
                        e.target.src = "/no_image.jpg";
                      }}
                      alt="/no_image.jpg"
                      className="rounded-full w-9 h-9 object-contain bg-black"
                    />
                    {online.includes(e?._id) && (
                      <span className="p-1 rounded-full w-3 h-3  border-black border -right-1 t-0 absolute top-0   bg-green-500"></span>
                    )}
                  </div>

                  <div className="flex flex-col p-1 w-full text-white">
                    <div className="w-full flex justify-between items-center">
                      <h1 className="text-sm">{e?.name}</h1>{" "}
                    </div>
                    <div className="w-full flex justify-between items-center text-sm">
                      {e.newMessage
                        ?.filter(
                          (usr) =>
                            usr.participants?.includes(
                              localStorage.getItem("userId")
                            ) && usr.participants?.includes(e?._id) // Check if senderId is in participants and there are other users
                        )
                        .map((filteredMessage, index) => {
                          const dateObject = new Date(
                            filteredMessage?.updatedAt
                          );

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
                              className="w-full flex justify-between items-center"
                            >
                              <h1>{filteredMessage?.latestMessage}</h1>
                              <span className="text-xs">{formattedTime}</span>
                            </div>
                            // Display the filtered message
                          );
                        })}
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
            {chatLoading && <LoadingComponentForchatMessages />}
            {messages.length <= 0 && !chatLoading && (
              <div className="text-center text-white">No messages yet.</div>
            )}
            {messages?.map((msg, index) => {
              const dateObject = new Date(msg?.updatedAt);

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

              // Regular expression to match URLs
              const urlRegex = /(https?:\/\/[^\s]+)/g;

              const parts = msg?.message.split(urlRegex);
              return (
                <div
                  key={index}
                  ref={messagesEndRef}
                  className={`p-2 ${
                    msg?.senderId === localStorage.getItem("userId")
                      ? "text-right"
                      : ""
                  }`}
                >
                  <div>
                    <div
                      className={` rounded-xl text-white px-2 pt-3 pb-4 inline-block relative min-w-[50px] max-w-[300px] sm:max-w-[310px] text-left ${
                        msg?.senderId === localStorage.getItem("userId")
                          ? "bg-[#181818af] rounded-xl rounded-br-none"
                          : " bg-[#3d3d3daf] rounded-xl rounded-bl-none"
                      }`}
                    >
                      {msg?.imageUrl && (
                        <img
                          className="w-full "
                          src={msg?.imageUrl}
                          onError={(e) => {
                            e.target.src = "/no_image.jpg";
                          }}
                          alt=""
                        />
                      )}

                      {parts.map((part, idx) => {
                        // Check if the part is a URL
                        if (urlRegex.test(part)) {
                          return (
                            <a
                              key={idx}
                              href={part}
                              rel="noopener noreferrer"
                              className="text-blue-400 underline"
                            >
                              {part}
                            </a>
                          );
                        } else {
                          // Render plain text
                          return <span key={idx}>{part}</span>;
                        }
                      })}
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
            <form
              onSubmit={sendMessage}
              className="flex gap-2  p-3 absolute  bottom-0 left-0 w-full bg-black"
            >
              <input
                type="text"
                className="border p-2 flex-1"
                value={message}
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <input
                type="file"
                className="hidden"
                id="fileInput"
                name="image"
                onChange={(e) => setSelectedFile(e.target.files[0])} // handle file selection
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-blue-500 text-[20px] text-white px-2 py-2 flex justify-center items-center rounded"
              >
                <PiCamera />
              </label>
              <button
                // onClick={sendMessage}
                type="submit"
                disabled={message == "" && !selectedFile}
                className={` ${
                  message == "" && !selectedFile
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-red-700"
                } text-white px-4 py-2 rounded`}
              >
                {sendLoader ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Send"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagingPage;
