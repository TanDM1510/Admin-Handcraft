"use client";

import { useState } from "react";
import UsersList from "./UsersList";
import NavChatSider from "./NavChatSider";
import NavChat from "./NavChat";
import InputChat from "./InputChat";
import ChatContent from "./ChatContent";

const ChatView = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="w-full h-screen flex lg:flex-row flex-col ">
      <div className="lg:w-1/4 w-full h-full border-r border-gray-200">
        {/* NavChatsider */}
        <NavChatSider isActive={isActive} />
        {/* UseList */}
        <UsersList />
      </div>
      <div className="lg:w-3/4 w-full h-full sticky top-0">
        {/* NavChat */}
        <NavChat />
        {/* Chat Content */}
        <ChatContent />
        {/* InputChat */}
        <InputChat />
      </div>
    </div>
  );
};
export default ChatView;
