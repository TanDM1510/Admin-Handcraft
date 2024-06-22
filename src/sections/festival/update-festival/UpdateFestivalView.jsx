"use client";

import React, { useEffect, useState } from "react";
import axiosClient from "@/utils/customeAxios";
import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import UpdateFestivalHeader from "./UpdateFestivalHeader";
import moment from "moment";
const { Option } = Select;

const UpdateFestivalView = ({ id }) => {
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [festival, setFestival] = useState({
    name: "",
    start_date: null,
    end_time: null,
    description: "",
    status: 1,
    repeat_yearly: null,
    img: [],
  });
  console.log(fileList);
  const festivalId = id.id;

  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        const response = await axiosClient.get(
          `http://34.126.177.133:8881/v1/api/festival/`
        );

        if (response) {
          const selectedFestival = response.data.find(
            (fest) => fest.id == festivalId
          );
          console.log(selectedFestival);

          if (selectedFestival) {
            setFestival(selectedFestival);

            setFileList({
              uid: selectedFestival.id,
              name: selectedFestival.image,
              status: "done",
              url: selectedFestival.image,
            });
          }
          setIsLoading(true);
        }
      } catch (error) {
        console.error("Error fetching festival data", error);
      }
    };

    fetchFestivalData();
  }, [festivalId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFestival((prevFestival) => ({
      ...prevFestival,
      [name]: name === "status" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (value) => {
    setFestival((prevFestival) => ({
      ...prevFestival,
      repeat_yearly: value,
    }));
  };

  const handleDateChange = (date, dateString, field) => {
    setFestival((prevFestival) => ({
      ...prevFestival,
      [field]: dateString,
    }));
  };

  const handleUploadChange = ({ file }) => {
    if (file.status === "done") {
      setFileList({
        uid: file.uid,
        name: file.name,
        status: file.status,
        url: file.response ? file.response.image_link : file.url,
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axiosClient.put(
        `http://34.126.177.133:8881/v1/api/festival/${festivalId}`,
        {
          ...values,
          images: fileList,
        }
      );

      message.success("Cập nhật lễ hội thành công");
    } catch (error) {
      message.error("Cập nhật lễ hội thất bại");
    }
  };

  return (
    <>
      {isLoading ? (
        <Form
          className="w-full flex gap-3 flex-wrap"
          initialValues={{
            name: festival.name,
            repeat_yearly: festival.repeat_yearly,
            end_time: moment(festival.end_time),
            start_date: moment(festival.start_date),
            description: festival.description,
            status: festival.status,
          }}
          onFinish={handleSubmit}
        >
          <UpdateFestivalHeader />

          <div className="lg:w-[calc(70%-12px)] w-full border rounded-lg px-3 py-5 pb-10">
            <p className="font-bold text-lg">Thông tin lễ hội</p>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Tên lễ hội</label>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Xin hãy điền tên Lễ hội!" },
                ]}
              >
                <Input
                  className="bg-gray-100"
                  value={festival.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </Form.Item>
            </div>
            <div className="mt-4 w-full">
              <label className="text-sm text-gray-400">Thuộc lễ hội</label>
              <Form.Item
                name="repeat_yearly"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn lễ hội có lặp lại hay không",
                  },
                ]}
              >
                <Select
                  placeholder="Hãy chọn lễ hội có lặp lại hay không"
                  onChange={handleSelectChange}
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
              <label className="text-sm text-gray-400">
                Giới thiệu về lễ hội
              </label>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền giới thiệu về lễ hội!",
                  },
                ]}
              >
                <Input.TextArea
                  className="bg-gray-100"
                  name="description"
                  value={festival.description}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
          </div>

          <div className="lg:w-[30%] w-full border rounded-lg px-3 p-5">
            <p className="font-bold text-lg">Hình ảnh lễ hội</p>
            <Upload
              action="http://34.126.177.133:8881/v1/api/product/upload-image"
              listType="picture"
              defaultFileList={[fileList]}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>

          <div className="lg:w-[calc(70%-12px)] w-full border rounded-lg px-3 py-5">
            <p className="font-bold text-lg">Ngày bắt đầu - kết thúc lễ hội</p>
            <div className="mt-4">
              <label className="text-sm text-gray-400">Ngày bắt đầu</label>
              <Form.Item
                name="start_date"
                rules={[
                  { required: true, message: "Xin hãy điền ngày bắt đầu!" },
                ]}
              >
                <DatePicker
                  showTime
                  value={festival.start_date}
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "start_date")
                  }
                  name="start_date"
                />
              </Form.Item>
            </div>
            <div className="mt-4 w-full">
              <label className="text-sm text-gray-400">Ngày kết thúc</label>
              <Form.Item
                name="end_time"
                rules={[
                  { required: true, message: "Xin hãy điền ngày kết thúc!" },
                ]}
              >
                <DatePicker
                  showTime
                  value={festival.end_time}
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString, "end_time")
                  }
                  name="end_time"
                />
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

export default UpdateFestivalView;
