import { UserAddOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const data = [
  {
    id: 1,
    name: "Dương Minh Tấn",
    status: "Hôm nay khỏe chứ",
    avatarColor: "#87d068",
  },
  {
    id: 2,
    name: "Nguyễn Văn An",
    status: "Đang có chút mệt mỏi",
    avatarColor: "#f56a00",
  },
  {
    id: 3,
    name: "Trần Thị Bích",
    status: "Cảm thấy tuyệt vời",
    avatarColor: "#7265e6",
  },
  {
    id: 4,
    name: "Lê Hoàng Nam",
    status: "Hơi buồn ngủ",
    avatarColor: "#ffbf00",
  },
  {
    id: 5,
    name: "Phạm Thị Hương",
    status: "Rất phấn khích",
    avatarColor: "#00a2ae",
  },
  {
    id: 6,
    name: "Hoàng Đức Anh",
    status: "Đang có chút lo lắng",
    avatarColor: "#ff4d4f",
  },
  {
    id: 7,
    name: "Ngô Thanh Bình",
    status: "Rất hạnh phúc",
    avatarColor: "#52c41a",
  },
  {
    id: 8,
    name: "Bùi Minh Tuấn",
    status: "Cảm thấy thoải mái",
    avatarColor: "#2db7f5",
  },
  {
    id: 9,
    name: "Đinh Thị Mai",
    status: "Đang suy nghĩ",
    avatarColor: "#faad14",
  },
  {
    id: 10,
    name: "Võ Thị Thu",
    status: "Rất hào hứng",
    avatarColor: "#eb2f96",
  },
  {
    id: 11,
    name: "Trương Quang Huy",
    status: "Đang mệt mỏi",
    avatarColor: "#13c2c2",
  },
  {
    id: 12,
    name: "Lý Thị Hà",
    status: "Cảm thấy buồn",
    avatarColor: "#bfbfbf",
  },
  {
    id: 13,
    name: "Phạm Văn Đức",
    status: "Rất vui",
    avatarColor: "#ff85c0",
  },
  {
    id: 14,
    name: "Nguyễn Thị Lan",
    status: "Đang có chút căng thẳng",
    avatarColor: "#597ef7",
  },
  {
    id: 15,
    name: "Trần Hoàng Anh",
    status: "Cảm thấy thư giãn",
    avatarColor: "#ff7a45",
  },
  {
    id: 16,
    name: "Đoàn Thị Thuỷ",
    status: "Rất hài lòng",
    avatarColor: "#40a9ff",
  },
  {
    id: 17,
    name: "Lê Văn Hoàng",
    status: "Đang có chút lo lắng",
    avatarColor: "#7cb305",
  },
  {
    id: 18,
    name: "Phạm Thị Tuyết",
    status: "Cảm thấy tuyệt vời",
    avatarColor: "#9254de",
  },
  {
    id: 19,
    name: "Nguyễn Văn Minh",
    status: "Rất buồn",
    avatarColor: "#d46b08",
  },
  {
    id: 20,
    name: "Trần Thị Ngọc",
    status: "Cảm thấy mệt mỏi",
    avatarColor: "#08979c",
  },
];

const UsersList = () => {
  return (
    <div className="h-[75vh] overflow-y-scroll">
      <div className="w-full flex items-center justify-center flex-col mt-2 ">
        {" "}
        {data.map((user) => (
          <div
            key={user.id}
            className="cursor-pointer w-[calc(100%-20px)] flex gap-10 items-center hover:bg-blue-50  p-4 rounded-2xl"
          >
            <Avatar
              style={{
                backgroundColor: user.avatarColor,
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
              <p className="font-bold text-base">{user.name}</p>
              <p className="text-sm text-gray-400">{user.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UsersList;
