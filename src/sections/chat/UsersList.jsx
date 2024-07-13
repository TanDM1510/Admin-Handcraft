import { UserAddOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const UsersList = ({ users, setIdChat }) => {
  return (
    <div className="h-[75vh] overflow-y-scroll">
      <div className="w-full flex items-center justify-center flex-col mt-2 ">
        {" "}
        {users.map((user, index) => (
          <div
            key={index}
            className="cursor-pointer w-[calc(100%-20px)] flex gap-10 items-center hover:bg-blue-50  p-4 rounded-2xl"
            onClick={() => setIdChat(user.user_id)}
          >
            <Avatar
              style={{
                backgroundColor: "olive",
              }}
              size={{
                xs: 56,
                sm: 56,
                md: 56,
                lg: 56,
                xl: 56,
                xxl: 56,
              }}
              icon={<UserAddOutlined />}
            />
            <div className="flex flex-col">
              <p className="font-bold text-base">{user.username}</p>
              <p className="text-sm text-gray-400">{user.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UsersList;
