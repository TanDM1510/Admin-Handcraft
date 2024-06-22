import { InboxOutlined } from "@ant-design/icons";
import { Breadcrumb, Form } from "antd";
import Link from "next/link";
import React from "react";

const AddFestivalHeader = () => {
  return (
    <div className="w-full rounded-lg h-[100px] border  flex items-center px-5  bg-white justify-between">
      <div>
        <h1 className="font-bold text-2xl text-black ">Thêm lễ hội </h1>
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
              title: "Thêm lễ hội",
            },
          ]}
        />
      </div>
      <Form.Item>
        <button
          type="submit"
          className="bg-black px-2 py-3 text-white text-sm transition-all ease-in-out border duration-75 delay-100 rounded-xl hover:bg-white hover:text-black hover:border"
        >
          <InboxOutlined /> Lưu và thêm
        </button>
      </Form.Item>
    </div>
  );
};

export default AddFestivalHeader;
