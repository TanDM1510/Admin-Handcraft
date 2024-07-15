import formatDate from "@/utils/formatDate";
import { Tag } from "antd";
import React from "react";

const FestivalInformation = ({ festival }) => {
  return (
    <div className="max-w-[calc(100%-20px) border rounded-xl p-10 flex gap-20  w-[1300px] mx-auto mt-5 ">
      <div className="w-1/2 rounded-lg overflow-hidden">
        <img
          src={festival.image}
          layout="fill"
          objectFit="cover"
          priority
          alt="Product Image"
          className=""
        />
      </div>
      <div className="w-1/2 py-3">
        <h2 className=" text-3xl mb-10">
          <b>{festival?.name}</b>
        </h2>

        <p className="mb-6 text-lg">
          <b>Giới thiệu về lễ hội</b> : {festival?.description}.
        </p>
        <p className="mb-6 text-lg">
          <b>Ngày bắt đầu</b> : {formatDate(festival?.start_date)}.
        </p>
        <p className="mb-6 text-lg">
          <b>Ngày kết thúc</b> : {formatDate(festival?.end_time)}.
        </p>
        <p className="mb-6 text-lg">
          <b>Lặp lại trong năm</b> :{" "}
          {festival?.repeat_year ? (
            <Tag color="red">Không</Tag>
          ) : (
            <Tag color="green">Có</Tag>
          )}
        </p>
      </div>
    </div>
  );
};

export default FestivalInformation;
