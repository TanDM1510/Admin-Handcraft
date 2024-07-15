"use client";
import ChatContent from "@/sections/chat/ChatContent";
import InputChat from "@/sections/chat/InputChat";
import NavChat from "@/sections/chat/NavChat";
import axiosClient from "@/utils/customeAxios";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const Page = ({ params }) => {
  const id = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [listMessage, setListMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("https://prm-socket.webbythien.com");
    newSocket.on("connect", () => {
      console.log("Connected to the Socket.io server", newSocket.id);
      newSocket.emit("subscribe", { room_id: "0" });
      newSocket.off("message");
      newSocket.on("message", (data) => {
        console.log("message: ", data);

        fetchData(id);
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
  console.log(listMessage);
  const fetchData = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        `https://prm-api.webbythien.com/v1/api/chat/${id}`
      );
      setListMessage(response);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const handlePostMessage = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.post(
        "https://prm-api.webbythien.com/v1/api/chat",
        {
          sender_id: 0,
          reciever_id: id,
          message: newMessage,
        }
      );
      if (response) {
        setNewMessage("");
        fetchData(id);
      }
    } catch (error) {
      console.error("Error posting message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const [listMessageUser, setListMessageUser] = useState([]);
  const fetchDataMessage = async () => {
    try {
      const response = await axiosClient.get(
        "https://prm-api.webbythien.com/v1/api/chat/admin"
      );
      const selectUser = response.find((i) => i.user_id == id);
      setListMessageUser(selectUser);
      console.log(selectUser);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
    }
  };
  useEffect(() => {
    fetchDataMessage();
  }, []);

  return (
    <div className="lg:w-3/4 w-full h-full sticky top-0 lg:overflow-hidden">
      <NavChat user={listMessageUser} />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spin />
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
  );
};

export default Page;
