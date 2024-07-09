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
      console.log(response.orders);
      const data = response.orders.filter((p) => p.status !== 5);
      cache.current[filters.page] = data;

      setData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUser = async () => {
    const response = await axiosClient.get("http://34.126.177.133:8088/user");
    console.log(response);
  };
  useEffect(() => {
    if (cache.current[page]) {
      setData(cache.current[page]);
    } else {
      fetchData();
      fetchUser();
    }
  }, [page]);

  const handleChange = (filters) => {
    console.log("Selected filters:", filters);
    setPage(1);
    cache.current = {};
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
        `https://prm-api.webbythien.com/v1/api/order/${selectedOrder}`,
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
        open={isModalVisible}
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
