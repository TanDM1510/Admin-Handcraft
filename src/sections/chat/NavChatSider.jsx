import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";

const NavChatSider = ({ isActive }) => {
  return (
    <div className="h-[25vh] ">
      {" "}
      <Link href={"/admin/dashboard"}>
        {" "}
        <h1 className="font-bold text-3xl px-3 custom-font pt-3">Bamboo</h1>
      </Link>{" "}
      <div className="w-full flex justify-center items-center flex-col gap-5 border-b border-gray-200 pb-5">
        {" "}
        <Input
          className="w-[calc(100%-20px)] mt-6 h-10 rounded-2xl"
          prefix={<SearchOutlined />}
          placeholder=" Tìm kiếm trên chat sẽ"
        />
        <div className="flex   w-full justify-center">
          <p
            className={
              isActive
                ? "cursor-pointer max-w-full w-[150px] font-semibold  text-center text-blue-500  bg-blue-100 rounded-xl py-1 hover:bg-blue-300 hover:text-white transition-all duration-75 delay-75 ease-in-out "
                : "  cursor-pointer  max-w-full w-[150px] text-center  font-semibold    bg-white rounded-xl   py-1 hover:bg-blue-300 hover:text-white transition-all duration-75 delay-75 ease-in-out  "
            }
          >
            Hộp thư
          </p>
          <p className=" cursor-pointer  max-w-full w-[150px] text-center  font-semibold   bg-white rounded-xl   py-1 hover:bg-blue-300 hover:text-white transition-all duration-75 delay-75 ease-in-out ">
            Cộng đồng
          </p>
        </div>
      </div>
    </div>
  );
};
export default NavChatSider;
