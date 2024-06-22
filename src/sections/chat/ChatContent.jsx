const ChatContent = () => {
  const chatData = {
    participants: [
      {
        id: 1,
        name: "Dương Minh Tấn",
        avatarColor: "#87d068",
      },
      {
        id: 2,
        name: "Nguyễn Văn An",
        avatarColor: "#f56a00",
      },
    ],
    messages: [
      {
        id: 1,
        senderId: 1,
        content: "Chào An, hôm nay bạn thế nào?",
        timestamp: "2024-06-17T09:00:00Z",
      },
      {
        id: 2,
        senderId: 2,
        content: "Chào Tấn, mình khỏe. Bạn thì sao?",
        timestamp: "2024-06-17T09:05:00Z",
      },
      {
        id: 3,
        senderId: 1,
        content: "Mình cũng khỏe. Có dự định gì cho cuối tuần không?",
        timestamp: "2024-06-17T09:10:00Z",
      },
      {
        id: 4,
        senderId: 2,
        content: "Mình định đi xem phim. Bạn có muốn đi cùng không?",
        timestamp: "2024-06-17T09:15:00Z",
      },
      {
        id: 5,
        senderId: 1,
        content: "Nghe hay đấy! Khi nào đi?",
        timestamp: "2024-06-17T09:20:00Z",
      },
      {
        id: 6,
        senderId: 2,
        content: "Chủ nhật này nhé. Hẹn bạn 5 giờ chiều ở rạp phim.",
        timestamp: "2024-06-17T09:25:00Z",
      },
      {
        id: 7,
        senderId: 1,
        content: "Ok, mình sẽ có mặt đúng giờ. Hẹn gặp bạn!",
        timestamp: "2024-06-17T09:30:00Z",
      },
      {
        id: 8,
        senderId: 2,
        content: "Hẹn gặp lại Tấn!",
        timestamp: "2024-06-17T09:35:00Z",
      },
    ],
  };
  return (
    <div className="flex-grow p-5 overflow-y-scroll h-[87%]">
      {chatData.messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.senderId === 1 ? "justify-start" : "justify-end"
          } mb-4`}
        >
          <div
            className={`p-3 rounded-lg ${
              message.senderId === 1 ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            <p className="text-base">{message.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatContent;
