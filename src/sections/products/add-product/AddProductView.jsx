"use client";
import { Form, message } from "antd";
import AddProductHeader from "./AddProductHeader";
import AddProductForm from "./AddProductForm";
import { useEffect, useState } from "react";
import axiosClient from "@/utils/customeAxios";
const AddProductView = () => {
  // UseState
  const [fileList, setFileList] = useState([]);
  const [festival, setFestival] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  console.log(selectedFestivals);
  // UseEffect
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(
        "https://prm-api.webbythien.com/v1/api/festival"
      );
      setFestival(response.data);
    };
    fetchData();
  }, [selectedFestivals]);
  // Product
  const [product, setProduct] = useState({
    cost: "",
    weight: "",
    amount: "",
    description: "",
    discount: "",
    status: 0,
    images: fileList,
    festivals: selectedFestivals,
    name: "",
    price: "",
  });
  // Handle function
  const numberFields = [
    "cost",
    "weight",
    "amount",
    "price",
    "discount",
    "status",
  ];
  //handle ChangeFields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };
  //handle Festivals
  const handleFestivalChange = (value) => {
    setSelectedFestivals(value);
  };
  const handleChangeStatus = (value) => {
    setStatus(value);
  };
  //Handle upload image
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      fileList.push(info.file.response.image_link);
    }
  };
  //handle submit
  const handleSubmitForm = async () => {
    try {
      const addProduct = await axiosClient.post(
        "https://prm-api.webbythien.com/v1/api/product",
        { ...product, festivals: selectedFestivals, status: status }
      );
      message.success("Tạo sản phẩm thành công");
    } catch (error) {
      message.error("Tạo sản phẩm thất bại ");
      console.log(error);
    }
  };
  // UI
  return (
    <>
      {/* Header */}
      <Form
        onFinish={() => handleSubmitForm()}
        className="w-full flex gap-3 flex-wrap"
      >
        <AddProductHeader />
        {/* Form */}
        <AddProductForm
          product={product}
          handleChange={handleChange}
          fileList={fileList}
          handleUpload={handleUpload}
          festival={festival}
          handleSelectedChange={handleFestivalChange}
          handleChangeStatus={handleChangeStatus}
        />
      </Form>
    </>
  );
};
export default AddProductView;
