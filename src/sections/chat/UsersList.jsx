import { UserAddOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "next/link";

const UsersList = ({ users }) => {
  return (
    <div className="h-[75vh] overflow-y-scroll">
      <div className="w-full flex items-center justify-center flex-col mt-2 ">
        {" "}
        {users.map((user, index) => (
          <Link
            href={`/chat/${user.user_id}`}
            key={index}
            className="cursor-pointer w-[calc(100%-20px)] flex gap-10 items-center hover:bg-blue-50  p-4 rounded-2xl"
          >
            {user.url_avatar ? (
              <Avatar
                src={user.url_avatar}
                size={{
                  xs: 56,
                  sm: 56,
                  md: 56,
                  lg: 56,
                  xl: 56,
                  xxl: 56,
                }}
              />
            ) : (
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
            )}

            <div className="flex-1 min-w-0">
              <p className="font-bold text-base truncate">{user.email || user.username}</p>
              <p className="text-sm text-gray-400 truncate">{user.message}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default UsersList;
