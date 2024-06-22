import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

const OrdersFilter = ({ handleChange }) => {
  return (
    <div className="h-10 w-full border mb-5 rounded-lg flex items-center px-5 py-6 gap-3 overflow-x-auto overflow-y-hidden">
      <Select
        placeholder={"Lọc theo tên lễ hội"}
        style={{
          width: 180,
        }}
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
          {
            value: "disabled",
            label: "Disabled",
            disabled: true,
          },
        ]}
      />
      <Select
        placeholder={"Lọc theo trạng thái sản phẩm"}
        style={{
          width: 240,
        }}
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
          {
            value: "disabled",
            label: "Disabled",
            disabled: true,
          },
        ]}
      />
      <Select
        placeholder={"Sắp xếp sản phẩm theo giá tiền"}
        style={{
          width: 240,
        }}
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
          {
            value: "disabled",
            label: "Disabled",
            disabled: true,
          },
        ]}
      />
      <Select
        placeholder={"Sắp xếp sản phẩm theo tên"}
        style={{
          width: 240,
        }}
        onChange={handleChange}
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
          {
            value: "Yiminghe",
            label: "yiminghe",
          },
          {
            value: "disabled",
            label: "Disabled",
            disabled: true,
          },
        ]}
      />
      <Input
        className="min-w-[200px] "
        placeholder="Tìm kiếm theo tên sản phẩm"
        prefix={
          <SearchOutlined
            style={{
              color: "rgba(0,0,0,.25)",
            }}
          />
        }
      />
    </div>
  );
};
export default OrdersFilter;
