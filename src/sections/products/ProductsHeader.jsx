import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

const ProductsHeader = () => {
  return (
    <div className="flex justify-between mb-6">
      <h1 className="font-bold text-2xl">Quản lí sản phẩm</h1>
      <Link href={"products/addProduct"}>
        <button className="bg-black  px-4 py-3 text-white text-sm transition-all ease-in-out border duration-75 delay-100 rounded-xl hover:bg-white hover:text-black hover:border">
          <PlusCircleOutlined className="mr-2" /> Thêm sản phẩm
        </button>
      </Link>
    </div>
  );
};

export default ProductsHeader;
