"use client";
import { Form, message } from "antd";
import { useEffect, useState } from "react";
import AddFestivalHeader from "./AddFestivalHeader";
import AddFestivalForm from "./AddFestivalForm";
import axiosClient from "@/utils/customeAxios";

const AddFestivalView = () => {
  const [fileList, setFileList] = useState(null);
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedYear, setSelectedYear] = useState();
  const [festival, setFestival] = useState({
    name: "",
    start_date: startDate,
    end_time: endTime,
    description: "",
    status: 1,
    repeat_yearly: selectedYear,
    img: fileList,
  });

  const numberFields = ["status"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFestival((prevFestival) => ({
      ...prevFestival,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      setFileList(info.file.response.image_link);
    }
  };
  const handleRepeatChange = (value) => {
    setSelectedYear(value);
  };
  const handleSubmitForm = async () => {
    try {
      const response = await axiosClient.post(
        "http://34.126.177.133:8881/v1/api/festival",
        festival
      );
      console.log("Festival added successfully:", response);
      message.success("Thêm lễ hội thành công ");
    } catch (error) {
      console.error("Error adding festival:", error);
    }
  };

  useEffect(() => {
    setFestival((prevFestival) => ({
      ...prevFestival,
      start_date: startDate,
      end_time: endTime,
      img: fileList,
      repeat_yearly: selectedYear,
    }));
  }, [startDate, endTime, fileList]);

  return (
    <>
      <Form onFinish={handleSubmitForm} className="w-full flex gap-3 flex-wrap">
        {/* Header */}
        <AddFestivalHeader />
        {/* Form */}
        <AddFestivalForm
          festival={festival}
          handleChange={handleChange}
          handleUpload={handleUpload}
          setEndTime={setEndTime}
          setStartDate={setStartDate}
          handleSelectedChange={handleRepeatChange}
        />
      </Form>
    </>
  );
};

export default AddFestivalView;
