import { Breadcrumb } from "antd";
import Link from "next/link";

const FestivalDetailHeader = () => {
  return (
    <div className="w-full rounded-lg h-[100px] border  flex items-center px-5  bg-white justify-between">
      <div>
        <h1 className="font-bold text-2xl text-black ">Xem chi tiết lễ hội </h1>
        <Breadcrumb
          style={{
            margin: "6px 0",
          }}
          items={[
            {
              title: (
                <Link href={"/admin/dashboard/festivals"}>Quản lí lễ hội</Link>
              ),
            },
            {
              title: "Xem chi tiết lễ hội",
            },
          ]}
        />
      </div>
    </div>
  );
};
export default FestivalDetailHeader;
