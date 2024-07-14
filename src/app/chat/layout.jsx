"use client";
import { useEffect, useState } from "react";

import axiosClient from "@/utils/customeAxios";

import UsersList from "@/sections/chat/UsersList";
import NavChatSider from "@/sections/chat/NavChatSider";

const Layout = ({ children }) => {
  const [listMessageUser, setListMessageUser] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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
        <UsersList users={listMessageUser} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
