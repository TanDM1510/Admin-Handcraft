"use client";

import React, { useEffect, useState, useRef } from "react";
import { Modal, Pagination, message, Spin } from "antd";
import axiosClient from "@/utils/customeAxios";
import ProductsHeader from "./ProductsHeader";
import ProductsFilter from "./ProductsFilter";
import ProductTable from "./ProductTable";

const ProductsView = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const page_size = 5;
  const [status, setStatus] = useState(1);
  const [festival_id, setFestival] = useState(null);
  const [festivals, setFestivals] = useState([]);

  // Cache to store fetched data by page number
  const cache = useRef({});

  const fetchFestivals = async () => {
    try {
      const response = await axiosClient.get(
        "http://34.126.177.133:8881/v1/api/festival"
      );
      setFestivals(response.data);
    } catch (error) {
      console.error("Error fetching festivals", error);
    }
  };

  const fetchData = async (
    filters = { status, page, page_size, festival_id }
  ) => {
    try {
      setIsLoading(true); // Set loading to true before fetch
      const response = await axiosClient.get(
        "http://34.126.177.133:8881/v1/api/product",
        {
          params: { page_size: 5, ...filters },
        }
      );
      setTotal(response.total_items);
      cache.current[filters.page] = response.data; // Store response data in cache
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchFestivals();
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
    setStatus(filters.status);
    setFestival(filters.festival_id);
    fetchData({ ...filters, page: 1 });
  };

  const onChange = (pageNumber) => {
    console.log("Page:", pageNumber);
    setPage(pageNumber);
  };

  const handleDelete = async () => {
    try {
      const data = await axiosClient.get(
        `http://34.126.177.133:8881/v1/api/product/${selectedId}`
      );

      if (data) {
        const response = await axiosClient.put(
          `http://34.126.177.133:8881/v1/api/product/${selectedId}`,
          {
            ...data,
            festivals: [1],
            amount: 0,
            status: 0,
            images: ["tandeptrai"],
          }
        );
        console.log("Updated Product Response:", response.data);
        message.success("Xóa sản phẩm thành công");
        fetchData({ page, page_size });
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Xóa sản phẩm thất bại");
    } finally {
      setIsModalVisible(false);
      setSelectedId(null);
    }
  };

  const showModal = (id) => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedId(null);
  };

  return (
    <>
      {/* Header */}
      <ProductsHeader />
      {/* Filter */}
      <ProductsFilter handleChange={handleChange} festivals={festivals} />
      {/* Table */}
      {isLoading ? (
        <Spin tip="Loading...">
          <ProductTable data={[]} handleDelete={showModal} />
        </Spin>
      ) : (
        <ProductTable data={data} handleDelete={showModal} key={1} />
      )}
      {/* Pagination */}
      <Pagination
        current={page}
        total={total}
        className="mt-10"
        defaultPageSize={page_size}
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
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>
    </>
  );
};

export default ProductsView;
