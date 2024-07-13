"use client";
import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import NavChatSider from "./NavChatSider";
import NavChat from "./NavChat";
import InputChat from "./InputChat";
import ChatContent from "./ChatContent";
import axiosClient from "@/utils/customeAxios";
import io from "socket.io-client";

const ChatView = () => {
  const [listMessage, setListMessage] = useState([]);
  const [listMessageUser, setListMessageUser] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [idChat, setIdChat] = useState("");

  useEffect(() => {
    const newSocket = io("https://prm-socket.webbythien.com");
    newSocket.on("connect", () => {
      console.log("Connected to the Socket.io server", newSocket.id);
      newSocket.emit("subscribe", { room_id: "0" });
      newSocket.on("message", (data) => {
        console.log("message: ", data);
        fetchData(idChat);
      });
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from the Socket.io server", newSocket.id);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const fetchDataMessage = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        "https://prm-api.webbythien.com/v1/api/chat/admin"
      );
      setListMessageUser(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (idChat) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `https://prm-api.webbythien.com/v1/api/chat/${idChat}`
      );
      setListMessage(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(idChat);
    fetchDataMessage();
  }, [idChat]);

  const handlePostMessage = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post(
        "https://prm-api.webbythien.com/v1/api/chat",
        {
          sender_id: 0,
          reciever_id: idChat,
          message: newMessage,
        }
      );
      if (response) {
        setNewMessage("");
        // setListMessage((prevMessages) => [newMessage, ...prevMessages]);
        fetchData(idChat);
      }
    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex lg:flex-row flex-col overflow-hidden">
      <div className="lg:w-1/4 w-full h-full border-r border-gray-200">
        <NavChatSider />
        <UsersList users={listMessageUser} setIdChat={setIdChat} />
      </div>
      <div className="lg:w-3/4 w-full h-full sticky top-0">
        <NavChat />
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        ) : (
          <ChatContent listMessage={listMessage} />
        )}
        <InputChat
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handlePostMessage={handlePostMessage}
        />
      </div>
    </div>
  );
};

export default ChatView;
