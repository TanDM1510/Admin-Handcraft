import {
  InfoCircleFilled,
  PhoneFilled,
  UserOutlined,
  VideoCameraFilled,
} from "@ant-design/icons";
import { Avatar } from "antd";

const NavChat = ({ user }) => {
  return (
    <nav className="w-full flex justify-between items-center px-5 border-b border-gray-200 h-[10%]">
      <div className="flex gap-5 items-center  p-4">
        <Avatar
          style={{
            backgroundColor: "#87d068",
          }}
          size={{
            xs: 56,
            sm: 56,
            md: 56,
            lg: 56,
            xl: 56,
            xxl: 56,
          }}
          icon={<UserOutlined />}
        />

        <p className="font-bold text-base uppercase">{user.username}</p>
      </div>
      <div className="flex gap-10 items-center">
        <PhoneFilled
          style={{ fontSize: "24px" }}
          className="text-blue-400 cursor-pointer"
        />
        <VideoCameraFilled
          style={{ fontSize: "24px" }}
          className="text-blue-400 cursor-pointer"
        />
        <InfoCircleFilled
          style={{ fontSize: "24px" }}
          className="text-blue-400 cursor-pointer"
        />
      </div>
    </nav>
  );
};
export default NavChat;
