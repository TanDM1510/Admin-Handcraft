const ChatContent = ({ listMessage }) => {
  return (
    <div className="flex-grow p-5 overflow-y-scroll h-[87%]">
      {listMessage.map((message, id) => (
        <div
          key={id}
          className={`flex ${
            message?.sender_id !== 0 ? "justify-start" : "justify-end"
          } mb-4`}
        >
          <div
            className={`p-3 rounded-lg ${
              message?.sender_id !== 0 ? "bg-blue-100" : "bg-green-100"
            }`}
          >
            <p className="text-base">{message?.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(message?.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatContent;
