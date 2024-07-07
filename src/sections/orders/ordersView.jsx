"use client";
// import antd
import React, { useEffect, useState, useRef } from "react";
import { Modal, Pagination, message, Spin } from "antd";
// Import library
import axiosClient from "@/utils/customeAxios";
import OrdersHeader from "./OrdersHeader";
import OrdersFilter from "./OrdersFilter";
import OrdersTable from "./OrdersTable";

const OrdersView = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const per_page = 5;

  // Cache to store fetched data by page number
  const cache = useRef({});

  const fetchData = async (filters = { page, per_page }) => {
    try {
      setIsLoading(true); // Set loading to true before fetch
      const response = await axiosClient.get(
        "http://34.126.177.133:8881/v1/api/order",
        {
          params: { ...filters },
        }
      );
      setTotal(response.total_count);
      cache.current[filters.page] = response.orders; // Store response data in cache
      setData(response.orders);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    if (cache.current[page]) {
      setData(cache.current[page]); // Use cached data if available
    } else {
      fetchData();
    }
  }, [page]);

  const handleChange = (filters) => {
    console.log("Selected filters:", filters);
    setPage(1); // Reset to first page
    cache.current = {}; // Clear cache
    fetchData({ ...filters, page: 1 });
  };

  const onChange = (pageNumber) => {
    console.log("Page:", pageNumber);
    setPage(pageNumber);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || selectedStatus === null) return;

    try {
      const response = await axiosClient.put(
        `http://34.126.177.133:8881/v1/api/order/${selectedOrder}`,
        { status: selectedStatus }
      );
      console.log("Updated Order Status Response:", response.data);
      message.success("Cập nhật trạng thái đơn hàng thành công");
      fetchData({ page, per_page });
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Cập nhật trạng thái đơn hàng thất bại");
    } finally {
      setIsModalVisible(false);
      setSelectedOrder(null);
      setSelectedStatus(null);
    }
  };

  const showConfirmModal = (orderId, status) => {
    setSelectedOrder(orderId);
    setSelectedStatus(status);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setSelectedStatus(null);
  };

  return (
    <>
      <OrdersHeader />
      {/* <OrdersFilter handleChange={handleChange} /> */}
      {isLoading ? (
        <Spin tip="Loading...">
          <OrdersTable data={[]} showConfirmModal={showConfirmModal} />
        </Spin>
      ) : (
        <OrdersTable data={data} showConfirmModal={showConfirmModal} />
      )}
      <Pagination
        current={page}
        total={total}
        className="mt-10"
        defaultPageSize={per_page}
        onChange={onChange}
      />
      <Modal
        title="Xác nhận cập nhật trạng thái"
        visible={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn cập nhật trạng thái đơn hàng này?</p>
      </Modal>
    </>
  );
};

export default OrdersView;
