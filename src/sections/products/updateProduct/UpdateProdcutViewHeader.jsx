import { InboxOutlined } from "@ant-design/icons";
import { Breadcrumb, Form } from "antd";
import Link from "next/link";
import React from "react";

const UpdateProductViewHeader = () => {
  return (
    <div className="w-full rounded-lg h-[100px] border  flex items-center px-5  bg-white justify-between">
      <div>
        <h1 className="font-bold text-2xl text-black ">Cập nhật sản phẩm </h1>
        <Breadcrumb
          style={{
            margin: "6px 0",
          }}
          items={[
            {
              title: (
                <Link href={"/admin/dashboard/products"}>Quản lí sản phẩm</Link>
              ),
            },
            {
              title: " Cập nhật sản phẩm",
            },
          ]}
        />
      </div>
      <Form.Item>
        <button
          type="submit"
          className="bg-black px-2 py-3 text-white text-sm transition-all ease-in-out border duration-75 delay-100 rounded-xl hover:bg-white hover:text-black hover:border"
        >
          <InboxOutlined /> Cập nhật sản phẩm
        </button>
      </Form.Item>
    </div>
  );
};

export default UpdateProductViewHeader;
