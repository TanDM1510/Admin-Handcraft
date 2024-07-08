"use client";
import React, { useEffect, useState } from "react";
import axiosClient from "@/utils/customeAxios";
import { Button, Form, Input, Select, Upload, message } from "antd";
import UpdateProductViewHeader from "./UpdateProdcutViewHeader";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const UpdateProductView = ({ id }) => {
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [fileList, setFileList] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [status, setStatus] = useState([]);
  const productId = id.id;
  const numberFields = [
    "cost",
    "weight",
    "amount",
    "price",
    "discount",
    "status",
  ];
  const handleChangeStatus = (value) => {
    setStatus(value);
  };
  const fetchFestivalData = async () => {
    try {
      const response = await axiosClient.get(
        "https://prm-api.webbythien.com/v1/api/festival"
      );
      setFestivals(response.data);
    } catch (error) {
      console.error("Failed to fetch festival data:", error);
    }
  };
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosClient.get(
          `https://prm-api.webbythien.com/v1/api/product/${productId}`
        );
        setProduct(response);
        setSelectedFestivals(response.festivals.map((f) => f.id));
        setFileList(
          response.images.map((i, index) => ({
            uid: index,
            name: i.url,
            status: "done",
            url: i.url,
          }))
        );
        setIsLoading(true);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        message.error("Không thể lấy dữ liệu của sản phẩm");
      }
    };
    fetchProductData();
    fetchFestivalData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleFestivalChange = (value) => {
    setSelectedFestivals(value);
  };

  const handleUpload = ({ file, fileList }) => {
    if (file.status === "done") {
      setFileList(
        fileList.map((file) => ({
          uid: file.uid,
          name: file.name,
          status: file.status,
          url: file.response ? file.response.image_link : file.url,
        }))
      );
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: fileList.map((file) => ({
          url: file.response ? file.response.image_link : file.url,
        })),
      }));
    }
  };

  const handleSubmitForm = async (values) => {
    try {
      const response = await axiosClient.put(
        `https://prm-api.webbythien.com/v1/api/product/${productId}`,
        {
          ...values,
          festivals: selectedFestivals,
          images: fileList.map((file) => file.url),
        }
      );

      message.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };

  return (
    <>
      {isLoading ? (
        <Form
          className="w-full flex gap-3 flex-wrap"
          initialValues={{
            name: product?.name,
            price: product?.price,
            cost: product?.cost,
            status: product?.status,
            weight: product?.weight,
            description: product?.description,
            discount: product?.discount,
            festivals: product?.festivals?.map((festival) => festival.id),
          }}
          onFinish={handleSubmitForm}
        >
          <UpdateProductViewHeader />
          <div className="lg:w-[calc(70%-12px)] w-full border rounded-lg px-3 py-5 pb-10">
            <p className="font-bold text-lg">Thông tin sản phẩm</p>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Tên sản phẩm</label>
              <Form.Item
                rules={[
                  { required: true, message: "Xin hãy điền tên sản phẩm!" },
                ]}
                name="name"
              >
                <Input
                  className="bg-gray-100"
                  onChange={handleChange}
                  name="name"
                />
              </Form.Item>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-400">
                Trạng thái sản phẩm
              </label>
              <Form.Item
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn trạng thái cho sản phẩm",
                  },
                ]}
              >
                <Select
                  placeholder="Hãy chọn trạng thái cho sản phẩm"
                  onChange={handleChangeStatus}
                >
                  <Option key={1} value={1}>
                    Bán
                  </Option>
                  <Option key={2} value={2}>
                    Ngưng bán
                  </Option>
                </Select>
              </Form.Item>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Cân nặng sản phẩm</label>
              <Form.Item
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền cân nặng sản phẩm!",
                  },
                ]}
              >
                <Input
                  className="bg-gray-100"
                  name="weight"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-400">
                Giới thiệu về sản phẩm
              </label>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền giới thiệu về sản phẩm!",
                  },
                ]}
              >
                <Input.TextArea
                  className="bg-gray-100"
                  name="description"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:w-[30%] w-full border rounded-lg px-3 p-5">
            <p className="font-bold text-lg">Hình ảnh sản phẩm</p>
            <Upload
              action="http://34.126.177.133:8881/v1/api/product/upload-image"
              listType="picture"
              defaultFileList={[...fileList]}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
          <div className="lg:w-[calc(70%-12px)] w-full border rounded-lg px-3 py-5">
            <p className="font-bold text-lg">Giá sản phẩm</p>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Giá sàn</label>
              <Form.Item
                name="cost"
                rules={[
                  { required: true, message: "Xin hãy điền giá sàn sản phẩm!" },
                ]}
              >
                <Input
                  className="bg-gray-100"
                  name="cost"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="flex gap-2">
              <div className="mt-4 w-full">
                <label className="text-sm text-gray-400">Giá bán</label>
                <Form.Item
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Xin hãy điền giá bán sản phẩm!",
                    },
                  ]}
                >
                  <Input
                    className="bg-gray-100"
                    name="price"
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
              <div className="mt-4 w-full">
                <label className="text-sm text-gray-400">Giảm giá</label>
                <Form.Item
                  name="discount"
                  rules={[
                    { required: true, message: "Xin điền giảm giá sản phẩm!" },
                  ]}
                >
                  <Input
                    className="bg-gray-100"
                    name="discount"
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="mt-4 w-full">
              <label className="text-sm text-gray-400">Số lượng sản phẩm</label>
              <Form.Item
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền số lượng sản phẩm!",
                  },
                ]}
              >
                <Input
                  className="bg-gray-100"
                  name="amount"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="lg:w-[30%] w-full border rounded-lg px-3 p-5">
            <p className="font-bold text-lg">Phân loại sản phẩm</p>
            <div className="mt-4 w-full">
              <label className="text-sm text-gray-400">Thuộc lễ hội</label>
              <Form.Item name="festivals">
                <Select
                  mode="multiple"
                  placeholder="Hãy chọn 1 lễ hội cho sản phẩm"
                  onChange={handleFestivalChange}
                  defaultValue={product?.festivals?.map((f) => f.id)}
                >
                  {festivals.map((festival) => (
                    <Option key={festival.id} value={festival.id}>
                      {festival.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default UpdateProductView;
