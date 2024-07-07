"use client";

import { Form, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
const { Option } = Select;
const AddProductForm = ({
  product,
  handleChange,
  fileList,
  handleUpload,
  festival,
  handleSelectedChange,
  handleChangeStatus,
}) => {
  return (
    <>
      {/* Thông tin chung sản phẩm */}
      <div className="lg:w-[calc(70%-12px)] w-full  border rounded-lg  px-3 py-5 pb-10">
        <p className="font-bold text-lg">Thông tin sản phẩm</p>
        <div className="mt-4">
          <label className="text-sm text-gray-400">Tên sản phẩm</label>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Xin hãy điền tên sản phẩm!",
              },
            ]}
            name="name"
          >
            <Input
              className="bg-gray-100"
              value={product.name}
              onChange={handleChange}
              name="name"
            />
          </Form.Item>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-400">Trạng thái sản phẩm</label>
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
              <Option key={1} value={true}>
                Bán
              </Option>
              <Option key={1} value={false}>
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
                message: "Xin hãy điền cân nặng  sản phẩm!",
              },
            ]}
          >
            <Input
              className="bg-gray-100 "
              name="weight"
              value={product.weight}
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
              className="bg-gray-100 "
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
      </div>
      {/* UpLoad hình */}
      <div className="lg:w-[30%] w-full border rounded-lg  px-3  p-5">
        <p className="font-bold text-lg">Hình ảnh sản phẩm</p>
        <Upload
          action="https://prm-api.webbythien.com/v1/api/product/upload-image"
          listType="picture"
          defaultFileList={[...fileList]}
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
      {/* Giá sản phẩm */}
      <div className="lg:w-[calc(70%-12px)] w-full  border rounded-lg  px-3 py-5">
        <p className="font-bold text-lg">Giá sản phẩm</p>
        <div className="mt-4">
          <label className="text-sm text-gray-400">Giá sàn </label>
          <Form.Item
            name="cost"
            rules={[
              {
                required: true,
                message: "Xin hãy điền giá sàn sản phẩm!",
              },
            ]}
          >
            <Input
              className="bg-gray-100"
              name="cost"
              value={product.cost}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
        <div className="flex gap-2">
          <div className="mt-4 w-full">
            <label className="text-sm text-gray-400 ">Giá bán </label>
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
                value={product.price}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
          <div className="mt-4 w-full">
            <label className="text-sm text-gray-400 ">Giảm giá </label>
            <Form.Item
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Xin điền giảm giá  sản phẩm!",
                },
              ]}
            >
              <Input
                className="bg-gray-100"
                name="discount"
                value={product.discount}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>
        <div className="mt-4 w-full">
          <label className="text-sm text-gray-400 ">Số lượng sản phẩm</label>
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
              value={product.amount}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
      </div>
      {/* Loại sản phẩm */}
      <div className="lg:w-[30%] w-full border rounded-lg  px-3 p-5">
        <p className="font-bold text-lg">Phân loại sản phẩm</p>
        <div className="mt-4 w-full">
          <label className="text-sm text-gray-400 ">Thuộc lễ hội</label>
          <Form.Item
            name="festivals"
            rules={[
              {
                required: true,
                message: "Hãy chọn 1 lễ hội cho sản phẩm",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Hãy chọn 1 lễ hội cho sản phẩm"
              onChange={handleSelectedChange}
            >
              {festival.map((f) => {
                return (
                  <Option key={f.id} value={f.id}>
                    {f.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="festival"
            rules={[
              {
                required: true,
                message: "Xin hãy chọn trạng thái sản phẩm!",
              },
            ]}
          >
            <Input
              className="bg-gray-100"
              name="festival"
              value={product.festival}
              onChange={handleChange}
            />
          </Form.Item> */}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
