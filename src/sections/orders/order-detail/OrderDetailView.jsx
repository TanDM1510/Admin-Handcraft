"use client";
import axiosClient from "@/utils/customeAxios";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import OrderDetailHeader from "./OrderDetailHeader";
import Link from "next/link";

const OrderDetailView = ({ id }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const orderId = id.id;
  const fetchData = async () => {
    const response = await axiosClient.get(
      `https://prm-api.webbythien.com/v1/api/order/${orderId}`
    );
    setData(response);
    setIsLoading(true);
  };

  useEffect(() => {
    fetchData();
  }, [orderId]);

  const hasEmail = data?.order?.email;


  return (
    <div>
      {isLoading ? (
        <div>
          <OrderDetailHeader />

          <div className="flex  flex-col w-full gap-5 rounded-xl border p-10 mt-5">
            <h2 className="font-semibold text-2xl mb-5 ">
              Thông tin người đặt đơn hàng #{data?.order.id}
            </h2>
            <div className="w-full flex gap-3">
              <div className="w-full">

                {hasEmail ? (
                  <>
                    <label>Mail người đặt</label>
                    <Input defaultValue={data?.order?.email} disabled />
                  </>)
                  :
                  (<>
                    <label>Tên người đặt</label>
                    <Input defaultValue={data?.order?.username} disabled />
                  </>)
                }
              </div>
              <div className="w-full">
                <label>Số điện thoại người đặt</label>
                <Input defaultValue={data?.order?.phone} disabled />
              </div>
            </div>
            <div className="w-full flex gap-3">
              <div className="w-full">
                <label>Khoảng cách giao hàng</label>
                <Input defaultValue={data?.order?.distance + "km"} disabled />
              </div>

              <div className="w-full">
                <label>Phí giao hàng</label>
                <Input defaultValue={data?.order?.shipping_fee} disabled />
              </div>
            </div>

            <div className="w-full">
              <label>Địa chỉ người nhận</label>
              <Input defaultValue={data?.order?.address} disabled />
            </div>
          </div>

          <div className="w-full rounded-lg p-10 border mt-5 ">
            <h2 className="font-semibold text-2xl mb-5 ">Thông tin đơn hàng</h2>
            {data?.order.products?.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between mb-3 border-b-2"
              >
                <Link href={`/admin/dashboard/products/${p.id}`}>
                  {" "}
                  <img
                    src={p.images[0].url}
                    alt={p.name}
                    height={200}
                    width={200}
                    className="mb-2"
                  />
                </Link>

                <p className="font-bold text-2xl">{p.name}</p>
                <p className="text-lg">{p.amount}x</p>
                <p className="text-lg font-semibold">
                  {p.price * p.amount} VND
                </p>
              </div>
            ))}
            <div className="ml-auto w-[300px]">
              <p className="text-lg flex justify-between mb-3">
                Tiền sản phẩm :
                <span> {data?.order.total_product_price} VND</span>
              </p>
              <p className="text-lg flex justify-between mb-3">
                Phí ship :<span>{data?.order.shipping_fee} VND</span>
              </p>
              <p className="border mb-3 "></p>
              <p className="text-lg flex justify-between">
                Tổng tiền : <b>{data?.order.total_price} VND</b>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <OrderDetailHeader />
          <p>nothing</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailView;
