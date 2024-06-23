import {
  CarFilled,
  PictureFilled,
  SendOutlined,
  SmileFilled,
} from "@ant-design/icons";
import { Input } from "antd";

const InputChat = ({ newMessage, setNewMessage, handlePostMessage }) => {
  return (
    <div className="fixed bottom-0 w-full lg:w-[80%] h-10 flex items-center px-3 gap-5 bg-white">
      <PictureFilled
        style={{ fontSize: "24px" }}
        className="text-blue-400 cursor-pointer"
      />
      <CarFilled
        style={{ fontSize: "24px" }}
        className="text-blue-400 cursor-pointer"
      />
      <Input
        className="max-w-full w-[82%] rounded-2xl"
        suffix={
          <SmileFilled
            style={{ fontSize: "24px" }}
            className="text-blue-400 cursor-pointer"
          />
        }
        placeholder=" Tìm kiếm trên chat sẽ"
        value={newMessage}
        defaultValue={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onPressEnter={handlePostMessage} // Allow sending message with Enter key
      />
      <SendOutlined
        style={{ fontSize: "24px" }}
        className="text-blue-400 cursor-pointer"
        onClick={handlePostMessage} // Allow sending message with Send button
      />
    </div>
  );
};

export default InputChat;
