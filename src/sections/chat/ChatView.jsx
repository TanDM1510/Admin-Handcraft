"use client";
import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import NavChatSider from "./NavChatSider";
import axiosClient from "@/utils/customeAxios";
import io from "socket.io-client";

const ChatView = ({ children }) => {
  const [listMessageUser, setListMessageUser] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [idChat, setIdChat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listMessage, setListMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("https://prm-socket.webbythien.com");
    newSocket.on("connect", () => {
      console.log("Connected to the Socket.io server", newSocket.id);
      newSocket.emit("subscribe", { room_id: "0" });
      newSocket.on("message", (data) => {
        console.log("message: ", data);
        setListMessage((prevListMessage) => [data, ...prevListMessage]);
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
  useEffect(() => {
    fetchDataMessage();
  }, []);

  return (
    <div className="w-full h-screen flex lg:flex-row flex-col overflow-hidden">
      <div className="lg:w-1/4 w-full h-full border-r border-gray-200">
        <NavChatSider />
        <UsersList users={listMessageUser} setIdChat={setIdChat} />
      </div>
      {children}
    </div>
  );
};

export default ChatView;
