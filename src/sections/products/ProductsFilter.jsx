"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";

const ProductsFilter = ({ handleChange, festivals }) => {
  const [filters, setFilters] = useState({
    status: null,
    search: "",
    page: 1,
    size: 5,
    festival_id: null,
  });

  const handleStatusChange = (value) => {
    const updatedFilters = { ...filters, status: value };
    setFilters(updatedFilters);
    handleChange(updatedFilters);
  };

  const handleFestivalChange = (value) => {
    const updatedFilters = { ...filters, festival_id: value };
    setFilters(updatedFilters);
    handleChange(updatedFilters);
  };

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  );

  const handleNameChange = useCallback(
    (event) => {
      const value = event.target.value;
      const updatedFilters = { ...filters, search: value };
      setFilters(updatedFilters);
      debouncedHandleChange(updatedFilters);
    },
    [filters, debouncedHandleChange]
  );

  return (
    <div className="h-10 w-full border mb-5 rounded-lg flex items-center px-5 py-6 gap-3 overflow-x-auto overflow-y-hidden">
      <Select
        placeholder="Lọc theo trạng thái sản phẩm"
        style={{
          width: 240,
        }}
        onChange={handleStatusChange}
        options={[
          {
            value: 1,
            label: "Bán",
          },
          {
            value: 0,
            label: "Ngưng bán",
          },
        ]}
      />
      <Select
        placeholder="Lọc theo lễ hội"
        style={{
          width: 240,
        }}
        onChange={handleFestivalChange}
        options={festivals?.map((festival) => ({
          value: festival.id,
          label: festival.name,
        }))}
      />
      <Input
        className="min-w-[200px]"
        placeholder="Tìm kiếm theo tên sản phẩm"
        prefix={
          <SearchOutlined
            style={{
              color: "rgba(0,0,0,.25)",
            }}
          />
        }
        onChange={handleNameChange}
      />
    </div>
  );
};
export default ProductsFilter;
