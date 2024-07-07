"use client";

import axiosClient from "@/utils/customeAxios";
import React, { useEffect, useState } from "react";
import ProductViewHeader from "./ProductViewHeader";
import ProductInFormation from "./ProductInFormation";
const ProductView = ({ id }) => {
  const [product, setProduct] = useState();
  const productId = id.id;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(
        `https://prm-api.webbythien.com/v1/api/product/${productId}`
      );
      setProduct(response);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {/* Header */}
      <ProductViewHeader />
      {/* Product infor */}
      <ProductInFormation product={product} />
    </>
  );
};

export default ProductView;
