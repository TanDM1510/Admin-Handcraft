import { Carousel, Statistic } from "antd";

import React from "react";
import CountUp from "react-countup";

const ProductInFormation = ({ product }) => {
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div>
      <div className="max-w-[calc(100%-20px) border rounded-xl p-10 flex gap-20  w-[1300px] mx-auto mt-5">
        <div className="w-1/2 rounded-lg overflow-hidden">
          <Carousel arrows infinite={false}>
            {product?.images?.map((i) => (
              <div
                key={i.url}
                className="relative w-full pb-[56.25%] overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={i.url}
                  layout="fill"
                  objectFit="cover"
                  priority
                  alt="Product Image"
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-1/2 py-3">
          <h2 className="font-bold text-3xl mb-10 ">{product?.name}</h2>
          <p className="text-xl mb-8">
            Thuộc lễ hội :
            {product?.festivals.map((festival) => (
              <span className="ml-2 font-semibold" key={festival.id}>
                {festival.name}
              </span>
            ))}
          </p>
          <p className="mb-6 text-lg">{product?.description}.</p>
          <p className="mb-6 text-lg">Số lượng : {product?.amount}.</p>
          <Statistic
            className="text-orange-400"
            valueStyle={{
              color: "#3f8600",
            }}
            value={product?.price}
            formatter={formatter}
            prefix={"VND"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInFormation;
