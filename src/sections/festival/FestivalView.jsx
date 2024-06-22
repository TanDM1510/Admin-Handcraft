"use client";
import React, { useEffect, useState, useRef } from "react";
import axiosClient from "@/utils/customeAxios";
import FestivalHeader from "./FestivalHeader";
import FestivalFilter from "./FestivalFilter";
import FestivalTable from "./FestivalTable";
import { Modal, Pagination, message, Spin } from "antd";

const FestivalView = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const size = 5;

  // Cache to store fetched data by page number
  const cache = useRef({});

  // Function to fetch data with filters
  const fetchData = async (filters = { status, page, size }) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(
        "http://34.126.177.133:8881/v1/api/festival",
        {
          params: filters,
        }
      );
      setTotal(response.total);
      cache.current[filters.page] = response.data; // Store response data in cache
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
      message.error("Không thể tải dữ liệu lễ hội");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when page or status changes
  useEffect(() => {
    if (cache.current[page]) {
      setData(cache.current[page]); // Use cached data if available
    } else {
      fetchData();
    }
  }, [page, status]);

  // Handler for filter change
  const handleChange = (filters) => {
    console.log("Selected filters:", filters);
    setPage(1); // Reset to first page
    setStatus(filters.status);
    cache.current = {}; // Clear cache
    fetchData(filters); // Fetch data with the updated filters
  };

  const onChange = (pageNumber) => {
    console.log("Page:", pageNumber);
    setPage(pageNumber);
  };

  // Handler to delete a festival
  const handleDelete = async () => {
    try {
      const selectedData = data.find((item) => item.id === selectedId);
      if (selectedData) {
        await axiosClient.put(
          `http://34.126.177.133:8881/v1/api/festival/${selectedId}`,
          {
            ...selectedData,
            status: 0,
          }
        );
        message.success("Xóa lễ hội thành công");
        fetchData({ status, page, size });
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Không thể xóa lễ hội đã có vấn đề gì đó");
    } finally {
      setIsModalVisible(false);
      setSelectedId(null);
    }
  };

  // Show confirmation modal
  const showModal = (id) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  // Hide confirmation modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedId(null);
  };

  return (
    <>
      {/* Header */}
      <FestivalHeader />
      {/* Filter */}
      <FestivalFilter handleChange={handleChange} />
      {/* Table */}
      {loading ? (
        <Spin tip="Loading...">
          <FestivalTable data={[]} handleDelete={showModal} />
        </Spin>
      ) : (
        <FestivalTable data={data} handleDelete={showModal} />
      )}
      <Pagination
        current={page}
        total={total}
        className="mt-10"
        defaultPageSize={size}
        onChange={onChange}
      />
      {/* Confirmation Modal */}
      <Modal
        title="Xác nhận xóa"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa lễ hội này không?</p>
      </Modal>
    </>
  );
};

export default FestivalView;
