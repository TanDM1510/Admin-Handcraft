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
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = () => {
      const newSocket = io("http://34.126.177.133:5500");
      newSocket.on("connect", () => {
        console.log("Connected to the Socket.io server", newSocket.id);
        newSocket.emit("subscribe", { room_id: "0" });
        newSocket.off("message");
        newSocket.on("message", (data) => {
          console.log("message: ", data);
          // Append new message to the existing list
          setListMessage((prevMessages) => [data, ...prevMessages]);
          fetchData();
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
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        "http://34.126.177.133:8881/v1/api/chat/18"
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
    fetchData();
  }, []);

  const handlePostMessage = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axiosClient.post(
        "http://34.126.177.133:8881/v1/api/chat",
        {
          sender_id: 0,
          reciever_id: 18,
          message: newMessage,
        }
      );

      setNewMessage("");
      fetchData();
    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-screen flex lg:flex-row flex-col">
      <div className="lg:w-1/4 w-full h-full border-r border-gray-200">
        <NavChatSider />
        <UsersList />
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
