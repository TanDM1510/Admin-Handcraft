"use client";

import { DatePicker, Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const AddFestivalForm = ({
  festival,
  handleChange,
  fileList,
  handleUpload,
  setEndTime,
  setStartDate,
  handleSelectedChange,
}) => {
  return (
    <>
      <div className="lg:w-[calc(70%-12px)] w-full border rounded-lg px-3 py-5 pb-10">
        <p className="font-bold text-lg">Thông tin lễ hội</p>
        <div className="mt-4">
          <label className="text-sm text-gray-400">Tên lễ hội</label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Xin hãy điền tên Lễ hội!" }]}
          >
            <Input
              className="bg-gray-100"
              value={festival.name}
              onChange={handleChange}
              name="name"
            />
          </Form.Item>
        </div>
        <div className="mt-4 w-full">
          <label className="text-sm text-gray-400 ">Thuộc lễ hội</label>
          <Form.Item
            name="repeat_year"
            rules={[
              {
                required: true,
                message: "Hãy chọn lễ hội có lặp lại hay không",
              },
            ]}
          >
            <Select
              placeholder="Hãy chọn lễ hội có lặp lại hay không"
              onChange={handleSelectedChange}
            >
              <Option key={1} value={true}>
                Có
              </Option>
              <Option key={2} value={false}>
                Không
              </Option>
            </Select>
          </Form.Item>
        </div>
        <div className="mt-4">
          <label className="text-sm text-gray-400">Giới thiệu về lễ hội</label>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Xin hãy điền giới thiệu về lễ hội!" },
            ]}
          >
            <Input.TextArea
              className="bg-gray-100"
              name="description"
              value={festival.description}
              onChange={handleChange}
            />
          </Form.Item>
        </div>
      </div>

      <div className="lg:w-[30%] w-full border rounded-lg px-3 p-5">
        <p className="font-bold text-lg">Hình ảnh lễ hội</p>
        <Upload
          action="https://prm-api.webbythien.com/v1/api/product/upload-image"
          listType="picture"
          defaultFileList={fileList}
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>

      {/* Festival Start and End Dates */}
      <div className="lg:w-[calc(70%-12px)] w-full border rounded-lg px-3 py-5">
        <p className="font-bold text-lg">Ngày bắt đầu - kết thúc lễ hội</p>
        <div className="mt-4">
          <label className="text-sm text-gray-400">Ngày bắt đầu</label>
          <Form.Item
            name="start_date"
            rules={[{ required: true, message: "Xin hãy điền ngày bắt đầu!" }]}
          >
            <DatePicker
              showTime
              value={festival.start_date}
              onChange={(value) => setStartDate(value)}
              name="start_date"
            />
          </Form.Item>
        </div>
        <div className="mt-4 w-full">
          <label className="text-sm text-gray-400">Ngày kết thúc</label>
          <Form.Item
            name="end_time"
            rules={[{ required: true, message: "Xin hãy điền ngày kết thúc!" }]}
          >
            <DatePicker
              showTime
              value={festival.end_time}
              onChange={(value) => setEndTime(value)}
              name="end_time"
            />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default AddFestivalForm;
