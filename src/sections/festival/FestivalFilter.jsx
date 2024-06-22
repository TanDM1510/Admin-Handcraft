import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { useState, useMemo, useCallback } from "react";
import debounce from "lodash/debounce";

const FestivalFilter = ({ handleChange }) => {
  const [filters, setFilters] = useState({
    status: null,
    search: "",
    page: 1,
    size: 5,
  });

  const handleStatusChange = (value) => {
    const updatedFilters = { ...filters, status: value };
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
        placeholder="Lọc theo trạng thái lễ hội"
        style={{
          width: 240,
        }}
        onChange={handleStatusChange}
        options={[
          {
            value: 1,
            label: "Hoạt động",
          },
          {
            value: 0,
            label: "Ngưng hoạt động",
          },
        ]}
      />
      <Input
        className="min-w-[200px]"
        placeholder="Tìm kiếm theo tên lễ hội"
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

export default FestivalFilter;
