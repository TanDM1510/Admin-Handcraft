import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

const ProductViewHeader = () => {
  return (
    <div className="w-full rounded-lg h-[100px] border  flex items-center px-5  bg-white justify-between">
      <div>
        <h1 className="font-bold text-2xl text-black ">
          Xem chi tiết sản phẩm{" "}
        </h1>
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
              title: "Xem chi tiết sản phẩm",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductViewHeader;
