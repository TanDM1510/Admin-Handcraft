"use client";

import { Card, Statistic } from "antd";
import React from "react";
import CountUp from "react-countup";
import { ChartLine } from "./ChartLine";
import { RadarChart } from "./RadarChart";

const formatter = (value) => <CountUp end={value} separator="," />;

const DashBoardView = () => {
  return (
    <div className="bg-white">
      <h1 className="text-center mb-8 font-bold text-4xl text-black">
        Doanh số của <span className="custom-font">Bamboo</span>
      </h1>
      <div className="flex flex-col lg:flex-row gap-5 w-full border-t pt-10 border-gray-700">
        <Card className="flex-1 shadow-2xl border-none bg-black">
          <Statistic
            title={<span className="text-white">Doanh thu trong ngày</span>}
            value={1244000}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            suffix="VND"
            formatter={formatter}
          />
        </Card>
        <Card className="flex-1 shadow-2xl border-none bg-black">
          <Statistic
            title={
              <span className="text-white">Sản phẩm được bán trong ngày</span>
            }
            value={1244000}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            formatter={formatter}
          />
        </Card>
        <Card className="flex-1 shadow-2xl border-none bg-black">
          <Statistic
            title={<span className="text-white">Sản phẩm tồn kho</span>}
            value={1244000}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            formatter={formatter}
          />
        </Card>
        <Card className="flex-1 shadow-2xl border-none bg-black">
          <Statistic
            title={<span className="text-white">Số lượng thành viên mới</span>}
            value={1244000}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            formatter={formatter}
          />
        </Card>
      </div>
      <ChartLine />
      <div className="flex justify-between gap-2 w-full mt-10">
        <RadarChart />
        <div className="border rounded-xl px-10 py-5 w-full bg-black border-gray-700">
          <p className="text-center text-xl font-bold text-white">
            Trạng thái của 100 đơn hàng
          </p>
          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-5 h-5 inline-block rounded-full bg-blue-400"></span>
                <b className="mx-10 text-white">12</b>
              </div>
              <span className="text-white">Đơn hàng đang được chuẩn bị</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-5 h-5 inline-block rounded-full bg-yellow-500"></span>
                <b className="mx-10 text-white">12</b>
              </div>
              <span className="text-white">Đơn hàng đang giao</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-5 h-5 inline-block rounded-full bg-green-500"></span>
                <b className="mx-10 text-white">12</b>
              </div>
              <span className="text-white">Đơn hàng giao thành công</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-5 h-5 inline-block rounded-full bg-red-600"></span>
                <b className="mx-10 text-white">12</b>
              </div>
              <span className="text-white">Đơn hàng đang bị hủy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardView;
