"use client";
// import antd
import React, { useEffect, useState, useRef } from "react";
import { Modal, Pagination, message, Spin } from "antd";
// Import library
import axiosClient from "@/utils/customeAxios";
import OrdersHeader from "./OrdersHeader";

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

  const cache = useRef({});

  const fetchData = async (filters = { page, per_page }) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        "https://prm-api.webbythien.com/v1/api/order",
        {
          params: { ...filters },
        }
      );
      setTotal(response.total_count);
      cache.current[filters.page] = response.orders;
      setData(response.orders);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (cache.current[page]) {
      setData(cache.current[page]);
    } else {
      fetchData();
    }
  }, [page]);

  const onChange = (pageNumber) => {
    console.log("Page:", pageNumber);
    setPage(pageNumber);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || selectedStatus === null) return;

    try {
      const response = await axiosClient.post(
        `https://prm-api.webbythien.com/v1/api/order/admin/confirm/${selectedOrder}`
      );

      message.success("Xác nhận  đơn hàng thành công");
      fetchData({ page, per_page });
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Đã có lỗi xảy ra vui lòng thử lại sau");
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
        title="Xác nhận trạng thái đơn hàng"
        open={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xác nhận trạng thái đơn hàng này?</p>
      </Modal>
    </>
  );
};

export default OrdersView;
